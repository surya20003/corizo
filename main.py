from pathlib import Path
import sqlite3
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "employees.db"

app = FastAPI(
    title="Employee Directory API",
    description="Python FastAPI backend for managing employees.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    position: str
    department: str


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    position: Optional[str] = None
    department: Optional[str] = None


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                position TEXT NOT NULL,
                department TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """
        )


@app.on_event("startup")
def startup():
    initialize_database()


@app.get("/favicon.ico", include_in_schema=False, status_code=204)
def favicon():
    return None


@app.get("/api/employees", tags=["Employees"])
def get_employees():
    with get_connection() as connection:
        rows = connection.execute(
            "SELECT * FROM employees ORDER BY created_at DESC"
        ).fetchall()
        return {"data": [dict(row) for row in rows]}


@app.get("/api/employees/{employee_id}", tags=["Employees"])
def get_employee(employee_id: int):
    with get_connection() as connection:
        row = connection.execute(
            "SELECT * FROM employees WHERE id = ?",
            (employee_id,),
        ).fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"data": dict(row)}


@app.post("/api/employees", status_code=201, tags=["Employees"])
def create_employee(employee: EmployeeCreate):
    try:
        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO employees (name, email, position, department)
                VALUES (?, ?, ?, ?)
                """,
                (
                    employee.name,
                    employee.email,
                    employee.position,
                    employee.department,
                ),
            )
            employee_id = cursor.lastrowid
    except sqlite3.IntegrityError as error:
        raise HTTPException(status_code=400, detail=str(error))

    return {
        "message": "Employee created successfully",
        "data": {
            "id": employee_id,
            "name": employee.name,
            "email": employee.email,
            "position": employee.position,
            "department": employee.department,
        },
    }


@app.put("/api/employees/{employee_id}", tags=["Employees"])
def update_employee(employee_id: int, employee: EmployeeUpdate):
    update_data = employee.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    fields = ", ".join(f"{field} = ?" for field in update_data)
    values = list(update_data.values())
    values.append(employee_id)

    try:
        with get_connection() as connection:
            cursor = connection.execute(
                f"UPDATE employees SET {fields} WHERE id = ?",
                values,
            )
            changes = cursor.rowcount
    except sqlite3.IntegrityError as error:
        raise HTTPException(status_code=400, detail=str(error))

    if changes == 0:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee updated successfully", "changes": changes}


@app.delete("/api/employees/{employee_id}", tags=["Employees"])
def delete_employee(employee_id: int):
    with get_connection() as connection:
        cursor = connection.execute(
            "DELETE FROM employees WHERE id = ?",
            (employee_id,),
        )
        changes = cursor.rowcount

    if changes == 0:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee deleted successfully", "changes": changes}

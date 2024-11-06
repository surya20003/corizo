const registrationForm = document.getElementById('registration-form');
const registrationStatus = document.getElementById('registration-status');

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (password !== confirmPassword) {
        registrationStatus.textContent = 'Passwords do not match';
        return;
    }

    const userData = {
        name,
        email,
        password,
        phone,
        address
    };

    // Simulate server-side registration
    setTimeout(() => {
        registrationStatus.textContent = 'Registration successful!';
    }, 2000);
});
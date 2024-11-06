// Basic form validation
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Please fill in both username and password');
    } else {
        // Send AJAX request to server for authentication
        // Replace with your actual authentication logic
        console.log('Login attempted with:', username, password);
    }
});
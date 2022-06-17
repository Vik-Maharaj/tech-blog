async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // if email and password are not empty, this block will retrieve the response and send info to the client
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // if the response is okay, it is sent to the client and redirected to the dashboard page
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
}
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
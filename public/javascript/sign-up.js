async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && email && password) {

        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
            console.log('sign-up successful');
            document.location.replace('/');
        } 
        else {
            alert(response.statusText);
        }
    }
};
document.querySelector('#sign-up-form').addEventListener('submit', signupFormHandler);
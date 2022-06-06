async function logout() {

    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } 
    else {
        alert(response.statusText);
    }
}
document.querySelector('#logout').addEventListener('click', logout);

const modalEl = document.querySelector('#generate-modal');

async function logoutRes() {
    const logoutResponse = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (logoutResponse.ok) {

        setTimeout(() => {
           modalEl.classList.add("show");
           modalEl.classList.remove("hide");
        }, 3000);

        setTimeout(() => {
            modalEl.classList.add("hide");
            modalEl.classList.remove("show");
            document.location.replace('/');
        }, 3000);
    } 
    else {
        alert(logoutResponse.statusText);
    }
};

function inactivityLogout() {
    var time;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;     
    window.ontouchstart = resetTimer;   
    window.ontouchmove = resetTimer; 
    window.onclick = resetTimer;      
    window.onkeydown = resetTimer;   
    window.addEventListener('scroll', resetTimer, true);

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logoutRes, 1800000); 
    };
};
inactivityLogout();
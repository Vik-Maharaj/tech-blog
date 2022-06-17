async function deleteFormHandler(event) {

    event.preventDefault();

    let newId = event.currentTarget.getAttribute("data-commentid");

    const response = await fetch(`/api/comments/${newId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }

};

document.querySelectorAll(".delete-comment-btn").forEach(btn => {
    btn.addEventListener("click", deleteFormHandler)
});
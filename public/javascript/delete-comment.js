async function deleteFormHandler(event) {

    event.preventDefault();



};

document.querySelectorAll(".delete-comment-btn").forEach(btn => {
    btn.addEventListener("click", deleteFormHandler)
});
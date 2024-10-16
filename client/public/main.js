const title = document.querySelector('.title-header')
// fade in title
window.onload = e => {
    title.classList.remove('hidden')
    title.classList.add('appear')
}
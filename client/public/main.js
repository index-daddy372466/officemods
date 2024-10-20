
      const title = document.querySelector(".title-header");
const playbtns = document.querySelectorAll(".fl-right");
const module_list = document.querySelectorAll(".modules-list-item");
const preview = document.getElementById('preview')
// const img = preview.children[0] || document.querySelector('.prev-img')
const img = document.querySelector('.prev-img')
const prevMessage = document.getElementById('message')
// fade in title
window.onload = (e) => {
  title.classList.remove("hidden");
  title.classList.add("appear");
};

// interact with each module on left side
let currentMod
module_list.forEach((li, idx) => {
    // if btn-container matches the play button (in same index)
  if (li.children[2].children[0] == playbtns[idx].parentElement) {
    // assign li to currentMod
    currentMod = li;
    // mouse enter event listener
    currentMod.onmouseenter = (e) => {
      const mod = e.currentTarget;
      const text = mod.children[0].textContent.toLowerCase();
      const play = playbtns[idx].parentElement || mod.children[1];
      const arrow = mod.children[1]
      playbtns[idx].classList.remove('fl-right')
      prevMessage.classList.add('hide-prev')
      prevMessage.classList.remove('show-prev-msg')
      img.parentElement.classList.remove('hide-prev')
      arrow.classList.add('clip-arrow')
      play.classList.add("white-border");
      // while inside li, play-button can be modified
      play.onmouseenter = (e) => {
        play.classList.remove("white-border");
        play.classList.add("green-border");
        let article = e.target.parentElement;
        article.target = '_blank'
      };
      play.onmouseleave = (e) => {
        play.classList.remove("green-border");
        play.classList.add("white-border");
      };
      // display image in #preview (associate with li's H1 text-content)
      const url = `./media/${text.replace(/\s/gi,'-')}.gif`;
      img.src = url;
      img.alt = text;
    };
    // mouse leave event listener
    currentMod.onmouseleave = (e) => {
      let mod = e.currentTarget;
      const arrow = mod.children[1]
      arrow.classList.remove('clip-arrow')
        // prevMessage.classList.remove('hide-prev')
        // prevMessage.classList.add('show-prev-msg')
        const play = playbtns[idx].parentElement || e.target.children[1];
        play.classList.remove("white-border");
        // img.classList.add('hide-prev')
        playbtns[idx].classList.add('fl-right')
      
    };
  }
});
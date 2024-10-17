const title = document.querySelector(".title-header");
const playbtns = document.querySelectorAll(".fl-right");
const module_list = document.querySelectorAll(".modules-list-item");
const preview = document.getElementById('preview')
// const img = preview.children[0] || document.querySelector('.prev-img')
const img = document.querySelector('.prev-img')
// fade in title
window.onload = (e) => {
  title.classList.remove("hidden");
  title.classList.add("appear");
};

// interact with each module
let currentMod
module_list.forEach((li, idx) => {
    // if btn-container matches the play button (in same index)
  if (li.children[1].children[0] == playbtns[idx].parentElement) {
    currentMod = li;
    currentMod.onmouseenter = (e) => {
      playbtns[idx].classList.remove('fl-right')
      img.classList.remove('hide-prev')
      let mod = e.currentTarget;
      const text = mod.children[0].textContent.toLowerCase();
      const play = playbtns[idx].parentElement || mod.children[1];
      play.classList.add("white-border");
      // while inside li, play-button can be modified
      play.onmouseenter = (e) => {
        play.classList.remove("white-border");
        play.classList.add("green-border");
        let article = e.target.parentElement;
        article.href = `/module/${text}`
        article.target = '_blank'
      };
      play.onmouseleave = (e) => {
        play.classList.remove("green-border");
        play.classList.add("white-border");
      };
      // display image in #preview (associate with li's H1 text-content)
      const url = `./media/${text}.${/(calculator)/i.test(text)?'gif':'jpg'}`;
      img.src = url;
      img.alt = text;
    };
    currentMod.onmouseleave = (e) => {
        const play = playbtns[idx].parentElement || e.target.children[1];
        play.classList.remove("white-border");
        img.classList.add('hide-prev')
        playbtns[idx].classList.add('fl-right')
      
    };
  }
});


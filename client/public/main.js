const title = document.querySelector(".title-header");
const playbtns = document.querySelectorAll(".fl-right");
const module_list = document.querySelectorAll(".modules-list-item");
// fade in title
window.onload = (e) => {
  title.classList.remove("hidden");
  title.classList.add("appear");
};

// lis mouseover
let currentMod
module_list.forEach((li, idx) => {
    // if btn-container matches the play button (in same index)
  if (li.children[1] == playbtns[idx].parentElement) {
    currentMod = li;
    currentMod.onmouseenter = (e) => {
      const play = playbtns[idx].parentElement || e.target.children[1];
      play.classList.add("white-border");
      play.onmouseenter = (e) => {
        play.classList.remove("white-border");
        play.classList.add("green-border");
      };
      play.onmouseleave = (e) => {
        play.classList.add("white-border");
        play.classList.remove("green-border");
      };
    };
    currentMod.onmouseleave = (e) => {
      const play = playbtns[idx].parentElement || e.target.children[1];
      play.classList.remove("white-border");
    };
  }
});

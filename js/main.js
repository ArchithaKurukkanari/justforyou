let noCount = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const text = document.getElementById("text");
const gif = document.getElementById("gif");

noBtn.addEventListener("click", () => {
  noCount++;

  if (noCount === 1) {
    gif.src = "assets/gifs/cry1.gif";
    text.innerText = "Think again 😭";
    yesBtn.style.transform = "scale(1.3)";
  }

  else if (noCount === 2) {
    gif.src = "assets/gifs/cry2.gif";
    text.innerText = "Are you sure 😡?";
    yesBtn.style.transform = "scale(1.6)";
    noBtn.style.transform = "scale(0.8)";
  }

  else {
    gif.src = "assets/gifs/gun-cat.gif";
    text.innerText = "See this 😏";
    noBtn.style.display = "none";
    yesBtn.style.transform = "scale(2.2)";
  }
});

yesBtn.addEventListener("click", () => {
  window.location.href = "valentines.html";
});


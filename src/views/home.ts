import { initSettings } from "./settings";
export function initHome(): void {
  renderHome();
  addEvents();
}

function renderHome(): void {
  const app = document.querySelector("#app");

  if (!app) return;

  app.innerHTML = renderHomeHtml();
}

function renderHomeHtml() {
  return `
    <section class="home">
      <div class="home__container">
        <p class="home__subtitle">It's play time.</p>
        <h1 class="home__title">Ready to play?</h1>
      </div>
      <button class="home__play-button" type="button">
        <img
          class="home__play-icon"
          src="src/assets/icons/controller.svg"
          alt=""
        />
        <span class="home__play-text">Play</span>
        <img
          class="home__play-arrow"
          src="src/assets/icons/arrow-right.svg"
          alt=""
        />
      </button>
      <img
        class="home__background-image"
        src="src/assets/icons/controller-bg.svg"
        alt=""
      />
    </section>  
  `;
}

function addEvents() {
  const playButton = document.querySelector(".home__play-button");

  if (!playButton) return;

  playButton.addEventListener("click", () => {
    initSettings();
  });
}

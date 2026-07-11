import { initSettings } from "./settings";
export function initHome(): void {
  renderHome();
  addEvents();
}

function renderHome(): void {
  const app = document.querySelector("#app");

  if (!app) return;

  app.innerHTML = `
    <section class="home">
        <div class="home__container">
          <h1 class="home__subtitle">It's play time.</h1>
          <h2 class="home__title">Ready to play?</h2>
        </div>
        <button class="home__play-button">
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
  const playBtn = document.querySelector(".home__play-button");

  if (!playBtn) return;

  playBtn.addEventListener("click", () => {
    initSettings();
  });
}

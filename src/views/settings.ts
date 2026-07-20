import { initGame } from "./game";

initGame();

type Theme = {
  name: string;
  image: string;
};

const themeData = {
  "code-vibes": {
    name: "Code vibes",
    image: "/src/assets/images/preview/theme-one.svg",
  },

  gaming: {
    name: "Gaming",
    image: "/src/assets/images/preview/theme-two.svg",
  },

  "da-projects": {
    name: "DA Projects",
    image: "/src/assets/images/preview/theme-three.svg",
  },

  foods: {
    name: "Foods",
    image: "/src/assets/images/preview/theme-four.svg",
  },
};

const playerData = {
  blue: {
    name: "Blue",
  },
  orange: {
    name: "Orange",
  },
};

export function initSettings(): void {
  renderSettings();
  initThemeEvents();
  initPlayerEvents();
  initBoardEvents();
  initPlayButton();
}

function renderSettings(): void {
  const app = document.querySelector("#app");

  if (!app) return;

  app.innerHTML = `
    <div class="settings">
        <div class="settings__left">
          <h1 class="settings__headline">Settings</h1>
          <section class="settings__section settings__themes">
            <div class="settings__section-container">
              <img src="src/assets/icons/theme.svg" alt="" />
              <h2 class="settings__section-title">Game themes</h2>
            </div>
            <ul class="settings__list">
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="theme" value="code-vibes" />
                  <span class="settings__radio"></span>
                  <span class="settings__text">Code vibes theme</span>
                </label>
              </li>
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="theme" value="gaming"/>
                  <span class="settings__radio"></span>
                  <span class="settings__text">Gaming theme</span>
                </label>
              </li>
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="theme" value="da-projects"/>
                  <span class="settings__radio"></span>
                  <span class="settings__text">DA Projects theme</span>
                </label>
              </li>
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="theme" value="foods"/>
                  <span class="settings__radio"></span>
                  <span class="settings__text">Foods theme</span>
                </label>
              </li>
            </ul>
          </section>
          <section class="settings__section settings__player">
            <div class="settings__section-container">
              <img src="src/assets/icons/player.svg" alt="" />
              <h2 class="settings__section-title">Choose player</h2>
            </div>
            <ul class="settings__list">
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="player" value="blue" />
                  <span class="settings__radio"></span>
                  <span class="settings__text">Blue</span>
                </label>
              </li>
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="player" value="orange"/>
                  <span class="settings__radio"></span>
                  <span class="settings__text">Orange</span>
                </label>
              </li>
            </ul>
          </section>
          <section class="settings__section settings__board">
            <div class="settings__section-container">
              <img src="src/assets/icons/board.svg" alt="" />
              <h2 class="settings__section-title">Board size</h2>
            </div>
            <ul class="settings__list">
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="board" value="16"/>
                  <span class="settings__radio"></span>
                  <span class="settings__text">16 cards</span>
                </label>
              </li>
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="board" value="24"/>
                  <span class="settings__radio"></span>
                  <span class="settings__text">24 cards</span>
                </label>
              </li>
              <li>
                <label class="settings__label">
                  <input class="settings__input" type="radio" name="board" value="36"/>
                  <span class="settings__radio"></span>
                  <span class="settings__text">36 cards</span>
                </label>
              </li>
            </ul>
          </section>
        </div>
        <div class="settings__right">
          <section class="settings__game-preview">
            <div class="settings__preview-container">
              <img class="settings__preview-image" src="src/assets/images/preview/theme-one.svg" alt="" />
            </div>
            <div class="settings__preview-bar">
              <div class="settings__preview-item">
                <span class="settings__preview-theme">Game theme</span>
              </div>

              <div class="settings__preview-item">
                <span class="settings__preview-player">Player</span>
              </div>

              <div class="settings__preview-item">
                <span class="settings__preview-board">Board size</span>
              </div>

              <button class="settings__play-button" disabled>
                <img src="src/assets/icons/play-icon.svg" alt="" />
                <span>Start</span>
              </button>
            </div>
          </section>
        </div>
      </div>
  `;
}

function initThemeEvents(): void {
  const themeInputs = document.querySelectorAll<HTMLInputElement>(
    ".settings__input[name='theme']",
  );

  themeInputs.forEach((input) => {
    input.addEventListener("change", handleThemeChange);
    input.addEventListener("change", checkSettings);
  });

  const themeLabels =
    document.querySelectorAll<HTMLLabelElement>(".settings__label");

  themeLabels.forEach((label) => {
    label.addEventListener("mouseover", handleThemeHover);
    label.addEventListener("mouseleave", handleThemeDefault);
  });
}

function handleThemeChange(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  const value = input.value;
  const theme = themeData[value as keyof typeof themeData];

  updateThemePreview(theme);
  updateThemePreviewName(theme);
}

function updateThemePreview(theme: Theme): void {
  const image = document.querySelector(
    ".settings__preview-image",
  ) as HTMLImageElement;

  if (!image) return;
  image.src = theme.image;
}

function handleThemeHover(event: Event): void {
  const label = event.currentTarget as HTMLLabelElement;

  const input = label.querySelector<HTMLInputElement>(
    ".settings__input[name='theme']",
  );

  if (!input) return;
  const value = input.value as string;
  const theme = themeData[value as keyof typeof themeData];

  updateThemePreview(theme);
}

function handleThemeDefault(): void {
  const input = document.querySelector<HTMLInputElement>(
    ".settings__input[name='theme']:checked",
  );

  if (!input) return;

  const value = input.value;
  const theme = themeData[value as keyof typeof themeData];

  updateThemePreview(theme);
}

function initPlayerEvents(): void {
  const playerInputs = document.querySelectorAll<HTMLInputElement>(
    ".settings__input[name='player']",
  );

  playerInputs.forEach((input) => {
    input.addEventListener("change", handlePlayerChange);
    input.addEventListener("change", checkSettings);
  });
}

function handlePlayerChange(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  const value = input.value;

  updatePlayerPreview(value);
}

function updatePlayerPreview(value: string): void {
  const playerName = playerData[value as keyof typeof playerData].name;
  const playerPreview = document.querySelector<HTMLSpanElement>(
    ".settings__preview-player",
  );

  if (!playerPreview) return;

  playerPreview.textContent = playerName;
}

function updateThemePreviewName(theme: Theme): void {
  const imageName = document.querySelector<HTMLSpanElement>(
    ".settings__preview-theme",
  );

  if (!imageName) return;
  imageName.textContent = theme.name;
}

function initBoardEvents(): void {
  const boardInputs = document.querySelectorAll<HTMLInputElement>(
    ".settings__input[name='board']",
  );

  boardInputs.forEach((input) => {
    input.addEventListener("change", handleBoardChange);
    input.addEventListener("change", checkSettings);
  });
}

function handleBoardChange(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  const value = input.value;

  updateBoardPreview(value);
}

function updateBoardPreview(value: string) {
  const board = document.querySelector<HTMLSpanElement>(
    ".settings__preview-board",
  );

  if (!board) return;
  board.textContent = value;
}

function checkSettings(): void {
  const theme = document.querySelector(
    ".settings__input[name='theme']:checked",
  );

  const player = document.querySelector(
    ".settings__input[name='player']:checked",
  );

  const board = document.querySelector(
    ".settings__input[name='board']:checked",
  );

  const playBtn = document.querySelector<HTMLButtonElement>(
    ".settings__play-button",
  );

  if (!playBtn) return;
  playBtn.disabled = !(theme && player && board);
}

function initPlayButton(): void {
  const playBtn = document.querySelector<HTMLButtonElement>(
    ".settings__play-button",
  );

  if (!playBtn) return;
  playBtn.addEventListener("click", startNewGame);
}

function startNewGame() {
  initGame();
}

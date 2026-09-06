import { initGame } from "./game";
import {
  createSettingsOptionHtml,
  createGamePreviewHtml,
} from "./settings-html";

type Theme = {
  name: string;
  image: string;
};

export type ThemeName = "code-vibes" | "gaming";

export type GameSettings = {
  theme: ThemeName;
  player: string;
  board: number;
};

export type PlayerData = {
  blue: Player;
  orange: Player;
};

export type Player = {
  name: string;
  images: Record<ThemeName, string>;
};

const THEME_DATA = {
  "code-vibes": {
    name: "Code vibes",
    image: "/src/assets/images/preview/theme-one.svg",
  },

  gaming: {
    name: "Gaming",
    image: "/src/assets/images/preview/theme-two.svg",
  },
};

export const PLAYER_DATA: PlayerData = {
  blue: {
    name: "Blue",
    images: {
      "code-vibes": "src/assets/icons/label-blue.svg",
      gaming: "src/assets/icons/chess-blue.svg",
    },
  },
  orange: {
    name: "Orange",
    images: {
      "code-vibes": "src/assets/icons/label-orange.svg",
      gaming: "src/assets/icons/chess-orange.svg",
    },
  },
};

/** Initializes the settings screen and its interactions. */
export function initSettings(): void {
  renderSettings();
  initThemeEvents();
  initPlayerEvents();
  initBoardEvents();
  initPlayButton();
}

/** Renders the settings screen in the application container. */
export function renderSettings(): void {
  const app = document.querySelector("#app");
  const leftHtml = createSettingsOptionHtml();
  const rightHtml = createGamePreviewHtml();

  if (!app) return;

  app.innerHTML = `
    <section class="settings" aria-labelledby="settings-title">
     ${leftHtml}   
     ${rightHtml}     
    </section>
  `;
}

/** Registers theme selection and preview event listeners. */
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

/**
 * Updates the theme preview after a theme selection.
 *
 * @param event - The change event from a theme input.
 */
function handleThemeChange(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  const value = input.value;
  const theme = THEME_DATA[value as keyof typeof THEME_DATA];

  updateThemePreview(theme);
  updateThemePreviewName(theme);
}

/**
 * Updates the preview image for a theme.
 *
 * @param theme - The theme to preview.
 */
function updateThemePreview(theme: Theme): void {
  const image = document.querySelector(
    ".settings__preview-image",
  ) as HTMLImageElement;

  if (!image) return;
  image.src = theme.image;
}

/**
 * Temporarily previews the theme belonging to a hovered option.
 *
 * @param event - The mouse event from a theme label.
 */
function handleThemeHover(event: Event): void {
  const label = event.currentTarget as HTMLLabelElement;

  const input = label.querySelector<HTMLInputElement>(
    ".settings__input[name='theme']",
  );

  if (!input) return;
  const value = input.value as string;
  const theme = THEME_DATA[value as keyof typeof THEME_DATA];

  updateThemePreview(theme);
}

/** Restores the preview of the currently selected theme. */
function handleThemeDefault(): void {
  const input = document.querySelector<HTMLInputElement>(
    ".settings__input[name='theme']:checked",
  );

  if (!input) return;

  const value = input.value;
  const theme = THEME_DATA[value as keyof typeof THEME_DATA];

  updateThemePreview(theme);
}

/** Registers player selection event listeners. */
function initPlayerEvents(): void {
  const playerInputs = document.querySelectorAll<HTMLInputElement>(
    ".settings__input[name='player']",
  );

  playerInputs.forEach((input) => {
    input.addEventListener("change", handlePlayerChange);
    input.addEventListener("change", checkSettings);
  });
}

/**
 * Updates the player preview after a player selection.
 *
 * @param event - The change event from a player input.
 */
function handlePlayerChange(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  const value = input.value;

  updatePlayerPreview(value);
}

/**
 * Displays the selected player's name in the preview.
 *
 * @param value - The selected player identifier.
 */
function updatePlayerPreview(value: string): void {
  const playerName = PLAYER_DATA[value as keyof typeof PLAYER_DATA].name;
  const playerPreview = document.querySelector<HTMLSpanElement>(
    ".settings__preview-player",
  );

  if (!playerPreview) return;

  playerPreview.textContent = playerName;
}

/**
 * Displays the selected theme's name in the preview.
 *
 * @param theme - The selected theme.
 */
function updateThemePreviewName(theme: Theme): void {
  const imageName = document.querySelector<HTMLSpanElement>(
    ".settings__preview-theme",
  );

  if (!imageName) return;
  imageName.textContent = theme.name;
}

/** Registers board size selection event listeners. */
function initBoardEvents(): void {
  const boardInputs = document.querySelectorAll<HTMLInputElement>(
    ".settings__input[name='board']",
  );

  boardInputs.forEach((input) => {
    input.addEventListener("change", handleBoardChange);
    input.addEventListener("change", checkSettings);
  });
}

/**
 * Updates the board preview after a size selection.
 *
 * @param event - The change event from a board input.
 */
function handleBoardChange(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  const value = input.value;

  updateBoardPreview(value);
}

/**
 * Displays the selected board size in the preview.
 *
 * @param value - The selected number of cards.
 */
function updateBoardPreview(value: string): void {
  const board = document.querySelector<HTMLSpanElement>(
    ".settings__preview-board",
  );

  if (!board) return;
  board.textContent = value;
}

/** Enables the play button when every required setting is selected. */
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

/** Registers the event listener that starts a game. */
function initPlayButton(): void {
  const playBtn = document.querySelector<HTMLButtonElement>(
    ".settings__play-button",
  );

  if (!playBtn) return;
  playBtn.addEventListener("click", startNewGame);
}

/** Starts a game with the currently selected settings. */
function startNewGame(): void {
  getSelectedSettings();
}

/** Reads, validates, and applies the selected game settings. */
function getSelectedSettings(): void {
  const theme = document.querySelector<HTMLInputElement>(
    ".settings__input[name='theme']:checked",
  );

  const player = document.querySelector<HTMLInputElement>(
    ".settings__input[name='player']:checked",
  );

  const board = document.querySelector<HTMLInputElement>(
    ".settings__input[name='board']:checked",
  );

  if (!theme || !player || !board) return;

  const selectedSettings: GameSettings = {
    theme: theme.value as ThemeName,
    player: player.value,
    board: Number(board.value),
  };

  initGame(selectedSettings, PLAYER_DATA);
}

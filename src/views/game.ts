import type { GameSettings, PlayerData, ThemeName } from "./settings";
import { initSettings } from "./settings";
import { initGameOverScreen } from "./gameover";
import { renderEndScreen } from "./gameover";

export const THEME_DATA = {
  "code-vibes": {
    name: "Code vibes",
    images: [
      "src/assets/images/themes/code-vibes/angular.svg",
      "src/assets/images/themes/code-vibes/bootstrap.svg",
      "src/assets/images/themes/code-vibes/css.svg",
      "src/assets/images/themes/code-vibes/django.svg",
      "src/assets/images/themes/code-vibes/firebase.svg",
      "src/assets/images/themes/code-vibes/git.svg",
      "src/assets/images/themes/code-vibes/github.svg",
      "src/assets/images/themes/code-vibes/html.svg",
      "src/assets/images/themes/code-vibes/js.svg",
      "src/assets/images/themes/code-vibes/node-js.svg",
      "src/assets/images/themes/code-vibes/python.svg",
      "src/assets/images/themes/code-vibes/react.svg",
      "src/assets/images/themes/code-vibes/sass.svg",
      "src/assets/images/themes/code-vibes/sql.svg",
      "src/assets/images/themes/code-vibes/terminal.svg",
      "src/assets/images/themes/code-vibes/ts.svg",
      "src/assets/images/themes/code-vibes/vsc.svg",
      "src/assets/images/themes/code-vibes/vue.svg",
    ],
    front: "src/assets/images/themes/code-vibes/front.svg",
  },
  gaming: {
    name: "Gaming",
    images: [
      "src/assets/images/themes/gaming/1up.svg",
      "src/assets/images/themes/gaming/banana.svg",
      "src/assets/images/themes/gaming/card.svg",
      "src/assets/images/themes/gaming/circle.svg",
      "src/assets/images/themes/gaming/coin.svg",
      "src/assets/images/themes/gaming/controller.svg",
      "src/assets/images/themes/gaming/dice.svg",
      "src/assets/images/themes/gaming/gameboy.svg",
      "src/assets/images/themes/gaming/levelup.svg",
      "src/assets/images/themes/gaming/maze.svg",
      "src/assets/images/themes/gaming/minecraft.svg",
      "src/assets/images/themes/gaming/pacman.svg",
      "src/assets/images/themes/gaming/pacman2.svg",
      "src/assets/images/themes/gaming/play.svg",
      "src/assets/images/themes/gaming/puzzle.svg",
      "src/assets/images/themes/gaming/snake.svg",
      "src/assets/images/themes/gaming/square.svg",
      "src/assets/images/themes/gaming/triangle.svg",
    ],
    front: "src/assets/images/themes/gaming/front.svg",
  },
};

type CardGameState = {
  firstCard: HTMLButtonElement | null;
  secondCard: HTMLButtonElement | null;
  isChecking: boolean;
};

let playerOne: string = "";
let playerTwo: string = "";
let currentPlayer: string = "";
let playerOneScore = 0;
let playerTwoScore = 0;

export function initGame(settings: GameSettings, playerData: PlayerData): void {
  resetGameState();
  renderGame(settings, playerData);
  handleExitGame();
  handleOverlayButtons();
}

function renderGame(settings: GameSettings, playerData: PlayerData): void {
  if (!settings || !playerData) return;

  const selectedTheme = THEME_DATA[settings.theme];
  const cards = selectedTheme.images;
  const cardsCover = selectedTheme.front;
  const pairCount = settings.board / 2;
  const selectedCards = cards.slice(0, pairCount);
  const gameCards = [...selectedCards, ...selectedCards];

  for (let i = gameCards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = gameCards[i];
    gameCards[i] = gameCards[randomIndex];
    gameCards[randomIndex] = temp;
  }

  renderGameHTML(settings, playerData);
  renderBoardHTML(cardsCover, gameCards);
  handleCardGame(settings, playerData);
}

function renderGameHTML(settings: GameSettings, playerData: PlayerData): void {
  const app = document.querySelector("#app");

  if (!app) return;

  app.innerHTML = `
  <section id="game" class="game game--${settings.theme}" aria-labelledby="game-title">
    <h1 id="game-title" class="visually-hidden">Memory game</h1>
    ${renderHeader(settings, playerData)}
    <div class="game__board-container">
      <section id="board" class="game__board game__board--${settings.board}" aria-label="Memory card board"></section>
      ${renderOverlayHTML(settings.theme)}
    </div>
  </section>
  `;
}

function renderBoardHTML(cardsCover: string, gameCards: string[]): void {
  const board = document.querySelector("#board");
  let boardHTML = "";

  if (!board) return;

  for (let i = 0; i < gameCards.length; i++) {
    boardHTML += `
      <button class="game__card" type="button" aria-label="Turn over memory card ${i + 1}">
        <img class="game__card-cover" src="${cardsCover}" alt="Face-down memory card">
        <img class="game__card-image" src="${gameCards[i]}" alt="Memory card ${i + 1}">
      </button>
    `;
  }
  board.innerHTML = boardHTML;
}

function renderHeader(settings: GameSettings, playerData: PlayerData): string {
  playerOne = settings.player;

  if (playerOne === "orange") {
    playerTwo = "blue";
  } else {
    playerTwo = "orange";
  }

  currentPlayer = playerOne;
  const playerOneImage =
    playerData[playerOne as keyof PlayerData].images[settings.theme];

  const playerTwoImage =
    playerData[playerTwo as keyof PlayerData].images[settings.theme];

  const currentPlayerImage =
    playerData[currentPlayer as keyof PlayerData].images[settings.theme];

  return renderHeaderHTML(
    playerOneImage,
    playerOne,
    playerTwoImage,
    playerTwo,
    currentPlayerImage,
    settings.theme,
  );
}

function renderHeaderHTML(
  playerOneImage: string,
  playerOne: string,
  playerTwoImage: string,
  playerTwo: string,
  currentPlayerImage: string,
  theme: ThemeName,
): string {
  return `<header class="game__header game__header--${theme}">
      <div class="game__player-container">
        <div class="player-one">
          <img class="player-one__image" src="${playerOneImage}" alt="${playerOne} player">
          <span class="player-one__name player-one__name--${playerOne}">${playerOne}</span>
          <span class="player-one__stats player-one__stats--${playerOne}">${playerOneScore}</span>
        </div>
        <div class="player-two">
          <img class="player-two__image" src="${playerTwoImage}" alt="${playerTwo} player">
          <span class="player-two__name player-two__name--${playerTwo}">${playerTwo}</span>
          <span class="player-two__stats player-two__stats--${playerTwo}">${playerTwoScore}</span>
        </div>
      </div>
      <div class="game__current-player">
        <span class="game__current-player-label game__current-player-label--${theme}">Current player:</span>
        <span class="game__current-player-figure game__current-player-figure--theme-${theme} game__current-player-figure--player-${currentPlayer}">
          <img class="game__current-player-image game__current-player-image--theme-${theme}" src="${currentPlayerImage}" alt="${currentPlayer} player's turn">
        </span>
      </div>
      <button id="exitButton" class="game__exit-game game__exit-game--${theme}" type="button">
        <span class="game__exit-icon" aria-hidden="true"></span>
        <span>Exit game</span>
      </button>
    </header>`;
}

function renderOverlayHTML(theme: ThemeName): string {
  return `
  <div id="overlayWrapper" class="overlay__wrapper dNone">
    <section class="overlay overlay--${theme}" role="dialog" aria-modal="true" aria-labelledby="exit-dialog-title">
      <h2 id="exit-dialog-title" class="overlay__text overlay__text--${theme}">Do you really want to exit the game?</h2>
      <div class="overlay__buttons overlay__buttons--${theme}">
        <button
        id="backToGame" class="overlay__button-left overlay__button-left--${theme}" type="button">Back to game</button>
        <button id="exitGame" class="overlay__button-right overlay__button-right--${theme}" type="button">Exit game</button>
      </div>
    </section>
  </div>
  `;
}

function updateCardVisibility(card: HTMLButtonElement) {
  const cover = card.querySelector<HTMLImageElement>(".game__card-cover");
  const image = card.querySelector<HTMLImageElement>(".game__card-image");

  if (!cover || !image) return;

  if (card.classList.contains("is-flipped")) {
    cover.style.opacity = "0";
    image.style.opacity = "1";
  } else {
    cover.style.opacity = "1";
    image.style.opacity = "0";
  }
}

function handleCardGame(settings: GameSettings, playerData: PlayerData): void {
  const cards = document.querySelectorAll<HTMLButtonElement>(".game__card");
  const state: CardGameState = {
    firstCard: null,
    secondCard: null,
    isChecking: false,
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      handleCardClick(card, state, settings, playerData);
    });
  });
}

function handleCardClick(
  card: HTMLButtonElement,
  state: CardGameState,
  settings: GameSettings,
  playerData: PlayerData,
): void {
  if (!canFlipCard(card, state)) return;

  flipCard(card);

  if (!state.firstCard) {
    state.firstCard = card;
    return;
  }

  state.secondCard = card;
  state.isChecking = true;

  compareCards(state, settings, playerData);
}

function canFlipCard(card: HTMLButtonElement, state: CardGameState): boolean {
  return (
    !state.isChecking &&
    !card.classList.contains("is-matched") &&
    card !== state.firstCard
  );
}

function flipCard(card: HTMLButtonElement): void {
  card.classList.add("is-flipped");
  updateCardVisibility(card);
}

function compareCards(
  state: CardGameState,
  settings: GameSettings,
  playerData: PlayerData,
): void {
  const { firstCard, secondCard } = state;

  if (!firstCard || !secondCard) {
    resetCardSelection(state);
    return;
  }

  if (getCardImageSource(firstCard) === getCardImageSource(secondCard)) {
    handleMatchingCards(firstCard, secondCard, state, settings);
    return;
  }

  handleDifferentCards(firstCard, secondCard, state, settings, playerData);
}

function getCardImageSource(card: HTMLButtonElement): string {
  return card.querySelector<HTMLImageElement>(".game__card-image")?.src ?? "";
}

function handleMatchingCards(
  firstCard: HTMLButtonElement,
  secondCard: HTMLButtonElement,
  state: CardGameState,
  settings: GameSettings,
): void {
  firstCard.classList.add("is-matched");
  secondCard.classList.add("is-matched");
  increaseCurrentPlayerScore();
  updateCurrentPlayerScore();
  checkGameOver(settings.board, settings.theme);
  resetCardSelection(state);
}

function increaseCurrentPlayerScore(): void {
  if (currentPlayer === playerOne) {
    playerOneScore++;
    return;
  }

  playerTwoScore++;
}

function updateCurrentPlayerScore(): void {
  const playerClass = currentPlayer === playerOne ? "player-one" : "player-two";
  const playerStats = document.querySelector<HTMLSpanElement>(
    `.${playerClass}__stats`,
  );

  if (!playerStats) return;

  const score = currentPlayer === playerOne ? playerOneScore : playerTwoScore;
  playerStats.textContent = String(score);
}

function handleDifferentCards(
  firstCard: HTMLButtonElement,
  secondCard: HTMLButtonElement,
  state: CardGameState,
  settings: GameSettings,
  playerData: PlayerData,
): void {
  setTimeout(() => {
    hideCard(firstCard);
    hideCard(secondCard);
    switchCurrentPlayer();
    updateCurrentPlayerDisplay(settings, playerData);
    resetCardSelection(state);
  }, 1000);
}

function hideCard(card: HTMLButtonElement): void {
  card.classList.remove("is-flipped");
  updateCardVisibility(card);
}

function switchCurrentPlayer(): void {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

function updateCurrentPlayerDisplay(
  settings: GameSettings,
  playerData: PlayerData,
): void {
  const image = document.querySelector<HTMLImageElement>(
    ".game__current-player-image",
  );

  if (!image) return;

  image.src =
    playerData[currentPlayer as keyof PlayerData].images[settings.theme];
  image.alt = `${currentPlayer} player's turn`;

  const figure = image.closest(".game__current-player-figure");
  figure?.classList.remove(
    "game__current-player-figure--player-blue",
    "game__current-player-figure--player-orange",
  );
  figure?.classList.add(`game__current-player-figure--player-${currentPlayer}`);
}

function resetCardSelection(state: CardGameState): void {
  state.firstCard = null;
  state.secondCard = null;
  state.isChecking = false;
}

function checkGameOver(boardSize: number, theme: ThemeName): void {
  const matchedCards = document.querySelectorAll(".game__card.is-matched");

  if (matchedCards.length === boardSize) {
    initGameOverScreen(
      playerOne,
      playerOneScore,
      playerTwo,
      playerTwoScore,
      theme,
    );
    setTimeout(() => {
      if (playerOneScore > playerTwoScore) {
        renderEndScreen(playerOne, theme);
      }
      if (playerOneScore < playerTwoScore) {
        renderEndScreen(playerTwo, theme);
      }
      if (playerOneScore === playerTwoScore) {
        renderEndScreen("draw", theme);
      }
    }, 2000);
  }
}

function resetGameState(): void {
  playerOne = "";
  playerTwo = "";
  currentPlayer = "";
  playerOneScore = 0;
  playerTwoScore = 0;
}

function handleExitGame(): void {
  const exitButton = document.querySelector<HTMLButtonElement>("#exitButton");

  if (!exitButton) return;

  exitButton.addEventListener("click", toggleOverlay);
}

function toggleOverlay(): void {
  const overlayWrapper = document.querySelector<HTMLElement>("#overlayWrapper");
  const overlay = overlayWrapper?.querySelector<HTMLElement>(".overlay");

  if (!overlayWrapper || !overlay) return;

  const isHidden = overlayWrapper.classList.contains("dNone");

  if (isHidden) {
    overlay.classList.remove("is-closing");
    overlayWrapper.classList.remove("dNone");
    return;
  }

  overlay.classList.add("is-closing");

  overlay.addEventListener(
    "animationend",
    () => {
      overlayWrapper.classList.add("dNone");
      overlay.classList.remove("is-closing");
    },
    { once: true },
  );
}

function handleOverlayButtons(): void {
  const overlayWrapper = document.querySelector<HTMLElement>("#overlayWrapper");
  const overlay = overlayWrapper?.querySelector<HTMLElement>(".overlay");
  const backToGame = document.querySelector<HTMLButtonElement>("#backToGame");
  const exitGame = document.querySelector<HTMLButtonElement>("#exitGame");

  if (!overlayWrapper || !overlay || !backToGame || !exitGame) return;

  overlayWrapper.addEventListener("click", toggleOverlay);

  overlay.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  backToGame.addEventListener("click", toggleOverlay);

  exitGame.addEventListener("click", () => {
    resetGameState();
    initSettings();
  });
}

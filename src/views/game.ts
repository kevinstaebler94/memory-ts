import type { GameSettings, PlayerData, ThemeName } from "./settings";
import { initSettings } from "./settings";
import { initGameOverScreen } from "./gameover";
import { renderEndScreen } from "./gameover";
import { THEME_DATA } from "./game-data";
import {
  createBoardHtml,
  createGameHtml,
  createHeaderHtml,
} from "./game-html";

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

  app.innerHTML = createGameHtml(settings, createHeader(settings, playerData));
}

function renderBoardHTML(cardsCover: string, gameCards: string[]): void {
  const board = document.querySelector("#board");
  if (!board) return;

  board.innerHTML = createBoardHtml(cardsCover, gameCards);
}

function createHeader(settings: GameSettings, playerData: PlayerData): string {
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

  return createHeaderHtml({
    playerOneImage,
    playerOne,
    playerOneScore,
    playerTwoImage,
    playerTwo,
    playerTwoScore,
    currentPlayerImage,
    currentPlayer,
    theme: settings.theme,
  });
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

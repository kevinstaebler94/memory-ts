import type { GameSettings, PlayerData, ThemeName } from "./settings";
import { initGameOverScreen } from "./gameover";
import { renderEndScreen } from "./gameover";
import { THEME_DATA } from "./game-data";
import { createBoardHtml, createGameHtml, createHeaderHtml } from "./game-html";
import { handleExitGame, handleOverlayButtons } from "./game-overlay";

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

/**
 * Initializes a new game with the selected configuration.
 *
 * @param settings - The selected theme, player, and board size.
 * @param playerData - The available player metadata.
 */
export function initGame(settings: GameSettings, playerData: PlayerData): void {
  resetGameState();
  renderGame(settings, playerData);
  handleExitGame();
  handleOverlayButtons();
}

/**
 * Prepares, shuffles, and renders the cards for a game.
 *
 * @param settings - The selected game configuration.
 * @param playerData - The available player metadata.
 */
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

/**
 * Renders the game layout in the application container.
 *
 * @param settings - The selected game configuration.
 * @param playerData - The available player metadata.
 */
function renderGameHTML(settings: GameSettings, playerData: PlayerData): void {
  const app = document.querySelector("#app");

  if (!app) return;

  app.innerHTML = createGameHtml(settings, createHeader(settings, playerData));
}

/**
 * Renders the prepared cards on the game board.
 *
 * @param cardsCover - The image shown on face-down cards.
 * @param gameCards - The shuffled card image paths.
 */
function renderBoardHTML(cardsCover: string, gameCards: string[]): void {
  const board = document.querySelector("#board");
  if (!board) return;

  board.innerHTML = createBoardHtml(cardsCover, gameCards);
}

/**
 * Assigns the players and creates the initial game header.
 *
 * @param settings - The selected game configuration.
 * @param playerData - The available player metadata.
 * @returns The game header HTML.
 */
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

/**
 * Synchronizes a card's images with its flipped state.
 *
 * @param card - The card whose images should be updated.
 */
function updateCardVisibility(card: HTMLButtonElement): void {
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

/**
 * Creates the selection state and registers card click listeners.
 *
 * @param settings - The active game configuration.
 * @param playerData - The available player metadata.
 */
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

/**
 * Processes the selection of a memory card.
 *
 * @param card - The selected card.
 * @param state - The current card selection state.
 * @param settings - The active game configuration.
 * @param playerData - The available player metadata.
 */
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

/**
 * Determines whether a card can be selected in the current state.
 *
 * @param card - The card to validate.
 * @param state - The current card selection state.
 * @returns Whether the card can be flipped.
 */
function canFlipCard(card: HTMLButtonElement, state: CardGameState): boolean {
  return (
    !state.isChecking &&
    !card.classList.contains("is-matched") &&
    card !== state.firstCard
  );
}

/**
 * Turns a card face up.
 *
 * @param card - The card to reveal.
 */
function flipCard(card: HTMLButtonElement): void {
  card.classList.add("is-flipped");
  updateCardVisibility(card);
}

/**
 * Compares the two selected cards and handles the result.
 *
 * @param state - The current card selection state.
 * @param settings - The active game configuration.
 * @param playerData - The available player metadata.
 */
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

/**
 * Gets the image URL that identifies a card.
 *
 * @param card - The card to inspect.
 * @returns The card image URL, or an empty string when absent.
 */
function getCardImageSource(card: HTMLButtonElement): string {
  return card.querySelector<HTMLImageElement>(".game__card-image")?.src ?? "";
}

/**
 * Marks a pair as matched, updates the score, and checks for game over.
 *
 * @param firstCard - The first matching card.
 * @param secondCard - The second matching card.
 * @param state - The current card selection state.
 * @param settings - The active game configuration.
 */
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

/** Increments the active player's score. */
function increaseCurrentPlayerScore(): void {
  if (currentPlayer === playerOne) {
    playerOneScore++;
    return;
  }

  playerTwoScore++;
}

/** Updates the active player's score in the game header. */
function updateCurrentPlayerScore(): void {
  const playerClass = currentPlayer === playerOne ? "player-one" : "player-two";
  const playerStats = document.querySelector<HTMLSpanElement>(
    `.${playerClass}__stats`,
  );

  if (!playerStats) return;

  const score = currentPlayer === playerOne ? playerOneScore : playerTwoScore;
  playerStats.textContent = String(score);
}

/**
 * Hides a mismatched pair and passes the turn to the other player.
 *
 * @param firstCard - The first mismatched card.
 * @param secondCard - The second mismatched card.
 * @param state - The current card selection state.
 * @param settings - The active game configuration.
 * @param playerData - The available player metadata.
 */
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

/**
 * Turns a card face down.
 *
 * @param card - The card to hide.
 */
function hideCard(card: HTMLButtonElement): void {
  card.classList.remove("is-flipped");
  updateCardVisibility(card);
}

/** Passes the turn to the other player. */
function switchCurrentPlayer(): void {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

/**
 * Updates the header to identify the active player.
 *
 * @param settings - The active game configuration.
 * @param playerData - The available player metadata.
 */
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

/**
 * Clears the selected cards and unlocks card input.
 *
 * @param state - The card selection state to reset.
 */
function resetCardSelection(state: CardGameState): void {
  state.firstCard = null;
  state.secondCard = null;
  state.isChecking = false;
}

/**
 * Shows the final score and result when all pairs are matched.
 *
 * @param boardSize - The total number of cards on the board.
 * @param theme - The active game theme.
 */
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

/** Resets all player and score state for a fresh game. */
export function resetGameState(): void {
  playerOne = "";
  playerTwo = "";
  currentPlayer = "";
  playerOneScore = 0;
  playerTwoScore = 0;
}

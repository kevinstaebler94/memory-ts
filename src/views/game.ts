import type { GameSettings, PlayerData, ThemeName } from "./settings";
import { initGameOverScreen } from "./gameover";
import { renderEndScreen } from "./gameover";
import { THEME_DATA } from "./game-data";
import { createHeaderHtml, renderGameHTML, renderBoardHTML } from "./game-html";
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
export function initGame(playerData: PlayerData): void {
  const storedSettings = localStorage.getItem("settings");

  if (!storedSettings) return;

  const parsedSettings: GameSettings = JSON.parse(storedSettings);

  resetGameState();
  renderGame(parsedSettings, playerData);
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

  const gameData = prepareGameData(settings);
  shuffleCards(gameData.gameCards);
  renderGameHTML(settings, playerData);
  renderBoardHTML(gameData.cardsCover, gameData.gameCards);
  handleCardGame(settings, playerData);
}

/**
 * Selects the card cover and creates pairs for the chosen board size.
 *
 * @param settings - The selected theme and board size.
 * @returns The card cover image path and the unshuffled card pairs.
 */
function prepareGameData(settings: GameSettings) {
  const selectedTheme = THEME_DATA[settings.theme];
  const cards = selectedTheme.images;
  const cardsCover = selectedTheme.front;
  const pairCount = settings.board / 2;
  const selectedCards = cards.slice(0, pairCount);
  const gameCards = [...selectedCards, ...selectedCards];

  return { cardsCover, gameCards };
}

/**
 * Shuffles the cards in place using the Fisher-Yates algorithm.
 *
 * @param gameCards - The card image paths to reorder.
 */
function shuffleCards(gameCards: string[]) {
  for (let i = gameCards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = gameCards[i];
    gameCards[i] = gameCards[randomIndex];
    gameCards[randomIndex] = temp;
  }
}

/**
 * Assigns the players and creates the initial game header.
 *
 * @param settings - The selected game configuration.
 * @param playerData - The available player metadata.
 * @returns The game header HTML.
 */
export function createHeader(settings: GameSettings, playerData: PlayerData): string {
  playerOne = settings.player;

  if (playerOne === "orange") {
    playerTwo = "blue";
  } else {
    playerTwo = "orange";
  }

  return getPlayerImage(playerOne, settings.theme, playerData);
}

/**
 * Sets the active player and creates the header with theme-specific player images.
 *
 * @param player - The identifier of the player whose turn starts the game.
 * @param theme - The active game theme.
 * @param playerData - The available player metadata.
 * @returns The game header HTML.
 */
function getPlayerImage(player: string, theme: ThemeName, playerData: PlayerData) {
  currentPlayer = player;
  const playerOneImage = playerData[playerOne as keyof PlayerData].images[theme];
  const playerTwoImage = playerData[playerTwo as keyof PlayerData].images[theme];
  const currentPlayerImage = playerData[currentPlayer as keyof PlayerData].images[theme];

  return createHeaderHtml({
    playerOneImage,
    playerOne,
    playerOneScore,
    playerTwoImage,
    playerTwo,
    playerTwoScore,
    currentPlayerImage,
    currentPlayer,
    theme,
  });
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
function handleCardClick(card: HTMLButtonElement, state: CardGameState, settings: GameSettings, playerData: PlayerData): void {
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
  return !state.isChecking && !card.classList.contains("is-matched") && card !== state.firstCard;
}

/**
 * Turns a card face up.
 *
 * @param card - The card to reveal.
 */
function flipCard(card: HTMLButtonElement): void {
  card.classList.add("is-flipped");
}

/**
 * Compares the two selected cards and handles the result.
 *
 * @param state - The current card selection state.
 * @param settings - The active game configuration.
 * @param playerData - The available player metadata.
 */
function compareCards(state: CardGameState, settings: GameSettings, playerData: PlayerData): void {
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
function handleMatchingCards(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement, state: CardGameState, settings: GameSettings): void {
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
  const playerStats = document.querySelector<HTMLSpanElement>(`.${playerClass}__stats`);

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
function handleDifferentCards(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement, state: CardGameState, settings: GameSettings, playerData: PlayerData): void {
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
function updateCurrentPlayerDisplay(settings: GameSettings, playerData: PlayerData): void {
  const image = document.querySelector<HTMLImageElement>(".game__current-player-image");

  if (!image) return;

  image.src = playerData[currentPlayer as keyof PlayerData].images[settings.theme];
  image.alt = `${currentPlayer} player's turn`;

  const figure = image.closest(".game__current-player-figure");
  figure?.classList.remove("game__current-player-figure--player-blue", "game__current-player-figure--player-orange");
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
    setTimeout(() => {
      initGameOverScreen(playerOne, playerOneScore, playerTwo, playerTwoScore, theme);
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
    }, 1000);
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

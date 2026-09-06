import type { GameSettings, ThemeName } from "./settings";

type GameHeaderData = {
  playerOneImage: string;
  playerOne: string;
  playerOneScore: number;
  playerTwoImage: string;
  playerTwo: string;
  playerTwoScore: number;
  currentPlayerImage: string;
  currentPlayer: string;
  theme: ThemeName;
};

/**
 * Creates the main game layout.
 *
 * @param settings - The selected game configuration.
 * @param headerHtml - The rendered game header.
 * @returns The game layout HTML.
 */
export function createGameHtml(
  settings: GameSettings,
  headerHtml: string,
): string {
  return `
  <section id="game" class="game game--${settings.theme}" aria-labelledby="game-title">
    <h1 id="game-title" class="visually-hidden">Memory game</h1>
    ${headerHtml}
    <div class="game__board-container">
      <section id="board" class="game__board game__board--${settings.board}" aria-label="Memory card board"></section>
      ${createOverlayHtml(settings.theme)}
    </div>
  </section>
  `;
}

/**
 * Creates the cards for the memory board.
 *
 * @param cardsCover - The image shown on face-down cards.
 * @param gameCards - The shuffled card image paths.
 * @returns The board cards HTML.
 */
export function createBoardHtml(
  cardsCover: string,
  gameCards: string[],
): string {
  let boardHtml = "";

  for (let i = 0; i < gameCards.length; i++) {
    boardHtml += `
      <button class="game__card" type="button" aria-label="Turn over memory card ${i + 1}">
        <img class="game__card-cover" src="${cardsCover}" alt="Face-down memory card">
        <img class="game__card-image" src="${gameCards[i]}" alt="Memory card ${i + 1}">
      </button>
    `;
  }

  return boardHtml;
}

/**
 * Creates the game header with player and turn information.
 *
 * @param data - The data displayed in the game header.
 * @returns The game header HTML.
 */
export function createHeaderHtml({
  playerOneImage,
  playerOne,
  playerOneScore,
  playerTwoImage,
  playerTwo,
  playerTwoScore,
  currentPlayerImage,
  currentPlayer,
  theme,
}: GameHeaderData): string {
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

/**
 * Creates the exit confirmation dialog.
 *
 * @param theme - The active game theme.
 * @returns The exit overlay HTML.
 */
function createOverlayHtml(theme: ThemeName): string {
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

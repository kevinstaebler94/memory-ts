import { PLAYER_DATA, initSettings } from "./settings";
import type { ThemeName } from "./settings";

type ResultType = "draw" | "winner";
type RestartButtonLabel = "Back to start" | "Home";
type EndGameState = "draw" | "orange" | "blue";

type EndGameImages = {
  draw: { image: string };
  orange: { image: string };
  blue: { image: string };
};

type EndGameData = {
  "code-vibes": EndGameImages;
  gaming: EndGameImages;
  "da-projects": EndGameImages;
  foods: EndGameImages;
};

type GameOverScreenData = {
  playerOne: string;
  playerOneScore: number;
  playerTwo: string;
  playerTwoScore: number;
  theme: ThemeName;
  playerOneImage: string;
  playerTwoImage: string;
};

type EndScreenData = {
  player: string;
  theme: ThemeName;
  resultType: ResultType;
  restartButtonLabel: RestartButtonLabel;
  winningState: string;
};

const END_GAME_DATA: EndGameData = {
  "code-vibes": {
    draw: {
      image: "src/assets/images/gameover/draw.svg",
    },
    orange: {
      image: "src/assets/images/gameover/player-orange.svg",
    },
    blue: {
      image: "src/assets/images/gameover/player-blue.svg",
    },
  },
  gaming: {
    draw: {
      image: "src/assets/images/gameover/draw.svg",
    },
    orange: {
      image: "src/assets/images/gameover/pockal.svg",
    },
    blue: {
      image: "src/assets/images/gameover/pockal.svg",
    },
  },
  "da-projects": {
    draw: {
      image: "src/assets/images/gameover/draw.svg",
    },
    orange: {
      image: "src/assets/images/gameover/player-orange.svg",
    },
    blue: {
      image: "src/assets/images/gameover/player-blue.svg",
    },
  },
  foods: {
    draw: {
      image: "src/assets/images/gameover/draw.svg",
    },
    orange: {
      image: "src/assets/images/gameover/player-orange.svg",
    },
    blue: {
      image: "src/assets/images/gameover/player-blue.svg",
    },
  },
};

/**
 * Initializes the final score screen.
 *
 * @param playerOne - The first player's identifier.
 * @param playerOneScore - The first player's score.
 * @param playerTwo - The second player's identifier.
 * @param playerTwoScore - The second player's score.
 * @param theme - The active game theme.
 */
export function initGameOverScreen(
  playerOne: string,
  playerOneScore: number,
  playerTwo: string,
  playerTwoScore: number,
  theme: ThemeName,
): void {
  renderGameOverScreen(
    playerOne,
    playerOneScore,
    playerTwo,
    playerTwoScore,
    theme,
  );
}

/**
 * Resolves player assets and renders the final score screen.
 *
 * @param playerOne - The first player's identifier.
 * @param playerOneScore - The first player's score.
 * @param playerTwo - The second player's identifier.
 * @param playerTwoScore - The second player's score.
 * @param theme - The active game theme.
 */
function renderGameOverScreen(
  playerOne: string,
  playerOneScore: number,
  playerTwo: string,
  playerTwoScore: number,
  theme: ThemeName,
): void {
  const playerOneImage =
    PLAYER_DATA[playerOne as keyof typeof PLAYER_DATA].images[theme];
  const playerTwoImage =
    PLAYER_DATA[playerTwo as keyof typeof PLAYER_DATA].images[theme];

  const app = document.querySelector("#app");

  if (!app) return;

  app.innerHTML = renderGameOverScreenHtml({
    playerOne,
    playerOneScore,
    playerTwo,
    playerTwoScore,
    theme,
    playerOneImage,
    playerTwoImage,
  });
}

/**
 * Creates the final score screen markup.
 *
 * @param data - The players, scores, images, and active theme.
 * @returns The final score screen HTML.
 */
function renderGameOverScreenHtml({
  playerOne,
  playerOneScore,
  playerTwo,
  playerTwoScore,
  theme,
  playerOneImage,
  playerTwoImage,
}: GameOverScreenData): string {
  return `
  <section class="game-over game-over--${theme}">
    <div class="game-over__headline-container">
      <h1 class="game-over__headline game-over__headline--${theme}">Game Over</h1>
    </div>
    <section class="game-over__score-container" aria-labelledby="final-score-title">
      <h2 id="final-score-title" class="game-over__score-title game-over__score-title--${theme}">Final Score</h2>
      <div class="game-over__players game-over__players--${theme}">
        <article class="game-over__player game-over__player--${theme}" aria-label="${playerOne} player's final score">
          <img src="${playerOneImage}" alt="${playerOne} player" class="game-over__image game-over__image--${theme}" />
          <span class="game-over__player-name game-over__player-name--${theme} game-over__player-name--${playerOne}">${playerOne}</span>
          <span class="game-over__player-score game-over__player-score--${theme} game-over__player-score--${playerOne}">${playerOneScore}</span>
        </article>
        <article class="game-over__player game-over__player--${theme}" aria-label="${playerTwo} player's final score">
          <img src="${playerTwoImage}" alt="${playerTwo} player" class="game-over__image game-over__image--${theme}" />
          <span class="game-over__player-name game-over__player-name--${theme} game-over__player-name--${playerTwo}">${playerTwo}</span>
          <span class="game-over__player-score game-over__player-score--${theme} game-over__player-score--${playerTwo}">${playerTwoScore}</span>
        </article>
      </div>
    </section>
  </section>
        `;
}

/**
 * Renders the winner or draw result screen.
 *
 * @param player - The winning player identifier, or `draw`.
 * @param theme - The active game theme.
 */
export function renderEndScreen(player: string, theme: ThemeName): void {
  const app = document.querySelector("#app");
  const resultType: ResultType = player === "draw" ? "draw" : "winner";
  const restartButtonLabel: RestartButtonLabel =
    theme === "code-vibes" ? "Back to start" : "Home";

  const winningState = END_GAME_DATA[theme][player as EndGameState].image;
  if (!app) return;
  if (player === "draw") {
    app.innerHTML = renderDrawScreenHtml({
      player,
      theme,
      resultType,
      restartButtonLabel,
      winningState,
    });
  } else {
    app.innerHTML = renderWinnerScreenHtml({
      player,
      theme,
      resultType,
      restartButtonLabel,
      winningState,
    });
  }
  restartGame();
}

/**
 * Creates the draw result markup.
 *
 * @param data - The result screen presentation data.
 * @returns The draw result HTML.
 */
function renderDrawScreenHtml({
  player,
  theme,
  resultType,
  restartButtonLabel,
  winningState,
}: EndScreenData): string {
  return `
    <section class="endscreen endscreen--${theme} endscreen--${resultType}">
      <div class="endscreen__content">
        <p class="endscreen__subheadline endscreen__subheadline--${theme} endscreen__subheadline--${resultType}">It's a</p>
        <h1 class="endscreen__headline endscreen__headline--${theme} endscreen__headline--${resultType} endscreen__headline--${player}">draw</h1>
        <img class="endscreen__image endscreen__image--${theme} endscreen__image--${resultType}" src="${winningState}" alt="The game ended in a draw" />
        <button class="endscreen__restart-button endscreen__restart-button--${theme}" type="button">${restartButtonLabel}</button>
      </div>
    </section>
  `;
}

/**
 * Creates the winner result markup.
 *
 * @param data - The result screen presentation data.
 * @returns The winner result HTML.
 */
function renderWinnerScreenHtml({
  player,
  theme,
  resultType,
  restartButtonLabel,
  winningState,
}: EndScreenData): string {
  return `
    <section class="endscreen endscreen--${theme} endscreen--${resultType}">
      <div class="endscreen__content">
        <p class="endscreen__subheadline endscreen__subheadline--${theme} endscreen__subheadline--${resultType}">The winner is</p>
        <h1 class="endscreen__headline endscreen__headline--${theme} endscreen__headline--${resultType} endscreen__headline--${player}">${player} PLAYER</h1>
        <img class="endscreen__image endscreen__image--${theme} endscreen__image--${resultType}" src="${winningState}" alt="${player} player wins" />
        <button class="endscreen__restart-button endscreen__restart-button--${theme}" type="button">${restartButtonLabel}</button>
      </div>
    </section>
  `;
}

/** Registers the action that returns from the result screen to settings. */
function restartGame(): void {
  const restartButton = document.querySelector<HTMLButtonElement>(
    ".endscreen__restart-button",
  );

  restartButton?.addEventListener("click", initSettings);
}

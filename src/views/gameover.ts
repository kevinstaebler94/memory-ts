import { PLAYER_DATA, initSettings } from "./settings";
import { renderGameOverScreenHtml, renderDrawScreenHtml, renderWinnerScreenHtml } from "./gameover-html";
import type { ThemeName } from "./settings";

type ResultType = "draw" | "winner";
type RestartButtonLabel = "Back to start" | "Home";
type EndGameState = "draw" | "orange" | "blue";

type EndGameImages = {
  draw: { image: string };
  orange: { image: string };
  blue: { image: string };
};

export type EndGameData = {
  "code-vibes": EndGameImages;
  gaming: EndGameImages;
  "da-projects": EndGameImages;
  foods: EndGameImages;
};

export type GameOverScreenData = {
  playerOne: string;
  playerOneScore: number;
  playerTwo: string;
  playerTwoScore: number;
  theme: ThemeName;
  playerOneImage: string;
  playerTwoImage: string;
};

export type EndScreenData = {
  player: string;
  theme: ThemeName;
  resultType: ResultType;
  restartButtonLabel: RestartButtonLabel;
  winningState: string;
};

const END_GAME_DATA: EndGameData = {
  "code-vibes": {
    draw: {
      image: "./assets/images/gameover/draw.svg",
    },
    orange: {
      image: "./assets/images/gameover/player-orange.svg",
    },
    blue: {
      image: "./assets/images/gameover/player-blue.svg",
    },
  },
  gaming: {
    draw: {
      image: "./assets/images/gameover/draw.svg",
    },
    orange: {
      image: "./assets/images/gameover/pockal.svg",
    },
    blue: {
      image: "./assets/images/gameover/pockal.svg",
    },
  },
  "da-projects": {
    draw: {
      image: "./assets/images/gameover/draw.svg",
    },
    orange: {
      image: "./assets/images/gameover/player-orange.svg",
    },
    blue: {
      image: "./assets/images/gameover/player-blue.svg",
    },
  },
  foods: {
    draw: {
      image: "./assets/images/gameover/draw.svg",
    },
    orange: {
      image: "./assets/images/gameover/player-orange.svg",
    },
    blue: {
      image: "./assets/images/gameover/player-blue.svg",
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
export function initGameOverScreen(playerOne: string, playerOneScore: number, playerTwo: string, playerTwoScore: number, theme: ThemeName): void {
  renderGameOverScreen(playerOne, playerOneScore, playerTwo, playerTwoScore, theme);
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
function renderGameOverScreen(playerOne: string, playerOneScore: number, playerTwo: string, playerTwoScore: number, theme: ThemeName): void {
  const playerOneImage = PLAYER_DATA[playerOne as keyof typeof PLAYER_DATA].images[theme];
  const playerTwoImage = PLAYER_DATA[playerTwo as keyof typeof PLAYER_DATA].images[theme];

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
 * Renders the winner or draw result screen.
 *
 * @param player - The winning player identifier, or `draw`.
 * @param theme - The active game theme.
 */
export function renderEndScreen(player: string, theme: ThemeName): void {
  const app = document.querySelector("#app");
  const resultType: ResultType = player === "draw" ? "draw" : "winner";
  const restartButtonLabel: RestartButtonLabel = theme === "code-vibes" ? "Back to start" : "Home";

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

/** Registers the action that returns from the result screen to settings. */
function restartGame(): void {
  const restartButton = document.querySelector<HTMLButtonElement>(".endscreen__restart-button");

  restartButton?.addEventListener("click", initSettings);
}

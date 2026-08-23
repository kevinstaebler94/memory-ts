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

  app.innerHTML = `
  <section class="game-over game-over--${theme}">
    <div class="game-over__headline-container">
      <h1 class="game-over__headline game-over__headline--${theme}">Game Over</h1>
    </div>
    <div class="game-over__score-container">
      <h2 class="game-over__score-title game-over__score-title--${theme}">Final Score</h2>
      <div class="game-over__players game-over__players--${theme}">
        <div class="game-over__player game-over__player--${theme}">
          <img src="${playerOneImage}" alt="${playerOne} player" class="game-over__image game-over__image--${theme}" />
          <span class="game-over__player-name game-over__player-name--${theme} game-over__player-name--${playerOne}">${playerOne}</span>
          <span class="game-over__player-score game-over__player-score--${theme} game-over__player-score--${playerOne}">${playerOneScore}</span>
        </div>
        <div class="game-over__player game-over__player--${theme}">
          <img src="${playerTwoImage}" alt="${playerTwo} player" class="game-over__image game-over__image--${theme}" />
          <span class="game-over__player-name game-over__player-name--${theme} game-over__player-name--${playerTwo}">${playerTwo}</span>
          <span class="game-over__player-score game-over__player-score--${theme} game-over__player-score--${playerTwo}">${playerTwoScore}</span>
        </div>
      </div>
    </div>
  </section>
        `;
}

export function renderEndScreen(player: string, theme: ThemeName): void {
  const app = document.querySelector("#app");
  const resultType: ResultType = player === "draw" ? "draw" : "winner";
  const restartButtonLabel: RestartButtonLabel =
    theme === "code-vibes" ? "Back to start" : "Home";

  const winningState = END_GAME_DATA[theme][player as EndGameState].image;
  if (!app) return;
  if (player === "draw") {
    app.innerHTML = `
    <section class="endscreen endscreen--${theme} endscreen--${resultType}">
      <div class="endscreen__content">
        <span class="endscreen__subheadline endscreen__subheadline--${theme} endscreen__subheadline--${resultType}">It's a</span>
        <h2 class="endscreen__headline endscreen__headline--${theme} endscreen__headline--${resultType} endscreen__headline--${player}">draw</h2>
        <img class="endscreen__image endscreen__image--${theme} endscreen__image--${resultType}" src="${winningState}" alt="The game ended in a draw" />
        <button class="endscreen__restart-button endscreen__restart-button--${theme}">${restartButtonLabel}</button>
      </div>
    </section>
  `;
  } else {
    app.innerHTML = `
    <section class="endscreen endscreen--${theme} endscreen--${resultType}">
      <div class="endscreen__content">
        <span class="endscreen__subheadline endscreen__subheadline--${theme} endscreen__subheadline--${resultType}">The winner is</span>
        <h2 class="endscreen__headline endscreen__headline--${theme} endscreen__headline--${resultType} endscreen__headline--${player}">${player} PLAYER</h2>
        <img class="endscreen__image endscreen__image--${theme} endscreen__image--${resultType}" src="${winningState}" alt="${player} player wins" />
        <button class="endscreen__restart-button endscreen__restart-button--${theme}">${restartButtonLabel}</button>
      </div>
    </section>
  `;
  }
  restartGame();
}

function restartGame(): void {
  const restartButton = document.querySelector<HTMLButtonElement>(
    ".endscreen__restart-button",
  );

  restartButton?.addEventListener("click", initSettings);
}

import { PLAYER_DATA, initSettings } from "./settings";
import type { ThemeName } from "./settings";

const END_GAME_DATA = {
  draw: {
    image: "src/assets/images/gameover/draw.svg",
  },
  orange: {
    image: "src/assets/images/gameover/player-orange.svg",
  },
  blue: {
    image: "src/assets/images/gameover/player-blue.svg",
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
  <section class="game-over">
    <div class="game-over__headline-container">
      <h1 class="game-over__headline">Game Over</h1>
    </div>
    <div class="game-over__score-container">
      <h2 class="game-over__score-title">Final Score</h2>
      <div class="game-over__players">
        <div class="game-over__player">
          <img src="${playerOneImage}" alt="${playerOne} player" class="game-over__image" />
          <span class="game-over__player-score">${playerOne} ${playerOneScore}</span>
        </div>
        <div class="game-over__player">
          <img src="${playerTwoImage}" alt="${playerTwo} player" class="game-over__image" />
          <span class="game-over__player-score">${playerTwo} ${playerTwoScore}</span>
        </div>
      </div>
    </div>
  </section>
        `;
}

export function renderEndScreen(player: string): void {
  const app = document.querySelector("#app");
  const winningState =
    END_GAME_DATA[player as keyof typeof END_GAME_DATA].image;
  if (!app) return;
  if (player === "draw") {
    app.innerHTML = `
    <section class="endscreen">
      <div class="endscreen__content">
        <span class="endscreen__subheadline">It's a</span>
        <h2 class="endscreen__headline">draw!</h2>
        <img class="endscreen__image" src="${winningState}" alt="The game ended in a draw" />
        <button class="endscreen__restart-button">Back to start</button>
      </div>
    </section>
  `;
  } else {
    app.innerHTML = `
    <section class="endscreen">
      <div class="endscreen__content">
        <span class="endscreen__subheadline">The winner is</span>
        <h2 class="endscreen__headline">${player} PLAYER</h2>
        <img class="endscreen__image" src="${winningState}" alt="${player} player wins" />
        <button class="endscreen__restart-button">Back to start</button>
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

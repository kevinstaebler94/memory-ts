export function initGameOverScreen() {
  renderGameOverScreen();
}

function renderGameOverScreen() {
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
              <img src="" alt="" class="game-over__image" />
              <span class="game-over__player-score">Player One</span>
            </div>
            <div class="game-over__player">
              <img src="" alt="" class="game-over__image" />
              <span class="game-over__player-score">Player Two</span>
            </div>
          </div>
        </div>`;
}

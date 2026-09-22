import type { GameOverScreenData, EndScreenData } from "./gameover";

/**
 * Creates the final score screen markup for both players.
 *
 * @param data - The player names, scores, images, and active theme.
 * @returns The final score screen HTML.
 */
export function renderGameOverScreenHtml({ playerOne, playerOneScore, playerTwo, playerTwoScore, theme, playerOneImage, playerTwoImage }: GameOverScreenData): string {
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
 * Creates the draw result markup.
 *
 * @param data - The result screen presentation data.
 * @returns The draw result HTML.
 */
export function renderDrawScreenHtml({ player, theme, resultType, restartButtonLabel, winningState }: EndScreenData): string {
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
export function renderWinnerScreenHtml({ player, theme, resultType, restartButtonLabel, winningState }: EndScreenData): string {
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

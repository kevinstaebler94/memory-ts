import type { GameSettings, PlayerData, ThemeName } from "./settings";
import { initGameOverScreen } from "./gameover";
import { renderEndScreen } from "./gameover";

export const THEME_DATA = {
  "code-vibes": {
    name: "Code vibes",
    images: [
      "src/assets/images/themes/code-vibes/angular.svg",
      "src/assets/images/themes/code-vibes/bootstrap.svg",
      "src/assets/images/themes/code-vibes/css.svg",
      "src/assets/images/themes/code-vibes/django.svg",
      "src/assets/images/themes/code-vibes/firebase.svg",
      "src/assets/images/themes/code-vibes/git.svg",
      "src/assets/images/themes/code-vibes/github.svg",
      "src/assets/images/themes/code-vibes/html.svg",
      "src/assets/images/themes/code-vibes/js.svg",
      "src/assets/images/themes/code-vibes/node-js.svg",
      "src/assets/images/themes/code-vibes/python.svg",
      "src/assets/images/themes/code-vibes/react.svg",
      "src/assets/images/themes/code-vibes/sass.svg",
      "src/assets/images/themes/code-vibes/sql.svg",
      "src/assets/images/themes/code-vibes/terminal.svg",
      "src/assets/images/themes/code-vibes/ts.svg",
      "src/assets/images/themes/code-vibes/vsc.svg",
      "src/assets/images/themes/code-vibes/vue.svg",
    ],
    front: "src/assets/images/themes/code-vibes/front.svg",
  },
  gaming: {
    name: "Gaming",
    images: [
      "src/assets/images/themes/gaming/1up.svg",
      "src/assets/images/themes/gaming/banana.svg",
      "src/assets/images/themes/gaming/card.svg",
      "src/assets/images/themes/gaming/circle.svg",
      "src/assets/images/themes/gaming/coin.svg",
      "src/assets/images/themes/gaming/controller.svg",
      "src/assets/images/themes/gaming/dice.svg",
      "src/assets/images/themes/gaming/gameboy.svg",
      "src/assets/images/themes/gaming/levelup.svg",
      "src/assets/images/themes/gaming/maze.svg",
      "src/assets/images/themes/gaming/minecraft.svg",
      "src/assets/images/themes/gaming/pacman.svg",
      "src/assets/images/themes/gaming/pacman2.svg",
      "src/assets/images/themes/gaming/play.svg",
      "src/assets/images/themes/gaming/puzzle.svg",
      "src/assets/images/themes/gaming/snake.svg",
      "src/assets/images/themes/gaming/square.svg",
      "src/assets/images/themes/gaming/triangle.svg",
    ],
    front: "src/assets/images/themes/gaming/front.svg",
  },
};

let playerOne: string = "";
let playerTwo: string = "";
let currentPlayer: string = "";
let playerOneScore = 0;
let playerTwoScore = 0;

export function initGame(settings: GameSettings, playerData: PlayerData): void {
  resetGameState();
  renderGame(settings, playerData);
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

  app.innerHTML = `
  <div id="game" class="game game--${settings.theme}">
    ${renderHeader(settings, playerData)}
    <div class="game__board-container">
      <main id="board" class="game__board game__board--${settings.board}"></main>
      ${renderOverlayHTML(settings.theme)}
    </div>
  </div>
  `;
}

function renderBoardHTML(cardsCover: string, gameCards: string[]): void {
  const board = document.querySelector("#board");
  let boardHTML = "";

  if (!board) return;

  for (let i = 0; i < gameCards.length; i++) {
    boardHTML += `
      <div class="game__card">
        <img class="game__card-cover" src="${cardsCover}" alt="Face-down memory card">
        <img class="game__card-image" src="${gameCards[i]}" alt="Memory card image">
      </div>
    `;
  }
  board.innerHTML = boardHTML;
}

function renderHeader(settings: GameSettings, playerData: PlayerData): string {
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

  return renderHeaderHTML(
    playerOneImage,
    playerOne,
    playerTwoImage,
    playerTwo,
    currentPlayerImage,
    settings.theme,
  );
}

function renderHeaderHTML(
  playerOneImage: string,
  playerOne: string,
  playerTwoImage: string,
  playerTwo: string,
  currentPlayerImage: string,
  theme: ThemeName,
): string {
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
      <button class="game__exit-game game__exit-game--${theme}" type="button">
        <span class="game__exit-icon" aria-hidden="true"></span>
        <span>Exit game</span>
      </button>
    </header>`;
}

function renderOverlayHTML(theme: ThemeName): string {
  return `
    <div id="overlay" class="overlay overlay--${theme}">
      <p class="overlay__text overlay__text--${theme}">Do you really want to exit the game?</p>
      <div class="overlay__buttons overlay__buttons--${theme}">
        <button class="overlay__button-left overlay__button-left--${theme}" type="button">Back to game</button>
        <button class="overlay__button-right overlay__button-right--${theme}" type="button">Exit game</button>
      </div>
    </div>
  `;
}

function updateCardVisibility(card: HTMLDivElement) {
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
  let isChecking = false;

  const cards = document.querySelectorAll<HTMLDivElement>(".game__card");

  let firstCard: HTMLDivElement | null = null;
  let secondCard: HTMLDivElement | null = null;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (isChecking) return;
      if (card.classList.contains("is-matched")) return;
      if (card === firstCard) return;

      card.classList.add("is-flipped");
      updateCardVisibility(card);

      if (firstCard === null) {
        firstCard = card;
        return;
      }

      secondCard = card;
      isChecking = true;

      const firstImage =
        firstCard.querySelector<HTMLImageElement>(".game__card-image");

      const secondImage =
        secondCard.querySelector<HTMLImageElement>(".game__card-image");

      if (!firstImage || !secondImage) {
        isChecking = false;
        return;
      }

      if (firstImage.src === secondImage.src) {
        firstCard.classList.add("is-matched");
        secondCard.classList.add("is-matched");

        const playerClass =
          currentPlayer === playerOne ? "player-one" : "player-two";

        const playerStats = document.querySelector<HTMLSpanElement>(
          `.${playerClass}__stats`,
        );

        if (currentPlayer === playerOne) {
          playerOneScore++;
        } else {
          playerTwoScore++;
        }

        if (playerStats) {
          const score =
            currentPlayer === playerOne ? playerOneScore : playerTwoScore;

          playerStats.textContent = String(score);
        }
        checkGameOver(settings.board, settings.theme);
        firstCard = null;
        secondCard = null;
        isChecking = false;
        return;
      }

      setTimeout(() => {
        if (!firstCard || !secondCard) return;

        firstCard.classList.remove("is-flipped");
        secondCard.classList.remove("is-flipped");

        updateCardVisibility(firstCard);
        updateCardVisibility(secondCard);

        if (currentPlayer === playerOne) {
          currentPlayer = playerTwo;
        } else {
          currentPlayer = playerOne;
        }

        const currentPlayerImage = document.querySelector<HTMLImageElement>(
          ".game__current-player-image",
        );

        if (currentPlayerImage) {
          currentPlayerImage.src =
            playerData[currentPlayer as keyof PlayerData].images[
              settings.theme
            ];
          currentPlayerImage.alt = `${currentPlayer} player's turn`;

          const currentPlayerFigure = currentPlayerImage.closest(
            ".game__current-player-figure",
          );

          currentPlayerFigure?.classList.remove(
            "game__current-player-figure--player-blue",
            "game__current-player-figure--player-orange",
          );
          currentPlayerFigure?.classList.add(
            `game__current-player-figure--player-${currentPlayer}`,
          );
        }

        firstCard = null;
        secondCard = null;
        isChecking = false;
      }, 1000);
    });
  });
}

function checkGameOver(boardSize: number, theme: ThemeName): void {
  const matchedCards = document.querySelectorAll(".game__card.is-matched");

  if (matchedCards.length === 4) {
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

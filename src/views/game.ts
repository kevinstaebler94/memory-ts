import type { GameSettings, PlayerData, ThemeName } from "./settings";
import { initGameOverScreen } from "./gameover";
import { renderEndScreen } from "./gameover";

export const THEME_DATA = {
  "code-vibes": {
    name: "Code vibes",
    className: "game--code-vibes",
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
    className: "game--gaming",
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
  "da-projects": {
    name: "DA-Projects",
    className: "game--da-projects",
    images: [
      "src/assets/images/themes/da-projects/broth.svg",
      "src/assets/images/themes/da-projects/chef.svg",
      "src/assets/images/themes/da-projects/coins.svg",
      "src/assets/images/themes/da-projects/contact.svg",
      "src/assets/images/themes/da-projects/cuisine.svg",
      "src/assets/images/themes/da-projects/da-bubble.svg",
      "src/assets/images/themes/da-projects/eggs.svg",
      "src/assets/images/themes/da-projects/greater-than.svg",
      "src/assets/images/themes/da-projects/join.svg",
      "src/assets/images/themes/da-projects/lieferando.svg",
      "src/assets/images/themes/da-projects/pokeball.svg",
      "src/assets/images/themes/da-projects/pollapp.svg",
      "src/assets/images/themes/da-projects/ramen.svg",
      "src/assets/images/themes/da-projects/sakura.svg",
      "src/assets/images/themes/da-projects/smiley.svg",
      "src/assets/images/themes/da-projects/sombrero.svg",
      "src/assets/images/themes/da-projects/tic-tac-toe.svg",
      "src/assets/images/themes/da-projects/wave.svg",
    ],
    front: "src/assets/images/themes/da-projects/front.svg",
  },
  foods: {
    name: "Foods",
    className: "game--foods",
    images: [
      "src/assets/images/themes/foods/burger.svg",
      "src/assets/images/themes/foods/cake.svg",
      "src/assets/images/themes/foods/chocolate.svg",
      "src/assets/images/themes/foods/corndog.svg",
      "src/assets/images/themes/foods/cupcake.svg",
      "src/assets/images/themes/foods/donut.svg",
      "src/assets/images/themes/foods/fried-chicken.svg",
      "src/assets/images/themes/foods/fries.svg",
      "src/assets/images/themes/foods/ice-cream.svg",
      "src/assets/images/themes/foods/macarons.svg",
      "src/assets/images/themes/foods/pizza.svg",
      "src/assets/images/themes/foods/pretzel.svg",
      "src/assets/images/themes/foods/pudding.svg",
      "src/assets/images/themes/foods/salad.svg",
      "src/assets/images/themes/foods/sandwich.svg",
      "src/assets/images/themes/foods/sushi.svg",
      "src/assets/images/themes/foods/taco.svg",
      "src/assets/images/themes/foods/wrap.svg",
    ],
    front: "src/assets/images/themes/foods/front.svg",
  },
};

let playerOne: string = "";
let playerTwo: string = "";
let currentPlayer: string = "";
let playerOneScore = 0;
let playerTwoScore = 0;

export function initGame(settings: GameSettings, playerData: PlayerData): void {
  renderGame(settings, playerData);
}

function renderGame(settings: GameSettings, playerData: PlayerData): void {
  if (!settings || !playerData) return;

  const selectedTheme = THEME_DATA[settings.theme as keyof typeof THEME_DATA];
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
  <div id="game" class="game">
    ${renderHeader(settings, playerData)}
    <main id="board" class="game__board game__board--${settings.board}"></main>
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
  );
}

function renderHeaderHTML(
  playerOneImage: string,
  playerOne: string,
  playerTwoImage: string,
  playerTwo: string,
  currentPlayerImage: string,
) {
  return `<header class="game__header">
      <div class="game__player-container">
        <div class="player-one">
          <img class="player-one__image" src="${playerOneImage}" alt="${playerOne} player">
          <span class="player-one__name">${playerOne}</span>
          <span class="player-one__stats">${playerOneScore}</span>
        </div>
        <div class="player-two">
          <img class="player-two__image" src="${playerTwoImage}" alt="${playerTwo} player">
          <span class="player-two__name">${playerTwo}</span>
          <span class="player-two__stats">${playerTwoScore}</span>
        </div>
      </div>
      <div class="game__current-player">
        <span class="game__current-player-label">Current player:</span>
        <img class="game__current-player-image" src="${currentPlayerImage}" alt="${currentPlayer} player's turn">
      </div>
      <div class="game__exit-game">
        <img class="game__exit-icon" src="src/assets/icons/exit.svg" alt="">
        <span>Exit game</span>
      </div>
    </header>`;
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
            playerData[currentPlayer as keyof PlayerData].images[settings.theme];
          currentPlayerImage.alt = `${currentPlayer} player's turn`;
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
        renderEndScreen(playerOne);
      }
      if (playerOneScore < playerTwoScore) {
        renderEndScreen(playerTwo);
      }
      if (playerOneScore === playerTwoScore) {
        renderEndScreen("draw");
      }
    }, 1500);
  }
}

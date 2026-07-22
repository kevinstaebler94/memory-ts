import type { GameSettings } from "./settings";
export const themeData = {
  "code-vibes": {
    name: "Code vibes",
    className: "game--code-vibes",
    images: [
      "src/assets/images/themes/code-vibes/angular.svg",
      "src/assets/images/themes/code-vibes/bootstrap.svg",
      "src/assets/images/themes/code-vibes/css.svg",
      "src/assets/images/themes/code-vibes/django.svg",
      "src/assets/images/themes/code-vibes/firebase.svg",
      "src/assets/images/themes/code-vibes/front.svg",
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
  },
  gaming: {
    name: "Gaming",
    className: "game--ganming",
    images: [
      "src/assets/images/themes/gaming/1up.svg",
      "src/assets/images/themes/gaming/banana.svg",
      "src/assets/images/themes/gaming/card.svg",
      "src/assets/images/themes/gaming/circle.svg",
      "src/assets/images/themes/gaming/coin.svg",
      "src/assets/images/themes/gaming/controller.svg",
      "src/assets/images/themes/gaming/dice.svg",
      "src/assets/images/themes/gaming/front.svg",
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
      "src/assets/images/themes/da-projects/front.svg",
      "src/assets/images/themes/da-projects/greatert-than.svg",
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
  },
};

export function initGame(settings: GameSettings): void {
  renderGame(settings);
}

function renderGame(settings: GameSettings): void {
  if (!settings) return;

  const selectedTheme = themeData[settings.theme as keyof typeof themeData];
  const className = selectedTheme.className;
  const cards = selectedTheme.images;

  const app = document.querySelector("#app");

  if (!app) return;

  app.innerHTML = `
  <div class="game">
    <header class="game__header">
      <div class="game__player-container">
        <div class="player-one">
          <img src="">
          <span class="player-one__name">Orange</span>
          <span class="player-one__stats">6</span>
        </div>
        <div class="player-two">
          <img src="">
          <span class="player-two__name">Blue</span>
          <span class="player-two__stats">2</span>
        </div>
      </div>
      <div class="game__current-player">
        <span>Current player:</span>
        <img src="">
      </div>
      <div class="game__exit-game">
        <img src="">
        <span>Exit game</span>
      </div>
    </header>
    <main id="board" class="game__board"></main>
  </div>
  `;

  const board = document.querySelector("#board");
  let boardHTML = "";

  if (!board) return;

  for (let i = 0; i < settings.board; i++) {
    boardHTML += `
      <div class="game__card"></div>
    `;
  }

  board.innerHTML = boardHTML;
}

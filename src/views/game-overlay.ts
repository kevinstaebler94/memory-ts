import { initSettings } from "./settings";
import { resetGameState } from "./game";

/** Registers the event listener that opens the exit dialog. */
export function handleExitGame(): void {
  const exitButton = document.querySelector<HTMLButtonElement>("#exitButton");

  if (!exitButton) return;

  exitButton.addEventListener("click", toggleOverlay);
}

/** Opens or closes the exit confirmation dialog. */
export function toggleOverlay(): void {
  const overlayWrapper = document.querySelector<HTMLElement>("#overlayWrapper");
  const overlay = overlayWrapper?.querySelector<HTMLElement>(".overlay");

  if (!overlayWrapper || !overlay) return;

  const isHidden = overlayWrapper.classList.contains("dNone");

  if (isHidden) {
    overlay.classList.remove("is-closing");
    overlayWrapper.classList.remove("dNone");
    return;
  }

  overlay.classList.add("is-closing");

  overlay.addEventListener(
    "animationend",
    () => {
      overlayWrapper.classList.add("dNone");
      overlay.classList.remove("is-closing");
    },
    { once: true },
  );
}

/** Registers interactions for the exit confirmation dialog. */
export function handleOverlayButtons(): void {
  const overlayWrapper = document.querySelector<HTMLElement>("#overlayWrapper");
  const overlay = overlayWrapper?.querySelector<HTMLElement>(".overlay");
  const backToGame = document.querySelector<HTMLButtonElement>("#backToGame");
  const exitGame = document.querySelector<HTMLButtonElement>("#exitGame");

  if (!overlayWrapper || !overlay || !backToGame || !exitGame) return;

  overlayWrapper.addEventListener("click", toggleOverlay);

  overlay.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  backToGame.addEventListener("click", toggleOverlay);

  exitGame.addEventListener("click", () => {
    resetGameState();
    initSettings();
  });
}

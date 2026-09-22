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
  closOverlay(overlayWrapper, overlay);
}

/**
 * Hides the exit dialog and clears its closing state when the animation ends.
 *
 * @param overlayWrapper - The wrapper to hide after the closing animation.
 * @param overlay - The dialog element running the closing animation.
 */
function closOverlay(overlayWrapper: HTMLElement, overlay: HTMLElement) {
  overlay.addEventListener(
    "animationend",
    () => {
      overlayWrapper.classList.add("dNone");
      overlay.classList.remove("is-closing");
    },
    { once: true }
  );
}

/** Registers interactions for the exit confirmation dialog. */
export function handleOverlayButtons(): void {
  const overlayWrapper = document.querySelector<HTMLElement>("#overlayWrapper");
  const overlay = overlayWrapper?.querySelector<HTMLElement>(".overlay");
  const backToGame = document.querySelector<HTMLButtonElement>("#backToGame");
  const exitGame = document.querySelector<HTMLButtonElement>("#exitGame");

  if (!overlayWrapper || !overlay || !backToGame || !exitGame) return;

  initiateOverlayButtonEvents(overlayWrapper, overlay, backToGame, exitGame);
}

/**
 * Registers backdrop, dialog, resume, and exit interactions.
 *
 * @param overlayWrapper - The backdrop that toggles the dialog when clicked.
 * @param overlay - The dialog whose clicks must not reach the backdrop.
 * @param backToGame - The button that closes the dialog to resume play.
 * @param exitGame - The button that resets the game and opens settings.
 */
function initiateOverlayButtonEvents(overlayWrapper: HTMLElement, overlay: HTMLElement, backToGame: HTMLButtonElement, exitGame: HTMLButtonElement) {
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

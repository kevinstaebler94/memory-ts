/**
 * Creates the selectable game options.
 *
 * @returns The settings options HTML.
 */
export function createSettingsOptionHtml(): string {
  return `
    <div class="settings__left">
      <h1 id="settings-title" class="settings__headline">Settings</h1>
      <section class="settings__section settings__themes">
        <div class="settings__section-container">
          <img src="src/assets/icons/theme.svg" alt="" />
          <h2 class="settings__section-title">Game themes</h2>
        </div>
        <ul class="settings__list">
          <li>
            <label class="settings__label">
              <input class="settings__input" type="radio" name="theme" value="code-vibes" />
              <span class="settings__radio"></span>
              <span class="settings__text">Code vibes theme</span>
            </label>
          </li>
          <li>
            <label class="settings__label">
              <input class="settings__input" type="radio" name="theme" value="gaming"/>
              <span class="settings__radio"></span>
              <span class="settings__text">Gaming theme</span>
            </label>
          </li>
        </ul>
      </section>
      <section class="settings__section settings__player">
        <div class="settings__section-container">
          <img src="src/assets/icons/player.svg" alt="" />
          <h2 class="settings__section-title">Choose player</h2>
        </div>
        <ul class="settings__list">
          <li>
            <label class="settings__label">
              <input class="settings__input" type="radio" name="player" value="blue" />
              <span class="settings__radio"></span>
              <span class="settings__text">Blue</span>
            </label>
          </li>
          <li>
            <label class="settings__label">
              <input class="settings__input" type="radio" name="player" value="orange"/>
              <span class="settings__radio"></span>
              <span class="settings__text">Orange</span>
            </label>
          </li>
        </ul>
      </section>
      <section class="settings__section settings__board">
        <div class="settings__section-container">
          <img src="src/assets/icons/board.svg" alt="" />
          <h2 class="settings__section-title">Board size</h2>
        </div>
        <ul class="settings__list">
          <li>
            <label class="settings__label">
              <input class="settings__input" type="radio" name="board" value="16"/>
              <span class="settings__radio"></span>
              <span class="settings__text">16 cards</span>
            </label>
          </li>
          <li>
            <label class="settings__label">
              <input class="settings__input" type="radio" name="board" value="24"/>
              <span class="settings__radio"></span>
              <span class="settings__text">24 cards</span>
            </label>
          </li>
          <li>
            <label class="settings__label">
              <input class="settings__input" type="radio" name="board" value="36"/>
              <span class="settings__radio"></span>
              <span class="settings__text">36 cards</span>
            </label>
          </li>
        </ul>
      </section>
    </div>
  `;
}

/**
 * Creates the preview for the selected settings.
 *
 * @returns The game preview HTML.
 */
export function createGamePreviewHtml(): string {
  return `
    <div class="settings__right">
      <figure class="settings__game-preview">
        <div class="settings__preview-container">
          <img class="settings__preview-image" src="src/assets/images/preview/theme-one.svg" alt="Preview of the selected game theme" />
        </div>
        <figcaption class="settings__preview-bar">
          <div class="settings__preview-item">
            <span class="settings__preview-theme">Game theme</span>
          </div>

          <div class="settings__preview-item">
            <span class="settings__preview-player">Player</span>
          </div>

          <div class="settings__preview-item">
            <span class="settings__preview-board">Board size</span>
          </div>

          <button class="settings__play-button" type="button" disabled>
            <img class="settings__play-icon" src="src/assets/icons/play-icon.svg" alt="" />
            <span>Start</span>
          </button>
        </figcaption>
      </figure>
    </div>
  `;
}

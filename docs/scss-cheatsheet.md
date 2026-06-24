# BEM & SCSS Cheatsheet

## BEM

### Block

```html
<section class="home"></section>
```

### Element

```html
<button class="home__button"></button>
```

### Modifier

```html
<button class="home__button home__button--active"></button>
```

---

## SCSS

### Element

```scss
.home {
  &__button {
  }
}
```

↓

```css
.home__button {
}
```

---

### Modifier

```scss
.home {
  &__button {
    &--active {
    }
  }
}
```

↓

```css
.home__button--active {
}
```

---

### Hover

```scss
.home {
  &__button {
    &:hover {
    }
  }
}
```

↓

```css
.home__button:hover {
}
```

---

## Merksatz

```text
& = aktueller Selektor
```

Beispiel:

```scss
.home {
  &__button {
  }
}
```

↓

```css
.home__button {
}
```

---

## Empfehlung

```text
Block
└── Element
    ├── Modifier
    └── State (:hover, :active)
```

Nicht:

```text
Block
└── Element
    └── Element
        └── Element
```

Zu tiefes Nesting vermeiden.

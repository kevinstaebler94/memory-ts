# DOM Cheatsheet – Effizient Elemente finden

## Grundregel

> **Suche immer im kleinsten möglichen Bereich.**

Je kleiner der Suchbereich, desto übersichtlicher und robuster wird dein Code.

---

# 1. Im gesamten Dokument suchen

Nutze `document.querySelector()`, wenn du ein Element im gesamten DOM finden möchtest.

```ts
const app = document.querySelector("#app");
const button = document.querySelector(".play-button");
```

Visualisierung:

Document
├── Header
├── Main
├── Footer

↓

Suche beginnt ganz oben.

---

# 2. Innerhalb eines Elements suchen ⭐

Kennst du bereits ein Element, solltest du von dort aus weitersuchen.

```ts
const card = document.querySelector(".card");

const title = card?.querySelector(".card__title");
const image = card?.querySelector(".card__image");
```

Visualisierung:

Document
│
└── Card
├── Title
├── Image
└── Button

↓

Suche beginnt direkt in der Card.

---

# 3. querySelector vs. querySelectorAll

## querySelector()

Liefert **das erste passende Element**.

```ts
const radio = label.querySelector(".settings__radio");
```

Typ:

```ts
HTMLElement | null;
```

---

## querySelectorAll()

Liefert **alle passenden Elemente**.

```ts
const labels = document.querySelectorAll(".settings__label");
```

Typ:

```ts
NodeListOf<HTMLElement>;
```

Ideal für:

```ts
labels.forEach(...)
```

---

# 4. currentTarget vs. target

## event.target

Das Element, auf das tatsächlich geklickt oder gehovert wurde.

```html
<label>
  <span>Gaming Theme</span>
</label>
```

Hover auf den Text

↓

event.target

=

```html
<span></span>
```

---

## event.currentTarget ⭐

Das Element, auf dem der EventListener registriert wurde.

```ts
label.addEventListener("mouseenter", handleMouseEnter);
```

↓

event.currentTarget

=

```html
<label></label>
```

In den meisten Fällen ist `currentTarget` die bessere Wahl.

---

# 5. Nicht immer beim document anfangen

❌ Weniger gut

```ts
const radio = document.querySelector(".settings__radio");
```

Sucht im gesamten Dokument.

---

✅ Besser

```ts
const label = event.currentTarget as HTMLLabelElement;

const radio = label.querySelector(".settings__radio");
```

Sucht nur innerhalb des aktuellen Labels.

---

# 6. Typisierung

TypeScript kennt standardmäßig nur:

```ts
Element;
```

Du kannst den Typ genauer angeben:

```ts
const labels = document.querySelectorAll<HTMLLabelElement>(".settings__label");
```

---

# 7. Typischer Ablauf

HTML rendern

↓

Elemente suchen

↓

EventListener registrieren

↓

Event wird ausgelöst

↓

event.currentTarget verwenden

↓

Innerhalb des Elements weitersuchen

↓

DOM aktualisieren

---

# Merksätze

✅ Arbeite immer lokal statt global.

✅ Nutze `currentTarget`, wenn du mit dem Element arbeiten möchtest, auf dem dein Event registriert wurde.

✅ Verwende `querySelector()` auf dem kleinsten bekannten Element.

✅ `document.querySelector()` sollte nur der Einstiegspunkt sein.

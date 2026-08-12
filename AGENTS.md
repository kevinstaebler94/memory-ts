# Project Guidelines

## General

- Prefer simple, readable and maintainable solutions.
- Follow Clean Code principles.
- Do not introduce unnecessary abstractions.
- Explain significant architectural decisions.

## TypeScript

- Use `const` by default and `let` only when reassignment is required.
- Never use `var`.
- Avoid `any`.
- Use explicit and meaningful names.
- Keep functions small and focused on one responsibility.

## Angular

- Follow modern Angular best practices.
- Prefer standalone components.
- Prefer signals for local reactive state where appropriate.
- Use Angular's modern control flow syntax.
- Keep business logic out of templates.
- Use dependency injection with `inject()` where appropriate.
- Separate UI, state and data-access responsibilities.

## SCSS

- Use BEM naming.
- Avoid unnecessary nesting.
- Keep component styles scoped to their component.

## Changes

Before modifying code:

1. Inspect the existing implementation.
2. Follow existing project conventions.
3. Prefer the smallest reasonable change.
4. Do not refactor unrelated code.

After modifying code:

1. Explain what changed.
2. Explain why it changed.
3. Mention potential improvements.
4. Run relevant tests/linting when available.

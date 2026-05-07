# WCAG 2.2 AA Audit Plan

## Automated

- `npm run test:a11y`
- Lighthouse accessibility audit
- HTML validator for landmark and heading structure

## Manual Keyboard

- Skip link reaches `#main-content`
- Command palette opens with Ctrl/Cmd+K and closes with Escape
- Theme toggle, nav, search, comments, AI console, and admin panels work without a mouse
- Visible focus is never clipped or hidden

## Screen Reader

- Page titles are unique and descriptive
- Forms expose labels and status messages
- Dialogs expose `aria-modal` and labelled titles
- Charts include text equivalents
- Dynamic updates use `aria-live` where useful

## Motion and Visual

- Reduced motion media query disables nonessential transitions
- Light and dark modes preserve contrast
- Text does not overlap at mobile, tablet, desktop, and zoomed layouts

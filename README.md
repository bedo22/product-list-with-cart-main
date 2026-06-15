# Product list with cart

![Preview](./preview.jpg)

A responsive product list and shopping cart built as a solution to the [Frontend Mentor "Product list with cart"](https://www.frontendmentor.io/challenges/product-list-with-cart) challenge. Add desserts to the cart, adjust quantities, see the running order total, and confirm the order in a modal — fully keyboard-accessible, no backend.

## Live demo

Once deployed to GitHub Pages: **https://bedo22.github.io/product-list-with-cart-main/**

## Built with

- [Vite](https://vitejs.dev/) — build tool
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- Plain CSS in a single stylesheet using custom properties, `@layer` cascade control, and `color-mix()` — no UI library, no CSS framework
- Native HTML `<dialog>` for the order-confirmation modal
- [`gh-pages`](https://www.npmjs.com/package/gh-pages) for deployment

## Run locally

```sh
pnpm install
pnpm dev          # http://localhost:5173/product-list-with-cart-main/
pnpm build        # type-check + production build into dist/
pnpm preview      # serve the built dist/ locally
```

Node 18+ and pnpm 10+ required.

## Deployment to GitHub Pages

The site is configured to deploy to GitHub Pages at the path `/product-list-with-cart-main/` (see `vite.config.ts`).

### One-time repo setup

1. Push the source to `main` on GitHub (see "Git workflow" below).
2. In the GitHub repo, go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select **`gh-pages`** and **`/ (root)`**, then **Save**.

That's it for the GitHub side. The `gh-pages` branch does not exist yet — the first `pnpm deploy` creates it.

### One-time local setup

The `gh-pages` package needs to authenticate to push to the repo. Pick one:

- **Easiest**: install the [GitHub CLI](https://cli.github.com/) and run `gh auth login` once. `gh-pages` picks up the credentials automatically.
- **HTTPS + PAT**: create a [personal access token](https://github.com/settings/tokens) with `repo` scope and use it as the password when prompted. To avoid the prompt on every deploy, store it in a Git credential helper.
- **SSH**: switch the remote to SSH — `git remote set-url origin git@github.com:bedo22/product-list-with-cart-main.git` — and have an SSH key loaded in your agent.

### Deploy

```sh
pnpm deploy
```

That command runs `gh-pages -d dist`, which:
1. Builds the site into `dist/` (well — actually `pnpm deploy` does not auto-build; see "Build first" below).
2. Force-pushes the contents of `dist/` to the `gh-pages` branch on `origin`.

> **Build first.** The `deploy` script runs `gh-pages -d dist` directly, so `dist/` must exist. Run `pnpm build` before `pnpm deploy`. Or chain them: `pnpm build && pnpm deploy`.

After ~30 seconds, the site is live at the demo URL above. Subsequent deploys update the same `gh-pages` branch.

### Git workflow

The repo has two branches with different purposes:

- **`main`** — the source code (`src/`, `package.json`, `vite.config.ts`, etc.). Edit here.
- **`gh-pages`** — the built site, generated automatically. Do not edit by hand; `pnpm deploy` overwrites it on every run.

For this initial implementation, commit directly to `main`:

```sh
git add .
git commit -m "feat: initial implementation of product list with cart"
git push -u origin main
pnpm build && pnpm deploy
```

For future work (bug fixes, features), use a feature branch and merge into `main` via PR or fast-forward:

```sh
git checkout -b fix/stepper-focus
# ... make changes ...
git commit -m "fix: improve stepper keyboard focus"
git push -u origin fix/stepper-focus
# open a PR on GitHub, then merge
```

This is a small static project, so a strict branching model is overkill — but feature branches keep `main` history clean and let you deploy from `main` confidently.

## Project structure

```
src/
  main.tsx           React entry
  App.tsx            useReducer cart state + dialog ref
  index.css          tokens, @layer reset/base/components, layout, components
  types.ts           Product, Cart, CartAction
  cartReducer.ts     pure reducer + totalQuantity helper
  format.ts          Intl.NumberFormat USD formatters
  Icons.tsx          6 inline SVG icon components
  ProductList.tsx    maps products to ProductCard
  ProductCard.tsx    <picture> + Add-to-Cart ↔ stepper morph
  CartItem.tsx       row in the cart
  Cart.tsx           empty + populated state
  OrderModal.tsx     forwardRef to <dialog>
public/
  favicon-32x32.png
  assets/
    images/          product images, icons, empty-cart illustration
    fonts/           Red Hat Text (not bundled; we use Google Fonts)
data.json            product data (static import)
```

Vite copies the entire `public/` folder to `dist/` verbatim during the build. That's why the product images referenced from `data.json` as `./assets/images/...` resolve correctly in both dev and the deployed site.

## What the user can do

- Add items to the cart from any product card
- Adjust quantities with `+` / `−` steppers (in the product card and order modal)
- Decrementing to `0` removes the item
- Remove items directly from the cart with the `×` button
- See the running order total and a carbon-neutral delivery callout
- Confirm the order in a modal showing the line items and total
- Start a new order (clears the cart and closes the modal)

## Accessibility

- Native `<button>` and `<dialog>` for all interactive elements
- `aria-label` on every icon-only button (`Add {name} to cart`, `Increase {name} quantity`, etc.)
- `aria-live="polite"` on the cart count so screen readers announce quantity changes
- `:focus-visible` styles on every interactive element (mirrors the hover style)
- The native `<dialog>` traps focus while open and restores it on close
- The modal is dismissable with `Esc` or by clicking the backdrop; only the **Start New Order** button resets the cart

## Acknowledgments

- Challenge by [Frontend Mentor](https://www.frontendmentor.io)
- Design analysis produced by another AI assistant as `DESIGN_ANALYSIS.md`

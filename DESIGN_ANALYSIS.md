# Design Analysis: Product List with Cart

This document summarizes every image in the `design/` folder for a frontend developer building the dessert product list and cart UI.

## Source image inventory

| File | Size | Purpose |
|---|---:|---|
| `desktop-design-empty.jpg` | 1440x1361 | Desktop initial state with empty cart |
| `desktop-design-selected.jpg` | 1440x1361 | Desktop state with selected products and populated cart |
| `desktop-design-order-confirmation.jpg` | 1440x1361 | Desktop order confirmation modal |
| `mobile-design-empty.jpg` | 375x3522 | Mobile initial state with empty cart |
| `mobile-design-selected.jpg` | 375x3765 | Mobile state with selected products and populated cart |
| `mobile-design-order-confirmation.jpg` | 375x812 | Mobile order confirmation modal |
| `active-states.jpg` | 1440x1361 | Hover/active cursor states |

## Global design notes

### Layout

- Desktop design width: `1440px`
- Mobile design width: `375px`
- Test responsive behavior from `320px` to large desktop widths.
- Desktop:
  - Two main regions: product area on the left and sticky cart panel on the right.
  - Product grid uses 3 columns.
  - Cart panel is fixed/sticky on the right side.
- Mobile:
  - Product cards stack in a single column.
  - Cart panel appears after the product list.
  - Order confirmation appears as a large bottom sheet/modal.

### Color tokens

Use the colors from `style-guide.md`:

```css
--color-red: hsl(14, 86%, 42%);
--color-green: hsl(159, 69%, 38%);
--color-rose-50: hsl(20, 50%, 98%);
--color-rose-100: hsl(13, 31%, 94%);
--color-rose-300: hsl(14, 25%, 72%);
--color-rose-400: hsl(7, 20%, 60%);
--color-rose-500: hsl(12, 20%, 44%);
--color-rose-900: hsl(14, 65%, 9%);
--color-white: #ffffff;
```

Suggested usage:

- Page background: `--color-rose-50`
- Product cards/cart/modal: white
- Primary buttons/steppers: `--color-red`
- Confirmation icon and carbon-neutral icon: `--color-green`
- Product category text: `--color-rose-300`
- Product name/body text: `--color-rose-900`
- Secondary text: `--color-rose-500`

### Typography

Font family: `Red Hat Text`.

Approximate sizes from the designs:

| Element | Desktop | Mobile |
|---|---:|---:|
| Page title `Desserts` | 40px / 700 | 32px / 700 |
| Product name | 16px / 700 | 16px / 700 |
| Product category | 13px / 400 | 13px / 400 |
| Price | 16px / 700 | 16px / 700 |
| Cart heading | 24px / 700 | 24px / 700 |
| Modal title | 32px / 700 | 32px / 700 |
| Button text | 16px / 700 | 16px / 700 |

### Components

Recommended component structure:

```txt
App
├── Header
│   └── Desserts
├── ProductGrid
│   └── ProductCard
│       ├── ProductImage
│       ├── ProductCategory
│       ├── ProductName
│       ├── ProductPrice
│       └── AddButton or QuantityStepper
├── CartPanel
│   ├── CartHeading
│   ├── EmptyCartState
│   ├── CartItemList
│   │   └── CartItem
│   │       ├── CartItemName
│   │       ├── CartItemQuantity
│   │       ├── CartItemUnitPrice
│   │       ├── CartItemSubtotal
│   │       └── RemoveButton
│   ├── OrderTotal
│   ├── CarbonNeutralMessage
│   └── ConfirmOrderButton
└── OrderConfirmationModal
    ├── SuccessIcon
    ├── ModalTitle
    ├── ModalSubtitle
    ├── ModalOrderSummary
    ├── ModalTotal
    └── StartNewOrderButton
```

### Product data

Use `data.json` as the source of truth for products:

- `category`
- `name`
- `price`
- `image.thumbnail`
- `image.mobile`
- `image.tablet`
- `image.desktop`

Suggested image usage:

- Product card image: `image.mobile` on mobile, `image.desktop` on desktop/tablet.
- Cart line item and confirmation modal image: `image.thumbnail`.
- Empty cart illustration: `./assets/images/illustration-empty-cart.svg`.

## Image-by-image analysis

### 1. `desktop-design-empty.jpg`

Initial desktop state.

Build requirements:

- Header:
  - `Desserts` appears at the top left.
  - Use bold dark text.

- Product grid:
  - 3 columns x 3 rows.
  - Each card contains:
    - Large rounded product image.
    - Category label above the product name.
    - Product name in bold.
    - Price in red below the product name.
    - White `Add to Cart` button with cart icon.
  - Product cards should have subtle spacing and rounded corners.

- Cart panel:
  - Located on the right side.
  - Heading: `Your Cart (0)`.
  - Empty state shows:
    - Empty cart cake illustration.
    - Text: `Your added items will appear here`.
  - Cart panel should be visually separate from the product area.

Implementation notes:

- Before any product is added, every card uses the `Add to Cart` button.
- Cart count should update as products are added.
- Cart panel can be sticky on desktop.

### 2. `desktop-design-selected.jpg`

Desktop state after products have been added.

Selected products shown in the product grid:

| Product | Quantity |
|---|---:|
| Vanilla Bean Crème Brûlée | 4 |
| Classic Tiramisu | 1 |
| Vanilla Panna Cotta | 2 |

Build requirements:

- Selected product cards:
  - Product image gets a red border.
  - `Add to Cart` button is replaced by a red quantity stepper.
  - Stepper layout:
    - Left: minus button.
    - Center: quantity number.
    - Right: plus button.

- Cart panel:
  - Heading: `Your Cart (7)`.
  - Cart items:
    - `Classic Tiramisu`
      - `1x @ $5.50 $5.50`
    - `Vanilla Bean Crème Brûlée`
      - `4x @ $7.00 $28.00`
    - `Vanilla Panna Cotta`
      - `2x @ $6.50 $13.00`
  - Each cart item has a remove icon on the right.
  - `Order Total` is `$46.50`.
  - Carbon-neutral message:
    - Green icon.
    - Text: `This is a carbon-neutral delivery`.
  - `Confirm Order` button appears at the bottom.

Implementation notes:

- Cart item subtotal = quantity x unit price.
- Cart heading count = total quantity of all items.
- Order total = sum of all cart item subtotals.
- Removing an item should remove it from the cart and reset its product card to `Add to Cart`.
- Decrementing quantity below `1` should remove the item from the cart.

### 3. `desktop-design-order-confirmation.jpg`

Desktop order confirmation modal.

Build requirements:

- Trigger:
  - Open this modal after clicking `Confirm Order` in the populated cart.

- Background:
  - Product grid and cart remain visible behind the modal.
  - Apply a dark overlay so the modal is the focus.

- Modal:
  - Centered white rounded panel.
  - Green check icon at the top.
  - Title: `Order Confirmed`
  - Subtitle: `We hope you enjoy your food!`
  - Order summary:
    - Product thumbnail.
    - Product name.
    - Quantity and unit price on the left.
    - Subtotal on the right.
  - Total:
    - Label: `Order Total`
    - Value: `$46.50`
  - Button:
    - `Start New Order`
    - Red pill button.

Implementation notes:

- Use `role="dialog"` and `aria-modal="true"`.
- Trap focus inside the modal while open.
- Close/reset behavior:
  - `Start New Order` should clear the cart.
  - Return to the empty cart state.
  - Product cards should return to `Add to Cart`.

### 4. `mobile-design-empty.jpg`

Initial mobile state.

Build requirements:

- Header:
  - `Desserts` at the top.
  - Use generous horizontal page padding.

- Product list:
  - Single column.
  - Each product card stacks vertically.
  - Product image is wide/rounded at the top of each card.
  - Product information appears below the image:
    - Category
    - Product name
    - Price
  - `Add to Cart` button appears under the image, overlapping the bottom of the image slightly.

- Cart panel:
  - Appears after the product list.
  - Heading: `Your Cart (0)`.
  - Empty state shows the cake illustration and `Your added items will appear here`.

Implementation notes:

- Use a fluid width, not a fixed `375px`.
- Keep the cart panel visually distinct with a white card background.
- Product cards should not look like a desktop grid squeezed into one column.

### 5. `mobile-design-selected.jpg`

Mobile state after products have been added.

Selected products shown:

| Product | Quantity |
|---|---:|
| Vanilla Bean Crème Brûlée | 4 |
| Classic Tiramisu | 1 |
| Vanilla Panna Cotta | 2 |

Build requirements:

- Product cards:
  - Selected cards show a red border around the image.
  - Selected cards replace `Add to Cart` with the red quantity stepper.
  - Stepper layout:
    - Minus button.
    - Quantity number.
    - Plus button.

- Cart panel:
  - Heading: `Your Cart (7)`.
  - Items:
    - `Classic Tiramisu`
      - `1x @ $5.50 $5.50`
    - `Vanilla Bean Crème Brûlée`
      - `4x @ $7.00 $28.00`
    - `Vanilla Panna Cotta`
      - `2x @ $6.50 $13.00`
  - Each item has a remove icon.
  - `Order Total` is `$46.50`.
  - Carbon-neutral message appears above the confirm button.
  - `Confirm Order` button is full-width inside the cart panel.

Implementation notes:

- Cart panel should remain readable after the long product list.
- Product names in the cart should wrap or truncate cleanly.
- Use touch-friendly tap targets for stepper and remove buttons.

### 6. `mobile-design-order-confirmation.jpg`

Mobile order confirmation modal.

Build requirements:

- Trigger:
  - Open after `Confirm Order` on mobile.

- Modal:
  - Appears as a large bottom sheet/full-width modal.
  - White rounded panel.
  - Green check icon.
  - Title: `Order Confirmed`
  - Subtitle: `We hope you enjoy your food!`
  - Order summary:
    - `Classic Tiramisu`
      - `1x @ $5.50`, subtotal `$5.50`
    - `Vanilla Bean Crème B...`
      - `4x @ $7.00`, subtotal `$28.00`
    - `Vanilla Panna Cotta`
      - `2x @ $6.50`, subtotal `$13.00`
  - `Order Total` is `$46.50`.
  - `Start New Order` button at the bottom.

Implementation notes:

- On narrow screens, product names may need ellipsis truncation.
- Keep the modal within the viewport.
- Make the modal scrollable if content exceeds available height.
- Preserve focus management and accessibility.

### 7. `active-states.jpg`

Desktop hover/active interaction states.

Build requirements:

- Quantity stepper:
  - Plus button is an interactive hover target.
  - Use cursor pointer.
  - Button should provide a hover state.

- `Add to Cart` button:
  - Show a red border on hover.
  - Keep the button readable and touch-friendly.

- Remove item icon:
  - Remove icon is clickable.
  - Show a hover state when the cursor is over it.

- `Confirm Order` button:
  - Show a darker red hover state.
  - Use pointer cursor.

Implementation notes:

- Do not rely on hover alone for accessibility.
- Keyboard focus states should be visible and similar to hover states.
- All interactive elements need accessible labels:
  - `Add Vanilla Bean Crème Brûlée to cart`
  - `Increase Vanilla Bean Crème Brûlée quantity`
  - `Decrease Vanilla Bean Crème Brûlée quantity`
  - `Remove Vanilla Bean Crème Brûlée from cart`
  - `Confirm order`

## State machine

### Product card state

```txt
quantity === 0
  -> show Add to Cart button

quantity > 0
  -> show red image border
  -> show quantity stepper
```

### Cart state

```txt
cart.length === 0
  -> show empty cart illustration and message

cart.length > 0
  -> show cart items
  -> show order total
  -> show carbon-neutral message
  -> show Confirm Order button
```

### Order confirmation state

```txt
user clicks Confirm Order
  -> open order confirmation modal
  -> show order summary and total

user clicks Start New Order
  -> clear cart
  -> close modal
  -> return to empty cart state
```

## Interaction requirements

- Clicking `Add to Cart`:
  - Adds 1 item to the cart.
  - Product card changes to quantity stepper.
  - Cart heading count updates.
  - Cart item appears with quantity, unit price, and subtotal.

- Clicking plus in stepper:
  - Increases quantity by 1.
  - Updates cart subtotal and order total.

- Clicking minus in stepper:
  - Decreases quantity by 1.
  - If quantity becomes 0:
    - Remove cart item.
    - Return product card to `Add to Cart`.

- Clicking remove icon in cart:
  - Remove item from cart.
  - Product card returns to `Add to Cart`.

- Clicking `Confirm Order`:
  - Open confirmation modal.
  - Keep the selected cart visible behind the modal.

- Clicking `Start New Order`:
  - Clear cart.
  - Reset all product cards.
  - Close modal.

## Accessibility checklist

- Use semantic buttons for all actions.
- Add `aria-label` to icon-only buttons.
- Add `aria-live="polite"` to the cart heading or cart count.
- Use meaningful text for product names and prices.
- Ensure color contrast meets WCAG requirements.
- Make focus states visible for:
  - Add to Cart
  - Stepper buttons
  - Remove item buttons
  - Confirm Order
  - Start New Order
- Modal should:
  - Trap focus.
  - Close/reset with `Start New Order`.
  - Support `Escape` if implemented as a dismissible dialog.
- Avoid relying only on color to communicate selected state; selected cards also have a border.

## Build checklist

- [ ] Render product list from `data.json`.
- [ ] Use responsive image variants from product image paths.
- [ ] Build desktop 3-column product grid.
- [ ] Build mobile single-column product list.
- [ ] Build empty cart state.
- [ ] Build populated cart state.
- [ ] Build quantity stepper behavior.
- [ ] Build remove item behavior.
- [ ] Build order total calculations.
- [ ] Build carbon-neutral delivery message.
- [ ] Build `Confirm Order` flow.
- [ ] Build desktop order confirmation modal.
- [ ] Build mobile order confirmation modal/bottom sheet.
- [ ] Build hover and focus states from `active-states.jpg`.
- [ ] Test from `320px` to large desktop widths.

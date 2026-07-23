# Final Task – WebDriverIO

![E2E Tests](https://github.com/saivarrs/final-task/actions/workflows/e2e.yml/badge.svg)

[![Allure Report](https://img.shields.io/badge/Allure-Report-orange?logo=qameta&logoColor=white)](https://saivarrs.github.io/final-task/)

---

# Task Description

**Inventory Logic Flow**

Focus:

- Data validation
- Sorting algorithms
- State management

Launch URL:

https://www.saucedemo.com/

---

# UC-1 — Sorting Validation

1. Login with `standard_user`
2. Select **Price (low to high)** from the sort dropdown
3. Read all product prices
4. Verify programmatically that prices are sorted in ascending order

---

# UC-2 — Cart State Logic

1. Add two different products
2. Verify the cart badge displays **2**
3. Remove one product
4. Verify the cart badge updates to **1**

---

# Technical Requirements

| Item | Value |
|------|------|
| Framework | WebDriverIO |
| Browsers | Firefox + Edge (parallel) |
| Pattern | Page Object Model |
| Locators | XPath |
| Parameterization | Data Provider |
| Documentation | README |

---

# Project Structure

```text
test/
│
├── pageobjects/
│   ├── Page.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── specs/
│   ├── main-task.e2e.js
│   ├── bonus-inventory.e2e.js
│   ├── bonus-cart.e2e.js
│   └── bonus-checkout.e2e.js
│
├── data/
│   └── products.data.js
│
├── helpers/
│   ├── auth.helper.js
│   └── logger.helper.js
│
└── wdio.conf.js
```

---
# Sorting Validation Logic

The sorting validation is performed programmatically rather than visually.

### Step 1

Read all prices from the DOM.

Example:

```
$29.99
$9.99
$15.99
```

↓

Convert them into numbers using `parseFloat()`.

---

### Step 2

Create a copy of the array.

```js
const expectedSorted = [...scrapedPrices];
```

---

### Step 3

Sort the copied array numerically.

```js
expectedSorted.sort((a, b) => a - b);
```

---

### Step 4

Compare both arrays.

```js
expect(scrapedPrices).toEqual(expectedSorted);
```

This proves that the page is already sorted correctly.

> Additional sorting scenarios (A-Z, Z-A, High → Low) are covered in `bonus-inventory.e2e.js`.

# Additional Test Coverage

Besides the required scenarios, I implemented extra test suites:

- Inventory sorting
- Cart edge cases
- Checkout flow

These tests were created for additional practice and broader application coverage.

---

# Personal Note

The required assignment is implemented in:

- `main-task.e2e.js`

The following files were added on my own initiative:

- `bonus-cart.e2e.js`
- `bonus-checkout.e2e.js`
- `bonus-inventory.e2e.js`

I decided to implement additional scenarios. Because at first its for more practice + experience. And 2nd thing, i rly had fun by doing this. I hope in future we will have more complex and interesting tasks

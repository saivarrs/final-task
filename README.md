![E2E Tests](https://github.com/saivarrs/final-task/actions/workflows/e2e.yml/badge.svg)

Task description

"Inventory Logic" Flow
  Focus: Data validation, sorting algorithms, and state management.
  Launch URL: https://www.saucedemo.com/

UC-1 Sorting Validation:
  Login with standard_user.
  Select "Price (low to high)" from the sort dropdown.
  Validation: Scrape the prices of all items on the page and programmatically verify that the array is sorted correctly in  ascending order.

UC-2 Cart State Logic:
  Add two different items to the cart.
  Verify the cart badge shows "2".
  Remove one item via the "Remove" button on the Inventory page.
  Verify the cart badge updates to "1".

Technical Requirements:
Tool: WebDriverIO.
Browsers: Firefox, Edge (Run in Parallel).
Pattern: Page Object Model (POM).
Locators: XPath (Focus on text-based selection).
Parametrization: Use Data Provider for the items being added/removed.
Documentation: Add a README.md explaining the sorting validation logic.


Project Structure:
test/
  pageobjects/             # POM classes (Page, Login, Inventory, Cart, Checkout)
  specs/
    main-task.e2e.js       # UC-1 (Sorting Validation) + UC-2 (Cart State Logic)
    bonus-inventory.e2e.js # Additional sort orders (A-Z, Z-A, high-to-low)
    bonus-cart.e2e.js      # Cart page edge cases
    bonus-checkout.e2e.js  # Checkout flow coverage
  data/
    products.data.js  # Data Provider for cart test scenarios
  helpers/
    auth.helper.js     # Shared login logic
    logger.helper.js   # Given/When/Then step logger
wdio.conf.js


`UC-1: Sorting Validation Logic`
The test validates the "Price (low to high)" sort option programmatically, not visually:
1) All item prices are read from the DOM as text (e.g. "$29.99") and converted to numbers with parseFloat()
2) A copy of the price array is sorted in ascending numeric order ((a, b) => a - b)
3) The original price array is compared against the sorted copy using toEqual().

(other sorting options covered in bonus-inventory with same pattern)


`Small note`
Main task tests are in `main-task.e2e.js`
The other files which is: `bonus-cart.e2e.js`, `bonus-checkout.e2e.js`, `bonus-inventory.e2e.js`. I decided to do by my own, and added additional coverage. Because at first its for more practice + experience. And 2nd thing, i rly had fun by doing this. I hope in future we will have more complex and interesting tasks.

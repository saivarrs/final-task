import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import { productsTestData } from '../data/products.data.js';
import { loginAsStandardUser } from '../helpers/auth.helper.js';
import { logStep } from '../helpers/logger.helper.js';

describe("Checkout flow", () => {
    it("Should complete checkout process", async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('And', 'user added an item to the cart and goes to checkout');
        await InventoryPage.addToCart(productsTestData[0].firstItem);
        await InventoryPage.goToCart();

        await CartPage.checkout();

        await expect(browser).toHaveUrl(
            expect.stringContaining("/checkout-step-one.html")
        );

        logStep('When', 'user fills in customer info and finish checkout');
        await CheckoutPage.fillCustomerInfo("Saik", "Bro", "12345");

        await expect(browser).toHaveUrl(
            expect.stringContaining("/checkout-step-two.html")
        );

        await CheckoutPage.finish();

        logStep('Then', 'order should complete with thank message');
        await expect(browser).toHaveUrl(
            expect.stringContaining("/checkout-complete.html")
        );

        logStep('Then', 'order should complete with complete message');
        await expect(CheckoutPage.completeHeader).toHaveText(
        "Thank you for your order!"
        );
    });

    it("Should require postal code to proceed", async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('And', 'user has added an item to the cart and gone to checkout');
        await InventoryPage.addToCart(productsTestData[0].firstItem);
        await InventoryPage.goToCart();
        await CartPage.checkout();

        logStep('When', 'user submits the form without postal code');
        await CheckoutPage.firstNameInput.setValue("John");
        await CheckoutPage.lastNameInput.setValue("Doe");
        await CheckoutPage.continueButton.click();

        logStep('Then', 'an error message should be displayed');
        await expect(CheckoutPage.stepOneError).toBeDisplayed();
    });
});
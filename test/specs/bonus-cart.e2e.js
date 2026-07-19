import CartPage from '../pageobjects/cart.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import { productsTestData } from '../data/products.data.js';
import { loginAsStandardUser } from '../helpers/auth.helper.js';
import { logStep } from '../helpers/logger.helper.js';

describe('Cart flow', () => {
    it('Should hide cart badge when all items removed', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('When', 'user add two items, then remove both');
        await InventoryPage.addToCart(productsTestData[0].firstItem);
        await InventoryPage.addToCart(productsTestData[0].secondItem);
        
        await expect(InventoryPage.cartBadge).toHaveText('2');

        await InventoryPage.removeFromCart(productsTestData[0].firstItem);
        await InventoryPage.removeFromCart(productsTestData[0].secondItem);

        logStep('Then', 'cart badge should be hidden, not 0');
        await expect(InventoryPage.cartBadge).not.toBeDisplayed();
    });

    it('Should display items in cart after adding from inventory', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();
        
        logStep('When', 'user adds two items and navigates to cart');
        await InventoryPage.addToCart(productsTestData[0].firstItem);
        await InventoryPage.addToCart(productsTestData[0].secondItem);
        await InventoryPage.goToCart();

        logStep('Then', 'cart page should list exactly 2 items');
        const itemCount = await CartPage.getItemCount();
        expect(itemCount).toBe(2);  
    });

    it('Should remove item directly from cart page', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('And', 'user has added two items to the cart');
        await InventoryPage.addToCart(productsTestData[0].firstItem);
        await InventoryPage.addToCart(productsTestData[0].secondItem);
        await InventoryPage.goToCart();

        logStep('When', 'user removes one item from the cart');
        await CartPage.removeFromCart(productsTestData[0].firstItem);

        logStep('Then', 'cart badge should update to 1');
        const itemCount = await CartPage.getItemCount();
        expect(itemCount).toBe(1);

    });

    it('Should return to inventory with continue shopping button', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('And', 'user on the cart')
        await InventoryPage.addToCart(productsTestData[0].firstItem);
        await InventoryPage.goToCart();
        await expect(browser).toHaveUrl(
            expect.stringContaining("/cart.html")
        );

        logStep('When', 'user clicks "Continue Shopping"');
        await CartPage.continueShoppingButton.click();

        logStep('Then', 'user should back on the inventory page');
        await expect(browser).toHaveUrl(
            expect.stringContaining("/inventory.html")
        );
    });
});
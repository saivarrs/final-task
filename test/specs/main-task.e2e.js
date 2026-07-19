import InventoryPage from '../pageobjects/inventory.page.js';
import { productsTestData } from '../data/products.data.js';
import { loginAsStandardUser } from '../helpers/auth.helper.js';
import { logStep } from '../helpers/logger.helper.js';

describe('UC-1: Sorting Validation', () => {
    it('Should sort items by price low to high correctly', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('When', 'user select "Price (low to high)" sort option');
        await InventoryPage.sortBy('lohi');
        const scrapedPrices = await InventoryPage.getItemPrices();

        logStep('Then', 'prices should be in ascending order');
        const expectedSorted = [...scrapedPrices].sort((a, b) => a - b);

        expect(scrapedPrices).toEqual(expectedSorted);
    });
});

describe('UC-2: Cart State Logic', () => {
    productsTestData.forEach(({ firstItem, secondItem, itemToRemove }) => {
        it(`Should update cart badge correctly for ${firstItem} + ${secondItem}`, async () => {
            logStep('Given', 'user is log in as standard_user');
            await loginAsStandardUser();

            logStep('When', `user adds "${firstItem}" and "${secondItem}" to cart`);
            await InventoryPage.addToCart(firstItem);
            await InventoryPage.addToCart(secondItem);

            logStep('Then', 'cart badge should show 2');
            await expect(InventoryPage.cartBadge).toHaveText('2');

            logStep('When', `user removes "${itemToRemove}" from cart`);
            await InventoryPage.removeFromCart(itemToRemove);

            logStep('Then', 'cart badge should update to 1');
            await expect(InventoryPage.cartBadge).toHaveText('1');
        });
    });
});
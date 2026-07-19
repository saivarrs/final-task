import InventoryPage from '../pageobjects/inventory.page.js';
import { loginAsStandardUser } from '../helpers/auth.helper.js';
import { logStep } from '../helpers/logger.helper.js';

describe('Additional Bonus Sorting Coverage', () => {
    it('Should apply the selected sort option to the dropdown value', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('When', 'user selects "Price (low to high)" sort option');
        await InventoryPage.sortBy('lohi');
        const selected = await InventoryPage.getSelectedSortOption();

        logStep('Then', 'dropdown value should reflect selected option');
        expect(selected).toBe('lohi');
    });

    it('Should sort items A-Z correctly', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('When', 'user selects "Name (A to Z)" sort option');
        await InventoryPage.sortBy('az');
        const names = await InventoryPage.getItemNames();
        const expectedSorted = [...names].sort();

        logStep('Then', 'item names should be in alphabetical order');
        expect(names).toEqual(expectedSorted);
    });

    it('Should sort items Z-A correctly', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('When', 'user selects "Name (Z to A)" sort option');
        await InventoryPage.sortBy('za');
        const names = await InventoryPage.getItemNames();
        const expectedSorted = [...names].sort().reverse();

        logStep('Then', 'item names should be in reverse alphabetical order');
        expect(names).toEqual(expectedSorted);
    });

    it('Should sort items by price high to low correctly', async () => {
        logStep('Given', 'user is log in as standard_user');
        await loginAsStandardUser();

        logStep('When', 'user selects "Price (high to low)" sort option');
        await InventoryPage.sortBy('hilo');
        const scrapedPrices = await InventoryPage.getItemPrices();
        const expectedSorted = [...scrapedPrices].sort((a, b) => b - a);

        logStep('Then', 'prices should be in descending order');
        expect(scrapedPrices).toEqual(expectedSorted);
    });
});
import Page from './page.js';

class InventoryPage extends Page {
    get title() {
        return $('.title');
    }

    get sortDropdown() {
        return $('.product_sort_container');
    }

    get itemNames() {
        return $$('//div[@class="inventory_item_name"]');
    }

    get itemPrices() {
        return $$('//div[@class="inventory_item_price"]');
    }

    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    get cartLink() {
        return $('.shopping_cart_link');
    }

    addToCartButton(productName) {
        return $(
        `//div[contains(@class, "inventory_item")][.//div[contains(@class, "inventory_item_name") and contains(text(), "${productName}")]]//button[contains(text(), "Add to cart")]`
        );
    }

    removeFromCartButton(productName) {
        return $(
        `//div[contains(@class, "inventory_item")][.//div[contains(@class, "inventory_item_name") and contains(text(), "${productName}")]]//button[contains(text(), "Remove")]`
        );
    }

    async addToCart(productName) {
        await this.addToCartButton(productName).click();
    }

    async removeFromCart(productName) {
        await this.removeFromCartButton(productName).click();
    }

    async getSelectedSortOption() {
        return this.sortDropdown.getValue();
    }

    async sortBy(option) {
        await this.sortDropdown.selectByAttribute('value', option);
    }

    async getItemNames() {
        return this.itemNames.map((el) => el.getText());
    }

    async getItemPrices() {
        const scrapedPrices = await this.itemPrices.map((el) => el.getText());
        return scrapedPrices.map((p) => parseFloat(p.replace('$', '')));
    }

    async goToCart() {
        await this.cartLink.click();
    }

    open() {
        return super.open('/inventory.html');
    }
}

export default new InventoryPage();
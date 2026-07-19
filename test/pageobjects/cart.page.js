import Page from "./page.js";

class CartPage extends Page {
    get checkoutButton() {
        return $('[data-test="checkout"]');
    }

    get cartItems() {
        return $$(".cart_item");
    }

    get continueShoppingButton() {
        return $('[data-test="continue-shopping"]');
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async getItemCount() {
    const items = await this.cartItems;
    return items.length;
  }

    removeFromCartButton(productName) {
        return $(
        `//div[contains(@class, "cart_item")][.//div[contains(@class, "inventory_item_name") and contains(text(), "${productName}")]]//button[contains(text(), "Remove")]`
        );
    }

    async removeFromCart(productName) {
        await this.removeFromCartButton(productName).click();
    }
}

export default new CartPage();
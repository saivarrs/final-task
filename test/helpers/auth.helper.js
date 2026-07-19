import LoginPage from '../pageobjects/login.page.js'

const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';

export async function loginAsStandardUser() {
    await LoginPage.open();
    await LoginPage.login(STANDARD_USER, PASSWORD);
}
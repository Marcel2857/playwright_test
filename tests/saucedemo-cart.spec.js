import { test, expect } from '@playwright/test';

test('użytkownik może zalogować się i dodać produkt do koszyka', async ({ page }) => {
  //Otwieranie strony logowania
  await page.goto('https://www.saucedemo.com/');
  
  // ASERCJA: sprawdzamy, że jesteśmy na stronie logowania (URL i widoczność przycisku logowania)
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // === KROK 2: Logowanie ===
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // ASERCJA: sprawdzamy, że po zalogowaniu jesteśmy na stronie produktów (URL i tytuł)
  await expect(page).toHaveURL(/.*inventory.html/);
  
  // ASERCJA: sprawdzamy, że widać tytuł "Products" — czyli faktycznie jesteśmy na stronie produktów
  await expect(page.locator('.title')).toHaveText('Products');

  // Dodanie produktu do koszyka - klikamy przycisk "Add to cart" przy produkcie "Sauce Labs Backpack"
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // ASERCJA: sprawdzamy, że przy koszyku pojawiła się liczba "1" — czyli mamy 1 produkt w koszyku
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Przejście do koszyka 
  await page.locator('[data-test="shopping-cart-link"]').click();

  // ASERCJA: w koszyku widzimy nazwę produktu
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

});

  test('zablokowany użytkownik widzi komunikat o błędzie i nie loguje się', async ({ page }) => {
  // Otwieramy stronę logowania 
  await page.goto('https://www.saucedemo.com/');

  // Próbujemy zalogować się jako zablokowany użytkownik 
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // ASERCJA 1: sprawdzamy, że pojawił się komunikat o błędzie (jest widoczny)
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  
  // ASERCJA 2: sprawdzamy, że komunikat o błędzie zawiera tekst "locked out" — czyli informuje o zablokowaniu
  await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  
  // ASERCJA 3: sprawdzamy, że po nieudanym logowaniu nadal jesteśmy na stronie logowania (URL i widoczność przycisku logowania)
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
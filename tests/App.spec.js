const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

// test("test", async ({ page }) => {
//   // Go to https://netology.ru/free/management#/
//   await page.goto("https://netology.ru/free/management#/");

//   // Click a
//   await page.click("a");
//   await expect(page).toHaveURL("https://netology.ru/");

//   // Click text=Учиться бесплатно
//   await page.click("text=Учиться бесплатно");
//   await expect(page).toHaveURL("https://netology.ru/free");

//   page.click("text=Бизнес и управление");

//   // Click text=Как перенести своё дело в онлайн
//   await page.click("text=Как перенести своё дело в онлайн");
//   await expect(page).toHaveURL(
//     "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
//   );
// });

test("Autorization successful", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(await page.locator("h2")).toContainText("Моё обучение", {
    timeout: 15000,
  });
  await page.screenshot({
    path: "screenshotSuccessful.png",
    width: 1000,
    height: 750,
  });
});

test("Autorization failed", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill("почта@почта.ру");
  await page.getByPlaceholder("Пароль").fill("12345678");
  await page.getByTestId("login-submit-btn").click();
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль", {
    timeout: 15000,
  });
  await page.screenshot({
    path: "screenshotFailed.png",
    width: 1000,
    height: 750,
  });
});

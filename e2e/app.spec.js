import { test, expect } from '@playwright/test';

test('user login correct', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Войти' }).click();
    await page.getByRole('textbox', {name: 'Логин'}).click();
    await page.getByRole('textbox',{name: 'Логин'}).fill('testuser');
    await page.getByRole('textbox',{name: 'Пароль'}).click();
    await page.getByRole('textbox',{name: 'Пароль'}).fill('test123');
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    const locator = page.getByTestId('user-profile');
    await expect(locator).toContainText('Пользователь: Тестировщик | выйти');
});

test('user login fail', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Войти' }).click();
    await page.getByRole('textbox', {name: 'Логин'}).click();
    await page.getByRole('textbox',{name: 'Логин'}).fill('testuser');
    await page.getByRole('textbox',{name: 'Пароль'}).click();
    await page.getByRole('textbox',{name: 'Пароль'}).fill('test12');
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    const locator = page.getByTestId('user-profile');
    await expect(locator).not.toContainText('Пользователь: Тестировщик | выйти');
});

test('add to cart', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('[data-testid="display-products"]');

    const list = await page.getByRole('button', { name: 'добавить в корзину' }).all();

    await list[1].click();
    await list[3].click();
    await list[5].click();
    await list[7].click();
    const cartSize = await page.getByTestId('cart-size-vidget');
    await expect(cartSize).toContainText('Позиций в корзине: 4')
})


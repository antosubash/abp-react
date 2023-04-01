import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'login' }).click();
    await page.getByLabel('Username or email address').fill('admin');
    await page.getByLabel('Password').fill('1q2w3E*');
    await page.locator('button[name="Action"]').click();

    await page
        .getByTestId('click_avatar')
        .getByText('a', { exact: true })
        .first()
        .click();
    await page.getByRole('button', { name: 'log out' }).click();
});

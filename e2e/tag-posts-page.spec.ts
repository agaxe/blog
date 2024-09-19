import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(`http://127.0.0.1:3000/tags/react/pages/1`);
});

test.describe('[태그 포스트 리스트] 페이지', () => {
  test('해당 태그에 맞는 타이틀 텍스트가 존재한다.', async ({ page }) => {
    const title = page.locator(
      '[class*="styles__Section"] > [class*="styles__wrap"] > h2'
    );

    await expect(title).toHaveText('React');
  });
});

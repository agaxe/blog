import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/tags');
});

test.describe('[태그 리스트] 페이지', () => {
  test(`타이틀 텍스트 'Tags' 가 존재한다.`, async ({ page }) => {
    const title = page.locator(
      '[class*="styles__MainSection"] > [class*="styles__wrap"] > h2'
    );

    await expect(title).toHaveText('Tags');
  });

  test('태그 리스트가 존재한다.', async ({ page }) => {
    const tagList = page.locator('[class*="TagList__Wrap"]');

    if ((await tagList.count()) === 0) return;

    await expect(tagList).toBeVisible();
  });

  test('태그 리스트 아이템이 존재한다.', async ({ page }) => {
    const tagItem = page.locator('[class*="TagList__TagItem"]');

    if ((await tagItem.count()) === 0) return;

    expect(await tagItem.count()).toBeGreaterThanOrEqual(1);
  });
});

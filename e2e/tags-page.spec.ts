import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/tags');
});

test.describe('[태그 리스트] 페이지', () => {
  test(`타이틀 텍스트 'Tags' 가 존재한다.`, async ({ page }) => {
    const title = page
      .getByTestId('tag-page-title-section')
      .getByRole('heading');

    await expect(title).toHaveText('Tags');
  });

  test('태그 리스트가 존재한다.', async ({ page }) => {
    const tagList = page.getByRole('main').getByRole('list');

    await expect(tagList).toBeVisible();
  });

  test('태그 리스트 아이템이 존재한다.', async ({ page }) => {
    const tagList = page.getByRole('main').getByRole('list');
    const tagItem = tagList.getByRole('listitem');

    expect(await tagItem.count()).toBeGreaterThanOrEqual(1);
  });
});

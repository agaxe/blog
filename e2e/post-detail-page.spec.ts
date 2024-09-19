import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/6231c9937b2e49e18ad6000eeabe7e38', {
    timeout: 15000
  });
});

test.describe('[포스트 상세] 페이지', () => {
  test('포스트 타이틀이 존재한다.', async ({ page }) => {
    const title = page.locator('.notion-title');

    await expect(title).toBeVisible();
  });

  test('포스팅이 작성된 날짜 정보가 정해진 텍스트 포맷으로 존재한다.', async ({
    page
  }) => {
    const dateText = page.locator('.notion-property-created_time');

    expect(await dateText.textContent()).toMatch(
      /\d{4}년\s\d{1,2}월\s\d{1,2}일/
    );
  });

  test('포스트의 태그 리스트가 존재한다.', async ({ page }) => {
    const tagList = page.locator('.notion-property-multi_select');

    await expect(tagList).toBeVisible();
  });

  test('포스트의 태그가 존재한다.', async ({ page }) => {
    const tagItemLink = page.locator('.notion-property-multi_select > a');

    expect(await tagItemLink.count()).toBeGreaterThanOrEqual(1);
  });

  test('태그 클릭 시 해당 태그의 포스트 리스트 페이지로 이동한다.', async ({
    page
  }) => {
    const tagLink = page.locator(
      '.notion-property-multi_select > a:first-child'
    );
    const tagName = await tagLink.textContent();
    await tagLink.click();

    await expect(page).toHaveURL(
      new RegExp(`/tags/${tagName?.toLowerCase()}/pages/1$`),
      {
        timeout: 15000
      }
    );
  });
});

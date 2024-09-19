import { expect, test } from '@playwright/test';

test.describe('[포스트 리스트] 페이지', () => {
  test('포스트 리스트의 아이템은 최대 10개 존재한다.', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/pages/1');

    const postItems = page.locator(
      '[class*="styles__Section"] > [class*="styles__Wrap"] > ul:nth-child(2) > li'
    );

    expect(await postItems.count()).toBeLessThanOrEqual(10);
  });

  test(`다음 페이지가 존재하는 경우 '다음 페이지' 버튼이 존재한다.`, async ({
    page
  }) => {
    await page.goto('http://127.0.0.1:3000/pages/1');

    const nextPageBtn = page.locator('[class*="styles__NextArrowLink"]');

    if ((await nextPageBtn.count()) === 0) return;

    await expect(nextPageBtn).toBeVisible();
  });

  test(`'다음 페이지' 버튼 클릭 시 다음 페이지로 이동한다.`, async ({
    page
  }) => {
    await page.goto('http://127.0.0.1:3000/pages/1');

    const nextPageBtn = page.locator('[class*="styles__NextArrowLink"]');

    await nextPageBtn.click();

    await expect(page).toHaveURL(new RegExp(`/pages/2$`), {
      timeout: 15000
    });
  });

  test(`이전 페이지가 존재하는 경우 '이전 페이지' 버튼이 존재한다.`, async ({
    page
  }) => {
    await page.goto('http://127.0.0.1:3000/pages/2');

    const prevPageBtn = page.locator('[class*="styles__PrevArrowLink"]');

    if ((await prevPageBtn.count()) === 0) return;

    await expect(prevPageBtn).toBeVisible();
  });

  test(`'이전 페이지' 버튼 클릭 시 이전 페이지로 이동한다.`, async ({
    page
  }) => {
    await page.goto('http://127.0.0.1:3000/pages/2');

    const prevPageBtn = page.locator('[class*="styles__PrevArrowLink"]');

    await prevPageBtn.click();

    await expect(page).toHaveURL(new RegExp(`/pages/1$`), {
      timeout: 15000
    });
  });
});

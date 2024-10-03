import { expect, test } from '@playwright/test';

test.describe('[포스트 리스트] 페이지', () => {
  test('포스트 리스트의 아이템은 최대 10개 존재한다.', async ({ page }) => {
    await page.goto('/pages/1');

    const postItems = page.getByTestId('post-item');

    expect(await postItems.count()).toBeLessThanOrEqual(10);
  });

  test(`다음 페이지가 존재하는 경우 '다음 페이지' 버튼이 존재한다.`, async ({
    page
  }) => {
    await page.goto('/pages/1');

    const nextPageBtn = page.getByTestId('navigation-next-btn');

    await expect(nextPageBtn).toBeVisible();
  });

  test(`'다음 페이지' 버튼 클릭 시 다음 페이지로 이동한다.`, async ({
    page
  }) => {
    await page.goto('/pages/1');

    const nextPageBtn = page.getByTestId('navigation-next-btn');

    await nextPageBtn.click();

    await expect(page).toHaveURL(new RegExp(`/pages/2$`), {
      timeout: 15000
    });
  });

  test(`이전 페이지가 존재하는 경우 '이전 페이지' 버튼이 존재한다.`, async ({
    page
  }) => {
    await page.goto('/pages/2');

    const prevPageBtn = page.getByTestId('navigation-prev-btn');

    await expect(prevPageBtn).toBeVisible();
  });

  test(`'이전 페이지' 버튼 클릭 시 이전 페이지로 이동한다.`, async ({
    page
  }) => {
    await page.goto('/pages/2');

    const prevPageBtn = page.getByTestId('navigation-prev-btn');

    await prevPageBtn.click();

    await expect(page).toHaveURL(new RegExp(`/pages/1$`), {
      timeout: 15000
    });
  });
});

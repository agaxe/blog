import { expect, test } from '@playwright/test';

const pages = [
  { name: '메인', url: '/' },
  { name: '포스트 리스트', url: '/pages/1' }
];

pages.forEach((pageItem) => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageItem.url);
  });

  test.describe(`[${pageItem.name}] 페이지 - 포스트 아이템`, async () => {
    test('포스트 아이템에는 타이틀이 존재한다.', async ({ page }) => {
      const firstPostItem = page.getByTestId('post-item').nth(0);
      const title = firstPostItem.getByRole('heading');

      await expect(title).toBeVisible();
    });

    test('포스트 아이템에는 포스팅이 작성된 날짜 정보가 정해진 텍스트 포맷으로 존재한다.', async ({
      page
    }) => {
      const firstPostItem = page.getByTestId('post-item').nth(0);
      const dateText = firstPostItem.getByTestId('post-item-date');

      expect(await dateText.textContent()).toMatch(
        /\d{4}년\s\d{1,2}월\s\d{1,2}일/
      );
    });

    test('포스트 아이템에는 태그 리스트가 존재한다.', async ({ page }) => {
      const firstPostItem = page.getByTestId('post-item').nth(0);
      const tagList = firstPostItem.getByRole('list');

      await expect(tagList).toBeVisible();
    });

    test('포스트 아이템에는 태그 아이템이 1개 이상 존재한다.', async ({
      page
    }) => {
      const firstPostItem = page.getByTestId('post-item').nth(0);
      const tagItem = firstPostItem.getByRole('list').getByRole('listitem');

      expect(await tagItem.count()).toBeGreaterThanOrEqual(1);
    });

    test('포스트 아이템 클릭 시 해당 포스트의 상세 페이지로 이동한다.', async ({
      page
    }) => {
      const firstPostLink = page
        .getByTestId('post-list')
        .getByRole('listitem')
        .nth(0)
        .getByRole('link')
        .nth(0);
      const postLinkHref = await firstPostLink.getAttribute('href');

      await firstPostLink.click();

      await expect(page).toHaveURL(new RegExp(`${postLinkHref}$`), {
        timeout: 20000
      });
    });

    test('포스트 아이템의 태그 클릭 시 해당 태그의 포스트 리스트 페이지로 이동한다.', async ({
      page
    }) => {
      const firstPostItem = page.getByTestId('post-item').nth(0);
      const firstTagItemLink = firstPostItem
        .getByRole('list')
        .getByRole('listitem')
        .getByRole('link')
        .nth(0);
      const postLinkHref = await firstTagItemLink.getAttribute('href');

      await firstTagItemLink.click();

      await expect(page).toHaveURL(new RegExp(`${postLinkHref}$`), {
        timeout: 20000
      });
    });
  });
});

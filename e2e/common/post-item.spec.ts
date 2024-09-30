import { expect, test } from '@playwright/test';

const pages = [
  { name: '메인', url: 'http://127.0.0.1:3000' },
  { name: '포스트 리스트', url: 'http://127.0.0.1:3000/pages/1' }
];

pages.forEach((pageItem) => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageItem.url);
  });

  test.describe(`[${pageItem.name}] 페이지 - 포스트 아이템`, async () => {
    test('포스트 아이템에는 타이틀이 존재한다.', async ({ page }) => {
      const firstPostItem = page.locator(
        '[class*="styles__MainSection"] ul:nth-child(2) > li:first-child'
      );
      const title = firstPostItem.locator('[class*="styles__PageTitle"]');

      await expect(title).toBeVisible();
    });

    test('포스트 아이템에는 포스팅이 작성된 날짜 정보가 정해진 텍스트 포맷으로 존재한다.', async ({
      page
    }) => {
      const firstPostItem = page.locator(
        '[class*="styles__MainSection"] ul:nth-child(2) > li:first-child'
      );
      const dateText = firstPostItem.locator('[class*="styles__PageDate"]');

      expect(await dateText.textContent()).toMatch(
        /\d{4}년\s\d{1,2}월\s\d{1,2}일/
      );
    });

    test('포스트 아이템에는 태그 리스트가 존재한다.', async ({ page }) => {
      const firstPostItem = page.locator(
        '[class*="styles__MainSection"] ul:nth-child(2) > li:first-child'
      );
      const tagList = firstPostItem.locator('[class*="NotionTagList"]');

      await expect(tagList).toBeVisible();
    });

    test('포스트 아이템에는 태그 아이템이 1개 이상 존재한다.', async ({
      page
    }) => {
      const firstPostItem = page.locator(
        '[class*="styles__MainSection"] ul:nth-child(2) > li:first-child'
      );
      const tagList = firstPostItem.locator('[class*="NotionTagList"]');
      const tagItem = tagList.locator(':scope > li');

      expect(await tagItem.count()).toBeGreaterThanOrEqual(1);
    });

    test('포스트 아이템 클릭 시 해당 포스트의 상세 페이지로 이동한다.', async ({
      page
    }) => {
      const mainSection = page.locator('[class*="styles__MainSection"]');
      const firstPostLink = mainSection.locator(
        'ul:nth-child(2) > li:first-child > div > a'
      );
      const postLinkHref = await firstPostLink.getAttribute('href');

      await firstPostLink.click();

      await expect(page).toHaveURL(new RegExp(`${postLinkHref}$`), {
        timeout: 15000
      });
    });

    test('포스트 아이템의 태그 클릭 시 해당 태그의 포스트 리스트 페이지로 이동한다.', async ({
      page
    }) => {
      const mainSection = page.locator('[class*="styles__MainSection"]');
      const firstPostItem = mainSection.locator(
        'ul:nth-child(2) > li:nth-child(2)'
      );
      const tagLink = firstPostItem.locator(
        '[class*="NotionTagList"] > li:nth-child(1) a'
      );

      const tagHref = await tagLink.getAttribute('href');

      await tagLink.click();

      await expect(page).toHaveURL(new RegExp(`${tagHref}$`), {
        timeout: 15000
      });
    });
  });
});

import { expect, test } from '@playwright/test';
import { size } from '@/styles/device';

const pages = [
  { name: '메인', url: '/' },
  { name: '포스트 리스트', url: '/pages/1' },
  {
    name: '특정 태그 포스트 리스트',
    url: '/tags/react/pages/1'
  }
];

pages.forEach((pageItem) => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageItem.url);
  });

  test.describe(`[${pageItem.name}] 페이지 - 사이드 태그 리스트`, () => {
    test('브라우저 넓이가 lg 이하인 경우 사이드 태그 리스트 hide', async ({
      page
    }) => {
      const sideTagList = page.locator(
        '[class*="styles__MainSection"] [class*="styles__Wrap"] > aside'
      );
      await expect(sideTagList).toBeVisible();

      await page.setViewportSize({ width: size.lg, height: 600 });

      await expect(sideTagList).not.toBeVisible();
    });
  });
});

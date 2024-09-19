import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
});

test.describe('[메인] 페이지', () => {
  test('프로필 영역에 닉네임과 소개글이 존재한다', async ({ page }) => {
    const mainHeader = page.locator('[class*="styles__MainHeader"]');
    const title = mainHeader.getByRole('heading', { level: 3 });
    const description = mainHeader.getByRole('paragraph');

    await expect(mainHeader).toBeVisible();
    await expect(title).toHaveText('Agaxe');
    await expect(description).toHaveText(
      '쉽게 얻은 것은 쉽게 잃지만 어렵게 얻은 것은 더 가치 있게 유지된다.'
    );
  });

  test('프로필 영역에 링크 리스트가 존재하고 아이템은 2개 존재한다.', async ({
    page
  }) => {
    const mainHeader = page.locator('[class*="styles__MainHeader"]');
    const linkList = mainHeader.getByRole('list');
    const linkItems = linkList.getByRole('listitem');

    await expect(linkList).toBeVisible();
    await expect(linkItems).toHaveCount(2);
  });

  test('프로필 영역의 깃허브 링크 클릭 시 깃허브 페이지가 새 창으로 열린다.', async ({
    page,
    context
  }) => {
    const pagePromise = context.waitForEvent('page');
    const mainHeader = page.locator('[class*="styles__MainHeader"]');
    const githubLink = mainHeader.locator('li:first-child > a');

    await githubLink.click();

    const newPage = await pagePromise;

    expect(newPage.url()).toBe('https://github.com/agaxe');
  });

  test('프로필 영역에 메일 링크가 존재한다.', async ({ page }) => {
    const mainHeader = page.locator('[class*="styles__MainHeader"]');
    const mailLink = mainHeader.locator('li:nth-child(2) > a');

    await expect(mailLink).toHaveAttribute('href', /^mailto:/);
  });

  test('메인 페이지의 포스트 아이템은 최대 5개 존재한다.', async ({ page }) => {
    const mainSection = page.locator('[class*="styles__Section"]');
    const postList = mainSection.locator('ul:nth-child(2)');

    const postItems = postList.locator(':scope > li');

    expect(await postItems.count()).toBeGreaterThanOrEqual(5);
  });

  test(`하단 'VIEW PAGES' 클릭 시 [포스트 리스트] 페이지로 이동한다.`, async ({
    page
  }) => {
    const viewPageLink = page.getByRole('link', { name: 'VIEW PAGES' });

    await viewPageLink.click();

    await expect(page).toHaveURL(new RegExp(`/pages/1$`), {
      timeout: 10000
    });
  });
});

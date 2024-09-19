import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
});

test.describe('공통 테스트', () => {
  test('Y 축 스크롤 값이 헤더 높이보다 큰 경우, 헤더가 상단으로 사라진다.', async ({
    page
  }) => {
    const header = page.locator('header');
    const headerSize = await header.boundingBox();

    if (!headerSize?.height) return;

    for (let i = 1; i <= headerSize?.height / 9; i++) {
      await page.mouse.wheel(0, i * 9);
      await page.waitForTimeout(200);
    }

    const marginTop = await header.evaluate(
      (el) => getComputedStyle(el).marginTop
    );

    expect(marginTop).toBe('-45px');
  });

  test('헤더의 태그 링크 클릭 시 태그 페이지로 이동한다.', async ({ page }) => {
    const headerNav = page.locator('header nav');
    const tagLink = headerNav.getByRole('link', { name: /tags/i });

    await tagLink.click();

    await expect(page).toHaveURL(new RegExp(`/tags$`), {
      timeout: 10000
    });
  });

  test('다크/라이트 모드 버튼 클릭 시 테마가 변경된다.', async ({ page }) => {
    const getTheme = async () => {
      const html = page.locator('html');
      const theme = await html.getAttribute('data-theme');
      const themeStorage = await page.evaluate(() =>
        localStorage.getItem('theme')
      );

      const themeBg = await html.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue('--color-bg')
      );

      return [theme, themeStorage, themeBg];
    };

    const headerNav = page.locator('header nav');
    const themeBtn = headerNav.locator('[class*="styles__Theme"] > button');

    // 라이트 -> 다크
    await themeBtn.click();

    const [darkTheme, darkThemeStorage, darkThemeBg] = await getTheme();

    expect(darkTheme).toBe('dark');
    expect(darkThemeStorage).toBe('dark');
    expect(darkThemeBg).toBe('#2f3437');

    // 다크 -> 라이트
    await themeBtn.click();

    const [lightTheme, lightThemeStorage, lightThemeBg] = await getTheme();

    expect(lightTheme).toBe('light');
    expect(lightThemeStorage).toBe('light');
    expect(lightThemeBg).toBe('#fff');
  });

  test('검색 버튼 클릭 시 검색 모달이 생성된다.', async ({ page }) => {
    const searchBtn = page.locator('nav [class*="styles__Search"] > button');

    await searchBtn.click();

    const searchInput = page.getByPlaceholder(/Search/i);

    await expect(searchInput).toBeVisible();
  });
});

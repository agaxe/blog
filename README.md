![blog 배너 이미지](https://user-images.githubusercontent.com/54921653/208304686-1e53fb50-ef30-45d9-aaab-538129c8b7a5.jpg)

# Notion Blog 

평소에 공부한 내용이나 디버깅 관련된 내용들을 노션을 통해서 정리하는 것을 선호해 Notion API 와 Next.js 를 통해 블로그를 제작하였습니다.

노션 포스팅 데이터베이스에 변경 사항이 발생하는 경우 재배포를 진행해야 하는 번거로움으로 인해 ISR 를 적용하여 배포를 진행하였습니다.

## 목차

- [폴더 구조](#폴더-구조)
- [사용 기술](#사용-기술)
- [관련 포스팅](#관련-포스팅)
- [디자인 시안](#디자인-시안)


## 폴더 구조

<details>
  <summary>접기/펼치기</summary>
  
  ```markdown
  ├── components
  │   ├── Analytics.tsx
  │   ├── Search
  │   │   ├── hooks
  │   │   │   └── useSearch.ts
  │   │   ├── index.test.tsx
  │   │   ├── index.tsx
  │   │   └── styles.ts
  │   ├── Theme
  │   │   ├── index.tsx
  │   │   └── styles.ts
  │   ├── common
  │   │   ├── Button
  │   │   │   ├── index.test.tsx
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Icon
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Image.tsx
  │   │   ├── Loading
  │   │   │   ├── index.test.tsx
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Profile
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Seo.test.tsx
  │   │   └── Seo.tsx
  │   ├── layout
  │   │   ├── Footer
  │   │   │   ├── index.test.tsx
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Header
  │   │   │   ├── hooks
  │   │   │   │   └── useStickyHeader.ts
  │   │   │   ├── index.test.tsx
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── MainTitleSection
  │   │   │   ├── index.test.tsx
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Navigation
  │   │   │   ├── index.tsx
  │   │   │   ├── interface.ts
  │   │   │   └── styles.ts
  │   │   ├── NotFound
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── PageLayout
  │   │   │   ├── index.tsx
  │   │   │   ├── interface.ts
  │   │   │   └── styles.ts
  │   │   ├── PostListContent
  │   │   │   ├── index.tsx
  │   │   │   ├── interface.ts
  │   │   │   └── styles.ts
  │   │   ├── TagList
  │   │   │   ├── index.test.tsx
  │   │   │   └── index.tsx
  │   │   └── TagPageTitleSection
  │   │       ├── index.tsx
  │   │       └── styles.ts
  │   └── notion
  │       ├── NotionPage
  │       │   ├── components.tsx
  │       │   ├── index.tsx
  │       │   └── interface.ts
  │       ├── NotionPageItem
  │       │   ├── Skeleton.tsx
  │       │   ├── index.test.tsx
  │       │   ├── index.tsx
  │       │   └── styles.ts
  │       ├── NotionPageList
  │       │   ├── Skeleton.tsx
  │       │   ├── index.test.tsx
  │       │   ├── index.tsx
  │       │   └── styles.ts
  │       ├── NotionPageSeries
  │       │   ├── index.test.tsx
  │       │   ├── index.tsx
  │       │   ├── interface.ts
  │       │   └── styles.ts
  │       ├── NotionTagItem
  │       │   ├── index.test.tsx
  │       │   ├── index.tsx
  │       │   ├── interface.ts
  │       │   └── styles.ts
  │       ├── NotionTagList
  │       │   ├── index.test.tsx
  │       │   └── index.tsx
  │       └── NotionTagSideList
  │           ├── index.test.tsx
  │           ├── index.tsx
  │           ├── interface.ts
  │           └── styles.ts
  ├── config.ts
  ├── e2e
  │   ├── common
  │   │   ├── common.spec.ts
  │   │   ├── post-item.spec.ts
  │   │   └── side-tag-list.spec.ts
  │   ├── main-page.spec.ts
  │   ├── post-detail-page.spec.ts
  │   ├── posts-page.spec.ts
  │   ├── tag-posts-page.spec.ts
  │   └── tags-page.spec.ts
  ├── hooks
  │   ├── __test__
  │   │   ├── useDebounce.test.tsx
  │   │   ├── useRefCurrent.test.tsx
  │   │   └── useThrottle.test.tsx
  │   ├── useDebounce.ts
  │   ├── useRefCurrent.ts
  │   ├── useTheme.ts
  │   └── useThrottle.ts
  ├── jest.config.ts
  ├── jest.setup.ts
  ├── lib
  │   ├── gtag.ts
  │   └── notion
  │       ├── __test__
  │       │   └── getDatabaseInfo.test.ts
  │       ├── config.ts
  │       ├── getDatabaseInfo.ts
  │       ├── page
  │       │   ├── getPageItem.ts
  │       │   ├── getPageProperty.ts
  │       │   ├── getPageSeries
  │       │   │   ├── PageSeries.ts
  │       │   │   ├── __test__
  │       │   │   │   ├── PageSeries.test.ts
  │       │   │   │   └── index.test.ts
  │       │   │   └── index.ts
  │       │   ├── getPathPage.test.ts
  │       │   └── getPathPage.ts
  │       ├── pages
  │       │   ├── __test__
  │       │   │   ├── getPageItems.test.ts
  │       │   │   └── getPathPages.test.ts
  │       │   ├── getPageItems.ts
  │       │   └── getPathPages.ts
  │       ├── search
  │       │   └── getSearchResult.ts
  │       ├── tags
  │       │   ├── __test__
  │       │   │   ├── getPathTagPages.test.ts
  │       │   │   ├── getTagItems.test.ts
  │       │   │   └── getTagWithPostCnt.test.ts
  │       │   ├── getPathTagPages.ts
  │       │   ├── getTagItems.ts
  │       │   └── getTagsWithPostCnt.ts
  │       └── utils
  │           ├── mapImageUrl.ts
  │           └── previewImages.ts
  ├── pages
  │   ├── 404.tsx
  │   ├── [pageId]
  │   │   └── index.tsx
  │   ├── _app.tsx
  │   ├── _document.tsx
  │   ├── api
  │   │   ├── revalidate
  │   │   │   ├── __test__
  │   │   │   │   ├── revalidate.test.tsx
  │   │   │   │   ├── revalidatePages.test.ts
  │   │   │   │   ├── revalidatePosts.test.ts
  │   │   │   │   └── revalidateTagPages.test.ts
  │   │   │   ├── index.ts
  │   │   │   ├── revalidatePages.ts
  │   │   │   ├── revalidatePosts.ts
  │   │   │   └── revalidateTagPages.ts
  │   │   └── search.ts
  │   ├── index.tsx
  │   ├── pages
  │   │   └── [pageNum].tsx
  │   ├── server-sitemap.xml
  │   │   └── index.tsx
  │   └── tags
  │       ├── [tagName]
  │       │   └── pages
  │       │       └── [pageNum].tsx
  │       └── index.tsx
  ├── public
  ├── shared
  │   ├── enums
  │   │   └── SwrFallbackKeys.ts
  │   ├── types
  │   │   ├── NavPageOptions.ts
  │   │   ├── NavPageOptionsFallback.ts
  │   │   ├── PostSeries.ts
  │   │   ├── PostSeriesFallback.ts
  │   │   ├── TagsWithCnt.ts
  │   │   └── TagsWithCntFallback.ts
  │   └── variable.ts
  ├── sitemap.config.js
  ├── styles
  │   ├── device.ts
  │   ├── global.ts
  │   ├── mixin.ts
  │   ├── notion.ts
  │   ├── reset.ts
  │   ├── theme.ts
  │   └── variable.ts
  ├── types
  │   ├── notion.d.ts
  │   └── style.d.ts
  ├── utils
  │   ├── __test__
  │   │   ├── convertPascalCase.test.ts
  │   │   ├── convertUuidToPostId.test.ts
  │   │   ├── formatDate.test.ts
  │   │   ├── getPaginationItems.test.ts
  │   │   ├── getPaginationLength.test.ts
  │   │   └── parseDatabaseItems.test.ts
  │   ├── convertBlankToHyphen.ts
  │   ├── convertHyphenToBlank.ts
  │   ├── convertPascalCase.ts
  │   ├── convertUuidToPostId.ts
  │   ├── formatDate.ts
  │   ├── getPaginationItems.ts
  │   ├── getPaginationLength.ts
  │   ├── normalizeTitleKo.ts
  │   └── parseDatabaseItems.ts
  ```
</details>



## 사용 기술 

- [next.js](https://nextjs.org/)
- [styled components](https://styled-components.com/)
- [notion API](https://developers.notion.com/)
- [react-notion-x](https://github.com/NotionX/react-notion-x)
- [swr](https://swr.vercel.app/)

## 관련 포스팅

- [포스트 시리즈 기능 구현 (feat. Notion API)](https://blog-agaxe.vercel.app/136654415bbc8074a504d65e4103c89f)
- [Vercel 환경 Github Actions 적용](https://blog-agaxe.vercel.app/125654415bbc809aa1fed3eab1c85b19)
- [[회고] Github Actions 를 통한 CI/CD 파이프라인 구축 (feat. Vercel)](https://blog-agaxe.vercel.app/125654415bbc8023b335c30362d53492)
- [[회고] Playwright 를 통한 E2E 테스트](https://blog-agaxe.vercel.app/125654415bbc8018ac88ce0c5398337e)
- [[회고] Jest, React Testing Library 테스트](https://blog-agaxe.vercel.app/125654415bbc80469162fbdda401491f)
- [[회고] 1년 이상 묵은 블로그 리팩토링](https://blog-agaxe.vercel.app/125654415bbc80738df1c4ccb0b69988)
- [SWR 를 통한 데이터 fetching](https://blog-agaxe.vercel.app/40479ddd976f4d1b8f78b37bee27cb85)
- [Intersection Observer 를 활용한 Infinite Scroll Pagination 구현 (feat. Notion API)](https://blog-agaxe.vercel.app/27c6c7ee9c0747378faef29c37798d74)
- [Next.js On-Demand Revalidation 관련 이슈 (feat. Vercel)](https://blog-agaxe.vercel.app/ecf86dc889ee47f8987cc9e90afb0cab)
- [Next.js - ISR](https://blog-agaxe.vercel.app/f65bdf24cd5e4597a1e8c8d2b026c878)
- [Next.js 구글 애널리틱스 4 적용](https://blog-agaxe.vercel.app/9da08526eb164b7ba5faf3c4cd4d8469)
- [Next.js 다크 모드 구현 (feat. data attribute)](https://blog-agaxe.vercel.app/92e9323565c24d138b1f1ed939e5bf74)
- [Next.js 다크 모드 구현 (feat. Styled components)](https://blog-agaxe.vercel.app/3f502104d6034fe484f8eb827cb5394a)
- [position fixed 가 동작하지 않는 이슈 (feat. backdrop-filter)](https://blog-agaxe.vercel.app/b8bacdaec4aa49d390fd66b4274586c3)

## 디자인 시안

[Figma](https://www.figma.com/file/noQPAMLKpSUlXsRc0PeaLw/%EB%B8%94%EB%A1%9C%EA%B7%B8?node-id=208%3A3&t=VohbRM47YQJRS5j4-1) 에서 확인 가능합니다.
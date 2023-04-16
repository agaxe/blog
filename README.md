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
  │   │   ├── index.tsx
  │   │   └── styles.ts
  │   ├── Theme
  │   │   ├── index.tsx
  │   │   └── styles.ts
  │   ├── common
  │   │   ├── Button
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Icon
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Image.tsx
  │   │   ├── Loading
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Profile
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   └── Seo.tsx
  │   ├── layout
  │   │   ├── Footer
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Header
  │   │   │   ├── hooks
  │   │   │   │   └── useStickyHeader.ts
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Layout.tsx
  │   │   ├── MainHeader
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Navigation
  │   │   │   ├── index.tsx
  │   │   │   ├── interface.ts
  │   │   │   └── styles.ts
  │   │   ├── NotFound
  │   │   │   ├── index.tsx
  │   │   │   └── styles.ts
  │   │   ├── Section
  │   │   │   ├── index.tsx
  │   │   │   ├── interface.ts
  │   │   │   └── styles.ts
  │   │   ├── TagList
  │   │   │   └── index.tsx
  │   │   └── TagPageHeader
  │   │       ├── index.tsx
  │   │       └── styles.ts
  │   └── notion
  │       ├── NotionPage.tsx
  │       ├── NotionPageItem
  │       │   ├── Skeleton.tsx
  │       │   ├── index.tsx
  │       │   └── styles.ts
  │       ├── NotionPageList
  │       │   ├── Skeleton.tsx
  │       │   ├── index.tsx
  │       │   └── styles.ts
  │       ├── NotionTagItem
  │       │   ├── index.tsx
  │       │   ├── interface.ts
  │       │   └── styles.ts
  │       └── NotionTagList.tsx
  ├── config.ts
  ├── hooks
  │   ├── useDebounce.ts
  │   ├── useTheme.ts
  │   └── useThrottle.ts
  ├── lib
  │   ├── gtag.ts
  │   └── notion
  │       ├── config.ts
  │       ├── getDatabaseInfo.ts
  │       ├── page
  │       │   ├── getPageItem.ts
  │       │   ├── getPageProperty.ts
  │       │   └── getPathPage.ts
  │       ├── pages
  │       │   ├── getPageItems.ts
  │       │   └── getPathPages.ts
  │       ├── search
  │       │   └── getSearchResult.ts
  │       ├── tags
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
  │   ├── types.ts
  │   └── variable.ts
  ├── sitemap.config.js
  ├── styles
  ├── types
  │   ├── notion.d.ts
  │   └── style.d.ts
  ├── utils
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
- [typescript](https://www.typescriptlang.org/)
- [styled components](https://styled-components.com/)
- [notion API](https://developers.notion.com/)
- [react-notion-x](https://github.com/NotionX/react-notion-x)
- [swr](https://swr.vercel.app/)

## 관련 포스팅

- [position fixed 가 동작하지 않는 이슈 (feat. backdrop-filter)](https://blog-agaxe.vercel.app/b8bacdaec4aa49d390fd66b4274586c3)
- [Next.js 다크 모드 구현 (feat. Styled components)](https://blog-agaxe.vercel.app/3f502104d6034fe484f8eb827cb5394a)
- [Next.js 다크 모드 구현 (feat. data attribute)](https://blog-agaxe.vercel.app/92e9323565c24d138b1f1ed939e5bf74)
- [Next.js 구글 애널리틱스 4 적용](https://blog-agaxe.vercel.app/9da08526eb164b7ba5faf3c4cd4d8469)
- [Next.js - ISR](https://blog-agaxe.vercel.app/f65bdf24cd5e4597a1e8c8d2b026c878)
- [Next.js On-Demand Revalidation 관련 이슈 (feat. Vercel)](https://blog-agaxe.vercel.app/ecf86dc889ee47f8987cc9e90afb0cab)
- [Intersection Observer 를 활용한 Infinite Scroll Pagination 구현 (feat. Notion API)](https://blog-agaxe.vercel.app/27c6c7ee9c0747378faef29c37798d74)
- [SWR 를 통한 데이터 fetching](https://blog-agaxe.vercel.app/40479ddd976f4d1b8f78b37bee27cb85)

## 디자인 시안

[Figma](https://www.figma.com/file/noQPAMLKpSUlXsRc0PeaLw/%EB%B8%94%EB%A1%9C%EA%B7%B8?node-id=208%3A3&t=VohbRM47YQJRS5j4-1) 에서 확인 가능합니다.
import { convertUuidToPostId } from '@/utils/convertUuidToPostId';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import pageIds from './pageIds';

const items: ReturnType<typeof parseDatabaseItems> = [...Array(10)].map(
  (_, i) => ({
    koId: `포스트-제목_${i + 1}-${convertUuidToPostId(pageIds[i])}`,
    id: `${convertUuidToPostId(pageIds[i])}`,
    title: `포스트 제목_${i + 1}`,
    tags: [
      {
        id: `60b24cda-f768-4783-974c-3f6f6663b6ba1`,
        name: `tag name_${i + 1}-1`,
        color: 'default'
      },
      {
        id: `8702102f-bd74-4e2f-a7a0-c9b1b3a6e92c`,
        name: `tag name_${i + 1}-2`,
        color: 'pink'
      }
    ],
    createdAt: '2024-04-29T11:33:00.000Z',
    isCompleted: true
  })
);

export default items;

import { getPageItems } from '@/lib/notion/pages/getPageItems';
import pageIds from './pageIds';

const items: Awaited<ReturnType<typeof getPageItems>> = [...Array(10)].map(
  (_, i) => ({
    object: 'page',
    id: `${pageIds[i]}`,
    created_time: '2024-04-29T11:33:00.000Z',
    last_edited_time: '2023-01-20T08:01:00.000Z',
    created_by: { object: 'user', id: 'db8981d9-64e0-4305-b367-4d50b844fbe3' },
    last_edited_by: {
      object: 'user',
      id: 'db8981d9-64e0-4305-b367-4d50b844fbe3'
    },
    cover: null,
    icon: null,
    parent: {
      type: 'database_id',
      database_id: 'bc39206a-e794-4700-8e90-b71bbf0d847b'
    },
    archived: false,
    in_trash: false,
    properties: {
      '수정 필요': { id: 'C%3EQL', type: 'rich_text', rich_text: [] },
      tags: {
        id: 'ej%5By',
        type: 'multi_select',
        multi_select: [
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
        ]
      },
      createdAt: {
        id: 'gma%3A',
        type: 'created_time',
        created_time: '2024-04-29T11:33:00.000Z'
      },
      status: {
        id: 'q%3Ckt',
        type: 'status',
        status: {
          id: '65f000e2-d6d3-490b-aa36-420832a0385e',
          name: 'complete',
          color: 'green'
        }
      },
      updatedAt: {
        id: 'utn%60',
        type: 'last_edited_time',
        last_edited_time: '2023-01-20T08:01:00.000Z'
      },
      name: {
        id: 'title',
        type: 'title',
        title: [
          {
            type: 'text',
            text: { content: `포스트 제목_${i + 1}`, link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: `포스트 제목_${i + 1}`,
            href: null
          }
        ]
      }
    },
    url: `https://www.notion.so/포스팅-타이틀-${pageIds[i]}`,
    public_url: `https://agaxe.notion.site/포스팅-타이틀-${pageIds[i]}`
  })
);

export default items;

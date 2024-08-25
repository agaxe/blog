import { getPageItems } from '@/lib/notion/pages/getPageItems';

const items: Awaited<ReturnType<typeof getPageItems>> = [...Array(5)].map(
  (_, i) => ({
    object: 'page',
    id: `f5a36499-58a3-4f5c-bcf4-8781679968d${i + 1}`,
    created_time: i % 2 === 0 ? '2022-11-08T14:21:00.000Z' : null,
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
            id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
            name: 'Tag1',
            color: 'blue'
          },
          {
            id: 'd99119ec-0e05-4830-96c8-bef3570bdd44',
            name: 'Tag2',
            color: 'yellow'
          }
        ]
      },
      createdAt: {
        id: 'gma%3A',
        type: 'created_time',
        created_time: '2022-11-08T14:21:00.000Z'
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
            text: { content: `포스팅 타이틀_${i + 1}`, link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: `포스팅 타이틀_${i + 1}`,
            href: null
          }
        ]
      }
    },
    url: 'https://www.notion.so/포스팅-타이틀-f5a36499-58a3-4f5c-bcf4-8781679968d0',
    public_url:
      'https://agaxe.notion.site/포스팅-타이틀-f5a36499-58a3-4f5c-bcf4-8781679968d0'
  })
);

export default items;

import pageIds from '@/mocks/pageIds';

const notionDB = {
  object: 'database',
  id: '1ac4cbc9-3b32-47ee-a529-a6eecc3aa744',
  cover: null,
  icon: { type: 'emoji', emoji: '📘' },
  created_time: '2022-11-08T14:21:00.000Z',
  created_by: { object: 'user', id: '0856cb48-d939-46bf-81c1-655f14113d27' },
  last_edited_by: {
    object: 'user',
    id: '0856cb48-d939-46bf-81c1-655f14113d27'
  },
  last_edited_time: '2024-08-20T07:59:00.000Z',
  title: [
    {
      type: 'text',
      text: { content: '포스팅', link: null },
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: 'default'
      },
      plain_text: '포스팅',
      href: null
    }
  ],
  description: [],
  is_inline: true,
  properties: {
    '수정 필요': {
      id: 'C%3EQL',
      name: '수정 필요',
      type: 'rich_text',
      rich_text: {}
    },
    tags: {
      id: 'ej%5By',
      name: 'tags',
      type: 'multi_select',
      multi_select: {
        options: [...Array(pageIds.length)].flatMap((_, i) => [
          {
            id: `60b24cda-f768-4783-974c-3f6f6663b6ba1`,
            name: `Tag Name_${(i % 5) + 1}-1`,
            color: 'default'
          },
          {
            id: `8702102f-bd74-4e2f-a7a0-c9b1b3a6e92c`,
            name: `Tag Name_${(i % 5) + 1}-2`,
            color: 'pink'
          }
        ])
      }
    },
    createdAt: {
      id: 'gma%3A',
      name: 'createdAt',
      type: 'created_time',
      created_time: {}
    },
    status: {
      id: 'q%3Ckt',
      name: 'status',
      type: 'status',
      status: {
        options: [
          {
            id: '513d481e-f913-4454-b810-a36dd32c97db',
            name: 'wait',
            color: 'default',
            description: null
          },
          {
            id: 'f4665b28-5cb2-4a93-8544-058ad775c27f',
            name: 'progress',
            color: 'blue',
            description: null
          },
          {
            id: '0dbb8211-c4cb-485c-91b6-7513291f9746',
            name: 'complete',
            color: 'green',
            description: null
          }
        ],
        groups: [
          {
            id: '36c9cde6-ddc0-4c2d-9e9e-ef705963692e',
            name: 'To-do',
            color: 'gray',
            option_ids: ['513d481e-f913-4454-b810-a36dd32c97db']
          },
          {
            id: '7a38d841-ed7f-49a4-8fba-ec94c3814001',
            name: 'In progress',
            color: 'blue',
            option_ids: ['f4665b28-5cb2-4a93-8544-058ad775c27f']
          },
          {
            id: 'e5b72099-ece3-4af2-912b-f0e9a87166ba',
            name: 'Complete',
            color: 'green',
            option_ids: ['0dbb8211-c4cb-485c-91b6-7513291f9746']
          }
        ]
      }
    },
    updatedAt: {
      id: 'utn%60',
      name: 'updatedAt',
      type: 'last_edited_time',
      last_edited_time: {}
    },
    name: { id: 'title', name: 'name', type: 'title', title: {} }
  },
  parent: { type: 'page_id', page_id: 'a83a8e39-5b79-4a0f-8014-70e46729b704' },
  url: 'https://www.notion.so/dd9434db83cc4054a4769da4513c4896',
  public_url: 'https://agaxe.notion.site/dd9434db83cc4054a4769da4513c4896',
  archived: false,
  in_trash: false,
  request_id: '25bfdaa0-acbd-42e9-8780-f106b31cf48e'
};

export default notionDB;

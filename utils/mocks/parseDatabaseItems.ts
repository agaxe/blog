import { parseDatabaseItems } from '../parseDatabaseItems';

const items: ReturnType<typeof parseDatabaseItems> = [...Array(10)].map(
  (_, i) => ({
    koId: `6231c9937b2e49e18ad6000eeabe7e38_${i + 1}`,
    id: `6231c9937b2e49e18ad6000eeabe7e38_${i + 1}`,
    title: `test title_${i + 1}`,
    tags: [...Array(2)].map((_, i) => ({
      id: `60b24cda-f768-4783-974c-3f6f6663b6ba_${i + 1}`,
      name: `tag name_${i + 1}`,
      color: 'default'
    })),
    createdAt: '2024-04-29T11:33:00.000Z',
    isCompleted: true
  })
);

export default items;

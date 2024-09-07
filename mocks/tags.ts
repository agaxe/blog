import { NotionTagList } from '@/components/notion/NotionTagList';

type Tags = React.ComponentProps<typeof NotionTagList>['tags'];

const tags: Tags = [
  {
    id: '40bb4eaa-8c7e-44c0-aaf1-3d901014932a',
    name: 'React Query',
    color: 'brown'
  },
  {
    id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
    name: 'React',
    color: 'blue'
  }
];

export default tags;

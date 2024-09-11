import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import mockNotionDB from '@/mocks/notionDB';
import mockDBPageItems from '@/mocks/notionPageItems';

class hqClient {
  databases = {
    query: (option: QueryDatabaseParameters) => {
      let results = mockDBPageItems;

      const tag = (option?.filter as any)?.and?.[0]?.multi_select?.contains;

      if (tag) {
        results = results.filter((v) => {
          return (v as any)?.properties?.tags?.multi_select?.some(
            (pageTag: any) => pageTag.name === tag
          );
        });
      }

      if (option?.page_size) {
        results = results.filter((_, i) => i < Number(option.page_size));
      }

      return {
        results
      };
    },
    retrieve: () => {
      return mockNotionDB;
    }
  };

  constructor() {}
}

export default hqClient;
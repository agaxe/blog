import { PropertyItemPropertyItemListResponse } from '@notionhq/client/build/src/api-endpoints';

const notionPageRelation: PropertyItemPropertyItemListResponse = {
  object: 'list',
  results: [
    {
      object: 'property_item',
      type: 'relation',
      id: 'tK%5D%3F',
      relation: { id: '11d65441-5bbc-801a-9db6-c7e0436b161a' }
    }
  ],
  next_cursor: null,
  has_more: false,
  type: 'property_item',
  property_item: {
    id: 'tK%5D%3F',
    next_url: null,
    type: 'relation',
    relation: {}
  }
};

export default notionPageRelation;

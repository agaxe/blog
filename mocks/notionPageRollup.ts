import { PropertyItemPropertyItemListResponse } from '@notionhq/client/build/src/api-endpoints';

const notionPageRollup: PropertyItemPropertyItemListResponse = {
  object: 'list',
  results: [
    {
      object: 'property_item',
      type: 'relation',
      id: '%5Ei~%3F',
      relation: { id: 'ad21426e-9081-11ef-ac4b-325096b39f47' }
    },
    {
      object: 'property_item',
      type: 'relation',
      id: '%5Ei~%3F',
      relation: { id: 'ad214462-9081-11ef-8bd4-325096b39f47' }
    },
    {
      object: 'property_item',
      type: 'relation',
      id: '%5Ei~%3F',
      relation: { id: 'ad2144d0-9081-11ef-a2dc-325096b39f47' }
    },
    {
      object: 'property_item',
      type: 'relation',
      id: '%5Ei~%3F',
      relation: { id: 'ad214520-9081-11ef-acb9-325096b39f47' }
    }
  ],
  next_cursor: null,
  has_more: false,
  type: 'property_item',
  property_item: {
    id: '%5Dksp',
    next_url: null,
    type: 'rollup',
    rollup: { type: 'array', array: [], function: 'show_original' }
  }
};

export default notionPageRollup;

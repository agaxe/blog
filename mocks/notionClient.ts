const notionClient = {
  block: {
    'ed7de450-7cfc-4fea-b334-9da03d3d0db5': {
      value: {
        id: 'ed7de450-7cfc-4fea-b334-9da03d3d0db5',
        version: 21,
        type: 'page',
        properties: {
          'ej[y': [['Tag1,Tag2']],
          'q<kt': [['complete']],
          title: [['페이지 타이틀']]
        },
        content: [
          '83661a10-0207-4ee4-b636-05eaaec41574',
          'b4211710-b336-4eb4-8f56-b82493dd1fbd',
          'f6152259-c817-4d64-9fcc-7c52b10d390f',
          '20c0c4bf-51f4-4efc-aae8-1552440b79b3',
          'b10b0d97-7a38-4ed2-acde-79056d2691d5',
          '3fdbac85-2839-4b31-83c6-d0885425c7db',
          '5f5bda22-6607-427b-8b6d-7bfc14e21507',
          '93d266d6-5749-4a91-9087-5e6203099fc6',
          '79fbccf2-a00a-4a0c-9806-8730e089025c',
          'd30790d1-128b-44b3-973c-864138d14e87',
          '41573bd8-2b23-4a34-9f17-aedf2c6e5d6b',
          'c1560d14-7713-49aa-a67e-0a12feac11bf',
          'e5ff14fb-04ed-47a2-a782-77739a9492f6',
          'af1cdb25-05fe-4722-9b32-02a650bcc2b6',
          '7d4b548b-c1d7-404f-997c-deb5e28f23ef',
          '09c87ba4-c7c5-4b29-b00d-b9b4d7f193d3',
          '24a1964c-7090-4aec-80e4-5aaed617b59e',
          '90d4d7d3-3bae-4355-8184-1ed82f8ee6b0',
          '8845e0cb-f8df-489b-9d07-54b539b9d5cd',
          'b30d5a9c-a224-41cb-89e6-62218905ef56'
        ],
        format: {
          block_locked: true,
          block_locked_by: 'ee782a44-f785-4b9d-a618-0cea2c5f8db9',
          copied_from_pointer: {
            id: '3ece22f0-c026-4e4e-be9d-ec0f72be8a78',
            table: 'block',
            spaceId: 'eeca6ea9-5499-4076-a82d-005b08cdcb04'
          }
        },
        created_time: 1714390387855,
        last_edited_time: 1714391600863,
        parent_id: '3cce7bf5-3b7d-4755-af36-6a116babe5a4',
        parent_table: 'collection',
        alive: true,
        copied_from: '3ece22f0-c026-4e4e-be9d-ec0f72be8a78',
        space_id: 'eeca6ea9-5499-4076-a82d-005b08cdcb04'
      },
      role: 'reader'
    }
  }
};

export default notionClient;

class Client {
  async getPage(pageId: string) {}
}

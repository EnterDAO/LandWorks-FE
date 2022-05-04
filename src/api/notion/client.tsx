/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, createContext, useContext } from 'react';
import { Client } from '@notionhq/client';
import { GetPageResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import config from '../../config';

export interface INotionService {
  getSceneProviders: () => Promise<QueryDatabaseResponse>;
  getPage: (id: string) => Promise<GetPageResponse>;
}
export const NotionServiceContext = createContext<INotionService>({
  getSceneProviders: () => new Promise<QueryDatabaseResponse>(() => []),
  getPage: () => new Promise<GetPageResponse>(() => {}),
});

export function useNotion(): INotionService {
  return useContext(NotionServiceContext);
}

const NotionProvider: FC = (props) => {
  const { children } = props;

  const notion = new Client({
    auth: config.notion.apiKey,
    baseUrl: config.notion.baseUrl,
  });

  const getSceneProviders = async function (): Promise<QueryDatabaseResponse> {
    return notion.databases.query({
      database_id: config.notion.databaseId,
      filter: {
        or: [
          {
            property: 'Status',
            select: {
              equals: 'Approved',
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Prio',
          direction: 'ascending',
        },
      ],
    });
  };

  const getPage = async function (id: string): Promise<GetPageResponse> {
    return notion.pages.retrieve({
      page_id: id,
    });
  };

  const value: INotionService = {
    getSceneProviders,
    getPage,
  };

  return (
    <>
      <NotionServiceContext.Provider value={value}>{children}</NotionServiceContext.Provider>
    </>
  );
};

export default NotionProvider;

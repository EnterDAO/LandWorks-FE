/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, createContext, useCallback, useContext } from 'react';
import { Client } from '@notionhq/client';
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

import config from '../../config';

import { transformNotionEntityToSceneBuilder } from 'modules/meta-creators/utils';

import { NotionResultForProfile } from 'modules/meta-creators/components/scene-builder-card/types';

export interface INotionService {
  getSceneProviders: () => Promise<NotionResultForProfile[]>;
  getPage: (id: string) => Promise<GetPageResponse>;
}
export const NotionServiceContext = createContext<INotionService>({
  getSceneProviders: () => new Promise<NotionResultForProfile[]>(() => []),
  getPage: () => new Promise<GetPageResponse>(() => {}),
});

export function useNotion(): INotionService {
  return useContext(NotionServiceContext);
}

const notion = new Client({
  auth: config.notion.apiKey,
  baseUrl: config.notion.baseUrl,
});

const NotionProvider: FC = ({ children }) => {
  const sceneProviderFilters = config.isProd
    ? [
        {
          property: 'Status',
          select: {
            equals: 'Approved',
          },
        },
      ]
    : [
        {
          property: 'Status',
          select: {
            equals: 'Approved',
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Under Review',
          },
        },
      ];

  const getSceneProviders = useCallback(async () => {
    const response = await notion.databases.query({
      database_id: config.notion.databaseId,
      filter: {
        or: sceneProviderFilters,
      },
      sorts: [
        {
          property: 'Prio',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((result) => {
      return transformNotionEntityToSceneBuilder(result as any);
    });
  }, []);

  const getPage = async function (id: string): Promise<GetPageResponse> {
    return notion.pages.retrieve({
      page_id: id,
    });
  };

  const value: INotionService = {
    getSceneProviders,
    getPage,
  };

  return <NotionServiceContext.Provider value={value}>{children}</NotionServiceContext.Provider>;
};

export default NotionProvider;

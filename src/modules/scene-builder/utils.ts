import { NotionResult, NotionResultForCard, NotionResultForProfile } from './components/scene-builder-card/types';

export const transformSceneProviderForCard = (notionEntity: NotionResult): NotionResultForCard => {
  return {
    coverPhotoLink: notionEntity.properties['Cover Photo'].files[0].file.url,
    avatarPhotoLink: notionEntity.properties['Profile Picture'].files[0].file.url,
    builderName: notionEntity.properties['Scene Builder Name'].title[0].plain_text,
    definition: notionEntity.properties.Definition.rich_text[0].plain_text,
    builderType: notionEntity.properties.Type.select.name,
    shortDescription: notionEntity.properties['Short Description'].rich_text[0].plain_text,
    location: notionEntity.properties.Location.rich_text[0].plain_text,
  };
};

export const transformSceneProviderForProfile = (notionEntity: NotionResult): NotionResultForProfile => {
  const portfolio = [
    notionEntity.properties['Portfolio 1'].files[0]?.file?.url,
    notionEntity.properties['Portfolio 2'].files[0]?.file?.url,
    notionEntity.properties['Portfolio 3'].files[0]?.file?.url,
    notionEntity.properties['Portfolio 4'].files[0]?.file?.url,
  ];
  return {
    coverPhotoLink: notionEntity.properties['Cover Photo'].files[0].file.url,
    avatarPhotoLink: notionEntity.properties['Profile Picture'].files[0].file.url,
    builderName: notionEntity.properties['Scene Builder Name'].title[0].plain_text,
    definition: notionEntity.properties.Definition.rich_text[0].plain_text,
    builderType: notionEntity.properties.Type.select.name,
    longDescription: notionEntity.properties['Long Description'].rich_text[0].plain_text,
    website: notionEntity.properties.Website.url,
    twitter: notionEntity.properties.Twitter.rich_text[0]?.plain_text || '',
    discord: notionEntity.properties.Discord.rich_text[0]?.plain_text || '',
    email: notionEntity.properties.Email.email,
    location: notionEntity.properties.Location.rich_text[0].plain_text,
    tags: notionEntity.properties.Tags.multi_select.map((t) => t.name).join(', '),
    languages: notionEntity.properties.Languages.multi_select.map((t) => t.name).join(', '),
    portfolio,
  };
};

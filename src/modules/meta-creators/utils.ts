import { NotionResult, NotionResultForProfile } from './components/scene-builder-card/types';

export const transformNotionEntityToSceneBuilder = ({ id, properties }: NotionResult): NotionResultForProfile => {
  const portfolio = ([1, 2, 3, 4] as const).map((val) => {
    return properties[`Portfolio ${val}`].files[0]?.file?.url;
  });

  return {
    id,
    coverPhotoLink: properties['Cover Photo'].files[0].file.url,
    avatarPhotoLink: properties['Profile Picture'].files[0].file.url,
    builderName: properties['Scene Builder Name'].title[0].plain_text,
    definition: properties.Definition.rich_text[0].plain_text,
    builderType: properties.Type.select.name,
    longDescription: properties['Long Description'].rich_text[0].plain_text,
    shortDescription: properties['Short Description'].rich_text[0].plain_text,
    website: properties.Website.url,
    twitter: properties.Twitter.rich_text[0]?.plain_text || '',
    discord: properties.Discord.rich_text[0]?.plain_text || '',
    email: properties.Email.email,
    location: properties.Location.rich_text[0].plain_text,
    tags: properties.Tags.multi_select.map((t) => t.name).join(', '),
    languages: properties.Languages.multi_select.map((t) => t.name).join(', '),
    portfolio,
  };
};

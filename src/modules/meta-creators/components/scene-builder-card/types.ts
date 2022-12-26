/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SceneProv {
  object: string;
  results: NotionResult[];
  next_cursor: any;
  has_more: boolean;
  type: string;
  page: Page;
}

export interface NotionResult {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: any;
  icon: any;
  archived: boolean;
  properties: Properties;
  url: string;
}

export interface NotionResultForCard {
  id: string;
  coverPhotoLink: string;
  avatarPhotoLink: string;
  builderName: string;
  definition: string;
  builderType: string;
  shortDescription: string;
  location: string;
}

export interface NotionResultForProfile {
  id: string;
  coverPhotoLink: string;
  avatarPhotoLink: string;
  builderName: string;
  definition: string;
  builderType: string;
  longDescription: string;
  shortDescription: string;
  website: string;
  twitter: string;
  discord: string;
  email: string;
  location: string;
  tags: string;
  languages: string;
  portfolio: string[];
}

export interface NotionResultForPortfolio {
  portfolio1: string;
  portfolio2: string;
  portfolio3: string;
  portfolio4: string;
}

export interface NotionResultForPage {
  coverPhotoLink: string;
  avatarPhotoLink: string;
  builderName: string;
  definition: string;
  builderType: string;
  longDescription: string;
  location: string;
  price: string;
  website: string;
  discord: string;
  twitter: string;
  languages: string;
  tags: string;
}

export interface Properties {
  Timezone: Timezone;
  Type: Type;
  Email: Email;
  Languages: Languages;
  'Cover Photo': CoverPhoto;
  'Portfolio 3': Portfolio3;
  'Portfolio 1': Portfolio1;
  'Portfolio 2': Portfolio2;
  'Portfolio 4': Portfolio4;
  Discord: Discord;
  Website: Website;
  Tags: Tags;
  Twitter: Twitter;
  Definition: Definition;
  'Short Description': ShortDescription;
  'Long Description': LongDescription;
  Location: Location;
  Price: Price;
  'Profile Picture': ProfilePicture;
  Status: Status;
  'Scene Builder Name': SceneBuilderName;
}

export interface Timezone {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: any;
}

export interface Text {
  content: string;
  link: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Type {
  id: string;
  type: string;
  select: Select;
}

export interface Select {
  id: string;
  name: string;
  color: string;
}

export interface Email {
  id: string;
  type: string;
  email: string;
}

export interface Languages {
  id: string;
  type: string;
  multi_select: MultiSelect[];
}

export interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

export interface CoverPhoto {
  id: string;
  type: string;
  files: File[];
}

export interface File {
  name: string;
  type: string;
  file: File2;
}

export interface File2 {
  url: string;
  expiry_time: string;
}

export interface Portfolio3 {
  id: string;
  type: string;
  files: File3[];
}

export interface File3 {
  name: string;
  type: string;
  file: File4;
}

export interface File4 {
  url: string;
  expiry_time: string;
}

export interface Portfolio1 {
  id: string;
  type: string;
  files: File5[];
}

export interface File5 {
  name: string;
  type: string;
  file: File6;
}

export interface File6 {
  url: string;
  expiry_time: string;
}

export interface Portfolio2 {
  id: string;
  type: string;
  files: File7[];
}

export interface File7 {
  name: string;
  type: string;
  file: File8;
}

export interface File8 {
  url: string;
  expiry_time: string;
}

export interface Portfolio4 {
  id: string;
  type: string;
  files: File9[];
}

export interface File9 {
  name: string;
  type: string;
  file: File10;
}

export interface File10 {
  url: string;
  expiry_time: string;
}

export interface Discord {
  id: string;
  type: string;
  rich_text: RichText2[];
}

export interface RichText2 {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href: any;
}

export interface Text2 {
  content: string;
  link: any;
}

export interface Annotations2 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Website {
  id: string;
  type: string;
  url: string;
}

export interface Tags {
  id: string;
  type: string;
  multi_select: MultiSelect2[];
}

export interface MultiSelect2 {
  id: string;
  name: string;
  color: string;
}

export interface Twitter {
  id: string;
  type: string;
  rich_text: RichText2[];
}

export interface Definition {
  id: string;
  type: string;
  rich_text: RichText3[];
}

export interface RichText3 {
  type: string;
  text: Text3;
  annotations: Annotations3;
  plain_text: string;
  href: any;
}

export interface Text3 {
  content: string;
  link: any;
}

export interface Annotations3 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface ShortDescription {
  id: string;
  type: string;
  rich_text: RichText4[];
}

export interface RichText4 {
  type: string;
  text: Text4;
  annotations: Annotations4;
  plain_text: string;
  href: any;
}

export interface Text4 {
  content: string;
  link: any;
}

export interface Annotations4 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface LongDescription {
  id: string;
  type: string;
  rich_text: RichText5[];
}

export interface RichText5 {
  type: string;
  text: Text5;
  annotations: Annotations5;
  plain_text: string;
  href: any;
}

export interface Text5 {
  content: string;
  link: any;
}

export interface Annotations5 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Location {
  id: string;
  type: string;
  rich_text: RichText6[];
}

export interface RichText6 {
  type: string;
  text: Text6;
  annotations: Annotations6;
  plain_text: string;
  href: any;
}

export interface Text6 {
  content: string;
  link: any;
}

export interface Annotations6 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Price {
  id: string;
  type: string;
  select: Select2;
}

export interface Select2 {
  id: string;
  name: string;
  color: string;
}

export interface ProfilePicture {
  id: string;
  type: string;
  files: File11[];
}

export interface File11 {
  name: string;
  type: string;
  file: File12;
}

export interface File12 {
  url: string;
  expiry_time: string;
}

export interface Status {
  id: string;
  type: string;
  select: Select3;
}

export interface Select3 {
  id: string;
  name: string;
  color: string;
}

export interface SceneBuilderName {
  id: string;
  type: string;
  title: Title[];
}

export interface Title {
  type: string;
  text: Text7;
  annotations: Annotations7;
  plain_text: string;
  href: any;
}

export interface Text7 {
  content: string;
  link: any;
}

export interface Annotations7 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Page {
  something: string;
}

export interface Daum {
  coverPhotoLink: string;
  shortDescription: string;
}

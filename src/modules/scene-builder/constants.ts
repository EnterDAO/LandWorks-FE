export const SCENE_BUILDER_TAB_STATE_ALL = 'all';

export const SCENE_BUILDER_TAB_STATE_INDIVIDUAL = 'Individual';

export const SCENE_BUILDER_TAB_STATE_STUDIO = 'Studio';
export type SceneBuilderTab =
  | typeof SCENE_BUILDER_TAB_STATE_ALL
  | typeof SCENE_BUILDER_TAB_STATE_INDIVIDUAL
  | typeof SCENE_BUILDER_TAB_STATE_STUDIO;

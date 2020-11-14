import { SectionsActionTypes } from './sections.types';

export const resetSectionsState = () => ({
  type: SectionsActionTypes.RESET_SECTIONS_STATE,
});

export const setSections = (sections) => ({
  type: SectionsActionTypes.SET_SECTIONS,
  payload: sections,
});

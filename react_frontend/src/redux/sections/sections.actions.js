import { SectionsActionTypes } from './sections.types';

export const resetSectionsState = () => ({
  type: SectionsActionTypes.RESET_SECTIONS_STATE,
});

export const setSections = (sections) => ({
  type: SectionsActionTypes.SET_SECTIONS,
  payload: sections,
});

export const setProfessions = (professions) => ({
  type: SectionsActionTypes.SET_PROFESSIONS,
  payload: professions,
});

export const setCurrentSection = (sectionId) => ({
  type: SectionsActionTypes.SET_CURRENT_SECTION,
  payload: sectionId,
});

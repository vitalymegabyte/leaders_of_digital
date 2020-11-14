import { createSelector } from 'reselect';

const selectSection = (state) => state.sections;

export const selectSections = createSelector(
  [selectSection],
  (sections) => sections.sections
);

export const selectLicencesLength = createSelector(
  [selectSection],
  (sections) => {
    return sections.sections.length;
  }
);

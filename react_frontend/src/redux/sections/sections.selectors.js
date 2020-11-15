import { createSelector } from 'reselect';

const selectSectionsArr = (state) => state.sections;
const selectSectionId = (state, props) => {
  if (props.match.params.sectionId) return props.match.params.sectionId;
  else return props.sectionId;
};

const selectProfessionId = (state, props) => {
  if (props.match.params.professionId) return props.match.params.professionId;
  else return props.professionId;
};

export const selectSections = createSelector(
  [selectSectionsArr],
  (sections) => sections.sections
);

export const selectSection = createSelector(
  [selectSectionsArr, selectSectionId],
  (sections, sectionId) => {
    console.log(sectionId);
    for (let i = 0; i < sections.sections.length; i++) {
      if (sections.sections[i].id == sectionId) {
        return sections.sections[i];
      }
    }
  }
);

export const selectSectionsLength = createSelector(
  [selectSectionsArr],
  (sections) => {
    return sections.sections.length;
  }
);

export const selectProfessions = createSelector(
  [selectSectionsArr],
  (sections) => sections.professions
);

export const selectProfession = createSelector(
  [selectSectionsArr, selectProfessionId],
  (sections, professionId) => {
    for (let i = 0; i < sections.professions.length; i++) {
      if (sections.professions[i].id == professionId) {
        return sections.professions[i];
      }
    }
  }
);

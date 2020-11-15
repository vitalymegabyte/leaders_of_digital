import { SectionsActionTypes } from './sections.types';

const initialState = {
  sections: [],
  professions: [],
};

const SectionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SectionsActionTypes.RESET_SECTIONS_STATE:
      return initialState;
    case SectionsActionTypes.SET_SECTIONS:
      return {
        ...state,
        sections: payload,
      };
    case SectionsActionTypes.SET_PROFESSIONS:
      return {
        ...state,
        professions: payload,
      };
    default:
      return state;
  }
};

export default SectionsReducer;

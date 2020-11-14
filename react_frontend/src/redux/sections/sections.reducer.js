import { SectionsActionTypes } from './sections.types';

const initialState = {
  sections: [],
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

    default:
      return state;
  }
};

export default SectionsReducer;

import { createStore } from 'redux';
import { LOAD_POSTS, SELECT_POST, RELOAD } from './actions';

const State: State = {
  posts: [],
  selectedPost: null,
  update: false,
};

const reducer = (state = State, action: Action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };

    case SELECT_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };

    case RELOAD:
      return {
        ...state,
        update: !state.update,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

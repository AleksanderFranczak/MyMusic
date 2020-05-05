import {
  SET_LIST_TYPE,
  FETCH_ARTISTS,
  FETCH_ARTISTS_FAILURE,
  FETCH_ARTISTS_SUCCESS,
  FETCH_TRACKS,
  FETCH_TRACKS_SUCCESS,
  FETCH_TRACKS_FAILURE,
  SELECT_ITEM,
  UNSELECT_ITEM,
  SET_TIME_RANGE,
  FETCH_RECOMMENDATIONS,
  FETCH_RECOMMENDATIONS_SUCCESS,
  CLEAR_SELECTED_ITEMS,
  CLEAR_RECOMMENDATIONS,
  SET_VIEW,
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
  CREATE_PLAYLIST,
  SET_USER_DATA,
} from "../types";
import { combineReducers } from "redux";

const listType = (state = "tracks", action) => {
  switch (action.type) {
    case SET_LIST_TYPE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const topList = (
  state = {
    artists: [],
    tracks: [],
    isFetching: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case FETCH_TRACKS: {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case FETCH_TRACKS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        tracks: action.payload,
        error: null,
      });
    }

    case FETCH_TRACKS_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload,
      });
    }
    case FETCH_ARTISTS: {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case FETCH_ARTISTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        artists: action.payload,
        error: null,
      });
    }
    case FETCH_ARTISTS_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload,
      });
    }

    default: {
      return state;
    }
  }
};

const selectedItems = (state = [], action) => {
  switch (action.type) {
    case SELECT_ITEM: {
      return [...state, action.payload];
    }
    case UNSELECT_ITEM: {
      return state.filter((item) => item.id !== action.payload);
    }
    case CLEAR_SELECTED_ITEMS: {
      return [];
    }

    default:
      return state;
  }
};

const timeRange = (state = "long_term", action) => {
  switch (action.type) {
    case SET_TIME_RANGE:
      return action.payload;
    default:
      return state;
  }
};

const recommendations = (
  state = {
    items: [],
    isLoading: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_RECOMMENDATIONS:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case FETCH_RECOMMENDATIONS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.payload,
      });
    case CLEAR_RECOMMENDATIONS:
      return Object.assign({}, state, {
        items: [],
        isLoading: false,
      });
    case CREATE_PLAYLIST:
      return Object.assign({}, state, {
        isLoading: true,
      });

    default:
      return state;
  }
};

const UI = (
  state = {
    view: "topList",
  },
  action
) => {
  switch (action.type) {
    case SET_VIEW:
      return Object.assign({}, state, {
        view: action.payload,
      });
    default:
      return state;
  }
};

const notification = (
  state = {
    type: "",
    isDisplaying: false,
    message: "",
    name: "",
  },
  action
) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return Object.assign({}, state, {
        type: action.payload.type,
        isDisplaying: true,
        message: action.payload.message,
        name: action.payload.name,
      });

    case CLEAR_NOTIFICATION:
      return Object.assign({}, state, {
        type: "",
        isDisplaying: false,
        message: "",
        name: "",
      });
    default:
      return state;
  }
};

const userData = (
  state = {
    id: "",
    name: "",
  },
  action
) => {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        id: action.payload.id,
        name: action.payload.name,
      });
    default:
      return state;
  }
};

const isCreated = (state = false, action) => {
  if (action.type === "CREATED") {
    return !state;
  }
  return state;
};
export default combineReducers({
  listType,
  topList,
  selectedItems,
  timeRange,
  recommendations,
  UI,
  notification,
  userData,
  isCreated,
});

// const newState = { ...state };
// newState[action.listType][action.index].selected = true;

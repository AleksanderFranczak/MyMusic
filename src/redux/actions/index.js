import {
  SET_LIST_TYPE,
  FETCH_ARTISTS,
  FETCH_ARTISTS_SUCCESS,
  FETCH_TRACKS,
  FETCH_TRACKS_SUCCESS,
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
import axios from "axios";

export const setListType = (listType) => ({
  type: SET_LIST_TYPE,
  payload: listType,
});

export const fetchArtists = (timeRange) => (dispatch) => {
  dispatch({
    type: FETCH_ARTISTS,
  });

  axios({
    method: "get",
    url: `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    dispatch({
      type: FETCH_ARTISTS_SUCCESS,
      payload: res.data.items,
    });
  });
};

export const fetchTracks = (timeRange) => (dispatch) => {
  dispatch({
    type: FETCH_TRACKS,
  });

  axios({
    method: "get",
    url: `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    dispatch({
      type: FETCH_TRACKS_SUCCESS,
      payload: res.data.items,
    });
  });
};

export const setNotification = (message, type, name) => (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION,
    payload: {
      type,
      message,
      name,
    },
  });

  setTimeout(() => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
  }, 1000);
};

export const selectItem = (item, listType) => (dispatch, getState) => {
  const { selectedItems } = getState();

  if (selectedItems.length <= 4) {
    dispatch(setNotification("added to fauvorites", "success", item.name));
    dispatch({
      type: SELECT_ITEM,
      payload: {
        ...item,
        listType,
      },
    });
  } else {
    dispatch(
      setNotification("Maximum 5 of fauvorite items are allowed", "alert")
    );
  }
};

export const unSelectItem = (id) => {
  return {
    type: UNSELECT_ITEM,
    payload: id,
  };
};

export const setTimeRange = (time) => {
  switch (time) {
    case "All time":
      return {
        type: SET_TIME_RANGE,
        payload: "long_term",
      };
    case "Last 6 months":
      return {
        type: SET_TIME_RANGE,
        payload: "medium_term",
      };
    case "Last month":
      return {
        type: SET_TIME_RANGE,
        payload: "short_term",
      };

    default:
      return null;
  }
};

export const fetchRecommendations = (seeds) => (dispatch) => {
  dispatch({
    type: FETCH_RECOMMENDATIONS,
  });

  axios({
    method: "GET",
    url: `https://api.spotify.com/v1/recommendations?limit=100&seed_artists=${seeds.artists.join(
      "%2C"
    )}&seed_tracks=${seeds.tracks.join("%2C")}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    dispatch({
      type: CLEAR_SELECTED_ITEMS,
    });
    dispatch({
      type: FETCH_RECOMMENDATIONS_SUCCESS,
      payload: res.data,
    });
  });
};

export const clearRecommendations = () => ({
  type: CLEAR_RECOMMENDATIONS,
});

export const setView = (view) => ({
  type: SET_VIEW,
  payload: view,
});

export const setUserData = (id, name) => ({
  type: SET_USER_DATA,
  payload: {
    name,
    id,
  },
});

export const createPlayList = (uris, name) => (dispatch, getState) => {
  const {
    userData: { id },
  } = getState();
  if (name.trim() === "") {
    name = "Created by MyMusic";
  }
  //1 . create a playlist
  dispatch({
    type: CREATE_PLAYLIST,
  });
  axios({
    method: "post",
    url: `https://api.spotify.com/v1/users/${id}/playlists`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: {
      name,
    },
  }).then((res) => {
    axios({
      method: "post",
      url: `https://api.spotify.com/v1/playlists/${res.data.id}/tracks`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        uris: uris,
      },
    }).then((res) => {
      dispatch(clearRecommendations());
      dispatch(setNotification("playlist succesfuly created", "success"));
      dispatch({
        type: "CREATED",
      });
    });
  });

  //2 . add items to playlist

  //3 . clear recommendations view from recommendations
  //4 . display notification that playlist was created
};
export const resetCreate = () => ({
  type: "CREATED",
});

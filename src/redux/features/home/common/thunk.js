// import { fetchApi } from "./fetchApi";

export const fetchCommonData =
  (fetchUrl, fetchStartAction, fetchSuccessAction, fetchFailureAction) =>
  async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const endpoint = fetchUrl;
      // const response = await fetchApi(endpoint);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      dispatch(fetchSuccessAction(endpoint));
    } catch (error) {
      dispatch(fetchFailureAction(error.message));
    }
  };

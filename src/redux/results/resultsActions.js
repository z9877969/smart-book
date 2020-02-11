import axios from 'axios';

export const ActionConstants = {
  RESULTS_ADD: 'RESULTS_ADD',
};

const addResult = res => ({
  type: ActionConstants.RESULTS_ADD,
  payload: res,
});

export const postResultsOnServer = (
  token,
  trainingId,
  resultsArr,
) => dispatch => {
  axios
    .post(`/training/time/${trainingId}`, resultsArr, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      // console.log(res.data.pagesReadResult),
      dispatch(addResult(res.data.pagesReadResult));
    })
    .catch(console.log);
};

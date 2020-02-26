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
) => async dispatch => {
  await axios
    .post(`/training/time/${trainingId}`, resultsArr, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(addResult(res.data.pagesReadResult));
    })
    .catch(err => {
      return err;
      // console.log(err);
    });
};

import { ActionType } from './trainingActions';

const initialState = {
  trainingId: '',
  isDone: true,
  timeStart: 0,
  timeEnd: 0,
  avgReadPages: 0,
  booksCount: 0,
  unreadCount: 0,
  books: [],
  allPagesCount: 0,
  pagesReadResult: [
    {
      _id: null,
      date: 0,
      count: 0,
    },
  ],
};

const trainingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.GET_TRAINING:
      return {
        ...payload,
      };
    case ActionType.UPDATE_TRAINING:
      return {
        ...payload,
      };
    case ActionType.FINISHED_TRAINING:
      return null;
    default:
      return state;
  }
};

export default trainingReducer;

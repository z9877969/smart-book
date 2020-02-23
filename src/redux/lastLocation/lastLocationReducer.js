import { Location } from './lastLocationAction';

const locationReducer = (state = '', { type, payload }) => {
  switch (type) {
    case Location.ADD_LOCATION:
      return payload;
    case Location.LOGOUT_LOCATION:
      return payload;
    default:
      return state;
  }
};

export default locationReducer;

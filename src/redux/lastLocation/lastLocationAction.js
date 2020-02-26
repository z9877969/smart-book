export const Location = {
  ADD_LOCATION: 'ADD_LOCATION',
  LOGOUT_LOCATION: 'LOGOUT_LOCATION',
};

export const addLocation = location => ({
  type: Location.ADD_LOCATION,
  payload: location,
});
export const logoutLocation = () => ({
  type: Location.LOGOUT_LOCATION,
  payload: null,
});

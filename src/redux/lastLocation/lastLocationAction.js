export const Location = {
  ADD_LOCATION: 'ADD_LOCATION',
};

export const addLocation = location => ({
  type: Location.ADD_LOCATION,
  payload: location,
});

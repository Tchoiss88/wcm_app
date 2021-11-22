const rootReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM_BAG':
      return [...state, action.payload];
    case 'REMOVE_ITEM_BAG':
      return state.filter((curr) => curr !== action.payload);

    default:
      return state;
  }
};

export default rootReducer;

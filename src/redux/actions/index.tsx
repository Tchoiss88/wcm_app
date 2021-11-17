export const addItem = (item) => {
  return {
    type: 'ADD_ITEM_BAG',
    payload: item,
  };
};

export const removeItem = (item) => {
  return {
    type: 'REMOVE_ITEM_BAG',
    payload: item,
  };
};

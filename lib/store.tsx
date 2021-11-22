import create from 'zustand';

const items = require('../utils/data.json');
const categoryName = [];

const useStore = create((set) => ({
  stock: items,
  categoryName: categoryName,
  addItemToStock: (item) => set((state) => ({ stock: [...state.stock, item] })),
  addNameToCategoryName: (item) =>
    set((state) => ({ categoryName: [...state.categoryName, item] })),
}));

export default useStore;

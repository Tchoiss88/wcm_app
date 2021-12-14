import create from 'zustand';

const useStore = create<any>((set) => ({
  stock: [],
  orders: [],

  setStock: (data: any) => set({ stock: data }),
  setOrders: (data: any) => set({ orders: data }),
}));

export default useStore;

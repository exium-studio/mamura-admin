import { create } from "zustand";

interface Props {
  open: boolean;
  data: any;
  onOpen: () => void;
  onClose: () => void;
  setOpen: (newState: boolean) => void;
  setData: (newState: any) => void;
}

const useEditProvinceDisclosure = create<Props>((set) => ({
  open: false,
  data: null,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
  setOpen: (newState) => set({ open: newState }),
  setData: (newState) => set({ data: newState }),
}));

export default useEditProvinceDisclosure;

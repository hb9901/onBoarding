import { create } from "zustand";

interface TtoastProps {
  id: string;
  content: string;
  delay: number;
}

interface TtoastState {
  toasts: TtoastProps[];
  setToastOpen: ({ id, content, delay }: TtoastProps) => void;
  setToastClose: (id: string) => void;
}

const useToastStore = create<TtoastState>((set, get) => ({
  toasts: [],
  setToastOpen: ({ id,  content, delay }) => {
    set({ toasts: [...get().toasts, { id,  content, delay }] });
  },
  setToastClose: (id: string) => {
    set({ toasts: get().toasts.filter((toast) => id !== toast.id) });
  },
}));

export default useToastStore;

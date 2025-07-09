import { create } from "zustand";
import { FormElementType } from "../types/global";

type FormBuilderElementsStoreType = {
  elements: FormElementType[];
  setElements: (elements: FormElementType[]) => void;
  deleteElement: (id: string) => void;
  updateElement: (id: string, updatedFields: Partial<FormElementType>) => void;
};

export const useFormBuilderElementsStore = create<FormBuilderElementsStoreType>(
  (set) => ({
    elements: [],
    setElements: (elements: FormElementType[]) => set({ elements }),
    deleteElement: (id: string) =>
      set((state) => ({
        elements: state.elements.filter((element) => element.id !== id),
      })),
    updateElement: (id: string, updatedFields: Partial<FormElementType>) => {
      set((state) => ({
        elements: state.elements.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item
        ),
      }));
    },
  })
);

export const useActiveFormElement = create<{
  activeFormElementId: string | null;
  setActiveFormElementId: (item: string | null) => void;
}>((set) => ({
  activeFormElementId: null,
  setActiveFormElementId: (id) => set({ activeFormElementId: id }),
}));

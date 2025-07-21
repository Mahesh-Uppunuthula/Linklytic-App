import { create, StateCreator } from "zustand";
import {
  ElementType,
  Form,
  FormElement,
  FormElementType,
} from "../types/global";
import { arrayMove } from "@dnd-kit/sortable";
import { createElement } from "@libs/helpers";

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

type FormHeaderActions = {
  setField: <k extends keyof Form["header"]>(
    fieldName: k,
    value: Form["header"][k]
  ) => void;
};
const createFormHeaderSlice: StateCreator<
  Form["header"] & FormHeaderActions
> = (set) => ({
  title: "",
  description: "",
  setField(fieldName, value) {
    set((state) => ({
      ...state,
      [fieldName]: value,
    }));
  },
});

type FormBodyActions = {
  reorder: (sourceIndex: number, destinationIndex: number) => void;
  addElement: (type: ElementType) => void;
  deleteElement: (id: string) => void;
  updateElement: (
    id: string,
    updatedFields: Partial<Form["body"]["elements"]>
  ) => void;
};
const createFormBodySlice: StateCreator<Form["body"] & FormBodyActions> = (
  set
) => ({
  orderedElementIds: [],
  elements: [],
  reorder: (sourceIndex: number, destinationIndex: number) => {
    set((state) => ({
      orderedElementIds: arrayMove(
        state.orderedElementIds,
        sourceIndex,
        destinationIndex
      ),
      elements: arrayMove(state.elements, sourceIndex, destinationIndex),
    }));
  },
  addElement: (type: ElementType) => {
    const newElement: FormElement = createElement(type);
    set((state) => ({
      orderedElementIds: [...state.orderedElementIds, newElement.id],
      elements: [...state.elements, newElement],
    }));
  },
  deleteElement: (id: string) => {
    set((state) => ({
      orderedElementIds: state.orderedElementIds.filter((item) => item !== id),
      elements: state.elements.filter((item) => item.id !== id),
    }));
  },
  updateElement: (
    id: string,
    updatedFields: Partial<Form["body"]["elements"]>
  ) => {
    set((state) => ({
      elements: state.elements.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      ),
    }));
  },
});

export const useFormBuilder = create<
  Form["header"] & Form["body"] & FormHeaderActions & FormBodyActions
>()((...props) => ({
  ...createFormHeaderSlice(...props),
  ...createFormBodySlice(...props),
}));

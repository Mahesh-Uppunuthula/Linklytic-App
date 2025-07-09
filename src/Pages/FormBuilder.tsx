import { LuChevronRight } from "react-icons/lu";
import { useCallback, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  BaseItemType,
  ColumnType,
  ComponentType,
  DraggableItemData,
  ElementID,
} from "../types/global";
import Tabs, { TabType } from "@components/ui/Tabs/Tabs";
import {
  useActiveFormElement,
  useFormBuilderElementsStore,
} from "@store/FormBuilderStore";
import DynamicDragOverlayItem from "@components/DnD/DynamicDragOverlayItem";
import StaticDragOverlayItem from "@components/DnD/StaticDragOverlayItem";
import FormPlayground from "@components/DnD/FormPlayground";
import {
  ALL_BUILT_IN_FORM_COMPONENTS,
  builtInComponentNamesSet,
} from "@libs/constants";
import ComponentsLibrary from "@components/DnD/ComponentsLibrary";
import Button from "@components/ui/Button/Button";
import InlineTextField from "@components/ui/TextField/InlineTextField";
import PageHeader from "@components/layout/Header/PageHeader";
import { buildFormElement } from "@libs/utils";
import Toolkit from "@components/DnD/Toolkit";
import { cn } from "@libs/helpers";

const COLUMNS: Record<string, ColumnType> = {
  staticColumn: {
    id: "staticColumn",
    label: "Static",
    type: "static",
  },
  dynamicColumn: {
    id: "dynamicColumn",
    label: "Dynamic",
    type: "dynamic",
  },
};

const TABS: TabType[] = [
  {
    id: "raw",
    label: "Raw",
  },
  {
    id: "preview",
    label: "Preview",
  },
];

const FormBuilder = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
        distance: 15,
      },
    })
  );

  const formElements = useFormBuilderElementsStore((state) => state.elements);
  const setFormElements = useFormBuilderElementsStore(
    (state) => state.setElements
  );

  const activeFormElementId = useActiveFormElement(
    (state) => state.activeFormElementId
  );

  console.log({ activeFormElementId });

  const setActiveFormElement = useActiveFormElement(
    (state) => state.setActiveFormElementId
  );
  // const [values, setValues] = useState<FormElementType[]>([]);
  const [activeComponent, setActiveComponent] = useState<null | {
    type: ComponentType;
    element: BaseItemType;
  }>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeElement = active.data.current as DraggableItemData;
    if (!activeElement || !over || !over.data || !over.id) return;

    const fromColumn = activeElement.from as ComponentType;

    if (fromColumn === "static") {
      const toColumn = over.id as ComponentType;
      if (toColumn !== "dynamic") return;
      const newFormElement = buildFormElement(activeElement.item);
      if (formElements.length === 0) setActiveFormElement(newFormElement.id);
      // appends to form
      const updatedFormElements = [
        ...formElements,
        { ...newFormElement, order: formElements.length },
      ];
      setFormElements(updatedFormElements);
    } else if (fromColumn === "dynamic") {
      const overElementId = over.id as ElementID;
      const overElementType = overElementId.split("_")[0] as ElementID;

      if (!builtInComponentNamesSet.has(overElementType)) return;

      console.log("handleDragEnd from dynamic to dynamic");
      const foundFromElementIndex = formElements.findIndex(
        (item) => item.id === activeElement.item.id
      );
      const foundToElementIndex = formElements.findIndex(
        (item) => item.id === overElementId
      );

      // console.log("handleDragEnd", {
      //   fromColumn,
      //   toColumn: overElementType,
      //   foundFromElementIndex,
      //   foundToElementIndex,
      // });

      if (foundFromElementIndex === -1) {
        // console.log("foundFromElementIndex === -1");
        return;
      }
      if (foundToElementIndex === -1) {
        // console.log("foundToElementIndex === -1");
        return;
      }
      const updatedPositions = arrayMove(
        formElements,
        foundFromElementIndex,
        foundToElementIndex
      );

      setFormElements(updatedPositions);
    }

    // console.log("handleDragEnd", { fromColumn, toColumn });

    // if (fromColumn === "static" && toColumn === "dynamic") {
    //   console.log("handleDragEnd from static to dynamic");
    //   const newFormElement = buildFormElement(activeElement.item);
    //   // appends to form
    //   setValues((prev) => [...prev, { ...newFormElement, order: prev.length }]);
    // } else if (fromColumn === "dynamic" && toColumn === "dynamic") {
    //   console.log("handleDragEnd from dynamic to dynamic");

    //   const activeId = activeElement.id;
    //   const activeActualId = (activeId as string).split("-")[0];

    //   const activeIndex = values.findIndex(
    //     (item) => item.id === activeActualId
    //   );
    //   const overIndex = values.findIndex((item) => item.id === over.id);

    //   console.log("from ", { activeIndex }, " to ", { overIndex });

    //   const updatedPositions = arrayMove(values, activeIndex, overIndex);
    //   setValues(updatedPositions);
    // }
  };
  const cancelFormName = useCallback(() => {
    console.log("on cancel");
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveComponent({
      element: event.active.data.current?.item,
      type: event.active.data.current?.from,
    });
  }, []);

  console.log({ activeComponent });

  return (
    <div className="h-full overflow-hidden">
      {/* container */}
      <div className="h-full">
        {/* nav bar */}
        <div className="w-full h-[7%] px-2 flex justify-between place-items-center border-b border-neutral-200 shadow-sm">
          {/* left section */}
          <div className="h-full flex gap-1 place-items-center">
            {/* heading */}
            <div>
              <PageHeader text="Form Builder" />
            </div>
            <div>
              <LuChevronRight size={18} className="text-neutral-500" />
            </div>
            {/* form name */}
            <div
              onClick={(e) => {
                console.log("e", e);
              }}
            >
              <InlineTextField
                bolded
                placeholder="Untitled"
                onSave={function (text: string): void {
                  console.log("on save ", { text });
                }}
                onCancel={cancelFormName}
              />
            </div>
          </div>
          {/* right section */}
          <div className="h-full flex gap-5 place-items-center">
            {/* changes indicator */}
            <div className="text-xs text-neutral-400">
              <span>last updated 3 months ago</span>
            </div>
            <div className="h-full p-1 flex gap-2 place-items-center">
              {/* raw and preview tabs */}
              <Tabs
                tabs={TABS}
                onChange={(id) => {
                  console.log({ id });
                }}
              />
              {/* save button */}
              <div>
                <Button size="small" bolded appearance="primary">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* form builder layout*/}
        <div className="w-full h-[93%] overflow-y-auto">
          <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            sensors={sensors}
          >
            <div className="w-full h-full  flex">
              <div className="w-full max-w-[20%] h-full">
                <ComponentsLibrary
                  key={COLUMNS.staticColumn.id}
                  column={COLUMNS.staticColumn}
                  items={ALL_BUILT_IN_FORM_COMPONENTS}
                />
              </div>
              <div className="w-full h-fulloverflow-y-auto">
                <FormPlayground
                  key={COLUMNS.dynamicColumn.type}
                  column={COLUMNS.dynamicColumn}
                  items={formElements}
                />
              </div>

              <div className={cn({ "w-[30%]": activeFormElementId })}>
                <Toolkit />
              </div>
            </div>
            {
              <DragOverlay
                dropAnimation={
                  activeComponent && activeComponent.type === "static"
                    ? null
                    : { duration: 200, easing: "linear" }
                }
              >
                {activeComponent !== null &&
                  (activeComponent.type === "static" ? (
                    <StaticDragOverlayItem
                      name={activeComponent.element.name}
                    />
                  ) : (
                    <DynamicDragOverlayItem name={activeComponent.element.id} />
                  ))}
              </DragOverlay>
            }
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;

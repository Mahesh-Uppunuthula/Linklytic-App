import { RefObject, useEffect } from "react";

export function useOutsideClick(
  componentRef: RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void,
  shouldListen: boolean
) {
  useEffect(() => {
    if (!shouldListen) return;
    function handleClick(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        handler(event);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [componentRef, handler, shouldListen]);
}

import { usePlugin, renderWidget, useRunAsync } from '@remnote/plugin-sdk';
import clsx from "clsx";

export const SubRemCountWidget = () => {
  const plugin = usePlugin();
  const childrenRemCount = useRunAsync(async () => {
    const rem = await plugin.focus.getFocusedRem();
    const children = await rem?.getChildrenRem();
    return children?.length;
  }, [])

  return (
    <div className={clsx("p-[3px] rounded-lg", childrenRemCount == 0 && "hidden")}>
      <div
        className={clsx(
          "flex flex-col content-start gap-[0.5] w-full box-border p-2",
          "rounded-lg rn-clr-background-primary rn-clr-content-primary shadow-md border border-gray-100"
        )}
      >
        <div
          className={clsx(
            "rounded-md p-2 truncate",
            "rn-clr-background--hovered"
          )}
        >
          SubRem Count: {childrenRemCount}
        </div>
      </div>
    </div>
  );
};

renderWidget(SubRemCountWidget);

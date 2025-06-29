import { declareIndexPlugin, ReactRNPlugin, AppEvents, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

let lastFloatingWidgetId: string;

async function onActivate(plugin: ReactRNPlugin) {

  await plugin.app.registerWidget(
    "subrem-count-widget",
    WidgetLocation.FloatingWidget,
    {
      dimensions: { height: "auto", width: "250px" },
    }
  );

  const openAutocompleteWindow = async () => {
    const caret = await plugin.editor.getCaretPosition();  // 获取插入光标的位置坐标
    lastFloatingWidgetId = await plugin.window.openFloatingWidget(
      "subrem-count-widget",
      { top: caret ? caret.y + 25 : undefined, left: caret?.x }
    );
  };

  plugin.event.addListener(AppEvents.FocusedRemChange, undefined, async () => {
    const rem = await plugin.focus.getFocusedRem();
    const children = await rem?.getChildrenRem();
    if (children?.length == 0) {
      return;
    }

    if (
      lastFloatingWidgetId &&
      (await plugin.window.isFloatingWidgetOpen(lastFloatingWidgetId))
    ) {
      return;
    }

    await openAutocompleteWindow();
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);

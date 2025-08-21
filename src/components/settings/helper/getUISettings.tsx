import type { SectionProps } from "@app/types/settingSchema.ts";
import type appStore from "@app/store/appStore.ts";
import { isWindows } from "@app/utils/platform.ts";

export const getUISettings = (
  state: ReturnType<typeof appStore.getState>
): SectionProps => {
  return {
    id: "ui-settings",
    sectionName: "UI Settings",
    groups: [
      {
        id: "window-controls",
        visible: isWindows,
        groupName: "Window Controls",
        components: [
          {
            id: "mode",
            type: "Input",
            inputType: "number",
            label: "Window Control Height",
            value: state.windowControlHeight,
            onChange: (windowControlHeight) =>
              state.setWindowControlHeight(windowControlHeight),
          },
        ],
      },
    ],
  } satisfies SectionProps;
};

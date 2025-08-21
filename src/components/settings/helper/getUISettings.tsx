import type appStore from '@app/store/appStore.ts';
import type { SectionProps } from '@app/types/settingSchema.ts';
import { isLinux } from '@app/utils/platform.ts';

export const getUISettings = (state: ReturnType<typeof appStore.getState>): SectionProps => {
  return {
    id: 'ui-settings',
    sectionName: 'UI Settings',
    visible: () => !isLinux(),
    groups: [
      {
        id: 'window-controls',
        groupName: 'Window Controls',
        components: [
          {
            id: 'mode',
            type: 'Input',
            inputType: 'number',
            label: 'Window Control Height',
            value: state.windowControlHeight,
            onChange: (windowControlHeight) => state.setWindowControlHeight(windowControlHeight),
          },
        ],
      },
    ],
  } satisfies SectionProps;
};

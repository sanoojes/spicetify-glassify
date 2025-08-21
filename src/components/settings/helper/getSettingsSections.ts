import { getAdvancedSettings } from '@app/components/settings/helper/getAdvancedSettings.tsx';
import { getBackgroundSettings } from '@app/components/settings/helper/getBackgroundSettings.tsx';
import { getPlayerNextCard } from '@app/components/settings/helper/getPlayerNextCard.tsx';
import { getPlayerSettings } from '@app/components/settings/helper/getPlayerSettings.tsx';
import appStore from '@app/store/appStore.ts';
import type { SectionProps } from '@app/types/settingSchema.ts';
import { getUISettings } from './getUISettings.tsx';
import { getUnderMainViewSettings } from './getUnderMainViewSettings.tsx';

export default function getSettingsSections(state = appStore.getState()): SectionProps[] {
  return [
    getBackgroundSettings(state),
    getUISettings(state),
    getPlayerNextCard(state),
    getUnderMainViewSettings(state),
    getPlayerSettings(state),
    getAdvancedSettings(state),
  ];
}

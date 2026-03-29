import { getAdvancedSettings } from "@/components/settings/helper/getAdvancedSettings.tsx";
import { getBackgroundSettings } from "@/components/settings/helper/getBackgroundSettings.tsx";
import { getPlayerNextCard } from "@/components/settings/helper/getPlayerNextCard.tsx";
import { getPlayerSettings } from "@/components/settings/helper/getPlayerSettings.tsx";
import appStore from "@/store/appStore.ts";
import type { SectionProps } from "@/types/settingSchema.ts";
import { getUISettings } from "./getUISettings.tsx";
import { getUnderMainViewSettings } from "./getUnderMainViewSettings.tsx";

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

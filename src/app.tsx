import addPageData from "@/features/addPageData.ts";
import addPlayerData from "@/features/addPlayerData.ts";
import addUMV from "@/features/addUMV.tsx";
import setBackground from "@/features/setBackground.tsx";
import setControls from "@/features/setControls.ts";
import setPlayer from "@/features/setPlaybar.tsx";
import waitForGlobal from "@/utils/dom/waitForGlobal.ts";
import initNotificationSystem from "@/utils/initNotificationSystem.tsx";
import patchIcons from "@/utils/patchIcons.ts";
import { isWindows } from "@/utils/platform.ts";
import addSettings from "@/utils/settings/addSettings.tsx";
import { setupAnalytics } from "./setupAnalytics.ts";

const main = async () => {
  await waitForGlobal(() => Spicetify?.Platform && Spicetify?.React && Spicetify?.ReactDOM);
  await new Promise((res) => Spicetify?.Events?.webpackLoaded?.on(res));

  initNotificationSystem();

  if (isWindows()) setControls();

  patchIcons();

  addPlayerData();
  addPageData();

  addUMV();
  setBackground();
  setPlayer();

  addSettings();

  // setupAnalytics();
};
main();

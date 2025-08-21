import addPageData from "@app/features/addPageData.ts";
import addPlayerData from "@app/features/addPlayerData.ts";
import addUMV from "@app/features/addUMV.tsx";
import setBackground from "@app/features/setBackground.tsx";
import setControls from "@app/features/setControls.ts";
import setPlayer from "@app/features/setPlaybar.tsx";
import waitForGlobal from "@app/utils/dom/waitForGlobal.ts";
import initNotificationSystem from "@app/utils/initNotificationSystem.tsx";
import patchIcons from "@app/utils/patchIcons.ts";
import { isWindows } from "@app/utils/platform.ts";
import addSettings from "@app/utils/settings/addSettings.tsx";

const main = async () => {
  await waitForGlobal(
    () => Spicetify?.Platform && Spicetify?.React && Spicetify?.ReactDOM
  );
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
};
main();

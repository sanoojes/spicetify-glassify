import addPageData from "@app/features/addPageData.ts";
import addPlayerData from "@app/features/addPlayerData.ts";
import waitForGlobal from "@app/utils/dom/waitForGlobal.ts";
import addUMV from "@app/features/addUMV.tsx";
import setBackground from "@app/features/setBackground.tsx";
import addSettings from "@app/utils/settings/addSettings.tsx";
import patchIcons from "@app/utils/patchIcons.ts";
import setPlayer from "@app/features/setPlaybar.tsx";
import initNotificationSystem from "@app/utils/initNotificationSystem.tsx";
import { isWindows } from "@app/utils/platform.ts";
import setControls from "@app/features/setControls.ts";

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

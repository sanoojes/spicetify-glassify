import type { PlayerState } from "@app/store/appStore.ts";
import NextSongCard from "@app/components/player/NextSongCard.tsx";
import appStore from "@app/store/appStore.ts";
import getOrCreateElement from "@app/utils/dom/getOrCreateElement.ts";
import getOrCreateStyle from "@app/utils/dom/getOrCreateStyle.ts";
import waitForElements from "@app/utils/dom/waitForElements.ts";
import React from "react";
import { createRoot, type Root } from "react-dom/client";

let playerElem: HTMLDivElement | null = null;
let hasResizeListener = false;
let nextCardRoot: Root | null = null;

export default function setPlayer(player = appStore.getState().player) {
  if (!playerElem) {
    waitForElements(".Root__now-playing-bar").then((elem) => {
      playerElem = elem as HTMLDivElement;
      setPlayer();
    });
    return;
  }

  applyPlayerClasses(player);
  applyDynamicStyles(player);
  updatePlayerSize(player);

  if (!hasResizeListener) {
    window.addEventListener("resize", () => updatePlayerSize(player));
    hasResizeListener = true;
  }

  renderNextSongCard();
}

function applyPlayerClasses(player: PlayerState) {
  const { isFloating, mode } = player;

  document.body.classList.toggle("player-compact", mode === "compact");
  document.body.classList.toggle(
    "next-playing-on-left",
    player.nextSongCard.position === "left"
  );
  document.body.classList.toggle(
    "next-playing-on-right",
    player.nextSongCard.position === "right"
  );
  document.body.classList.toggle("player-floating", isFloating);
  playerElem?.classList.toggle("floating", isFloating);
}

function applyDynamicStyles(player: PlayerState) {
  const mode = player.mode;
  const style = player[mode === "compact" ? "compactStyle" : "defaultStyle"];
  const {
    height,
    width,
    paddingX,
    borderRadius,
    coverArtRadius,
    sliderHeight,
    bgColor,
    bgOpacity,
    backdropFilter,
  } = style;

  const styleElem = getOrCreateStyle("lucid-player-styles");

  styleElem.textContent = `
:root,
.Root__now-playing-bar {
  --player-height: ${height}px;
  --slider-height: ${sliderHeight}px;
  --player-width: ${width}%;
  --player-padding-x: ${paddingX}px;
  --player-border-radius: ${borderRadius}px;
  --player-image-radius: ${coverArtRadius}px;
  --player-bg-opacity: ${bgOpacity}%;
  --player-bg-color: ${bgColor || `rgba(var(--clr-surface-1-rgb), .7)`};
  --player-blur: ${backdropFilter.blur}px;
  --player-saturate: ${backdropFilter.saturation}%;
  --player-brightness: ${backdropFilter.brightness}%;
  --player-opacity: ${backdropFilter.opacity}%;
  --player-contrast: ${backdropFilter.contrast}%;
}`;
}

function updatePlayerSize(player: PlayerState) {
  if (!playerElem) return;

  const currentWidth = playerElem.offsetWidth;
  document.body.style.setProperty("--player-width", `${currentWidth}px`);
  playerElem.style.setProperty("--width", `${currentWidth}px`);

  const { hideExtraIcon, mode } = player;
  const shouldHideIcons =
    (hideExtraIcon || currentWidth < 1000) && mode === "compact";
  playerElem.classList.toggle("hide-icons", shouldHideIcons);
}
function renderNextSongCard() {
  const show = appStore.getState().player.nextSongCard.show;

  if (!show) {
    if (nextCardRoot) {
      nextCardRoot.unmount();
      nextCardRoot = null;
    }
    return;
  }

  waitForElements(".main-nowPlayingBar-container").then((container) => {
    const rootElem = getOrCreateElement(
      "div",
      "player-next-song-root",
      container
    );
    if (!nextCardRoot) nextCardRoot = createRoot(rootElem);

    nextCardRoot.render(<NextSongCard />);
  });
}

appStore.subscribe((state) => state.player, setPlayer);

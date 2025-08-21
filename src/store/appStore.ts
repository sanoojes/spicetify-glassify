import { merge } from "lodash";
import { combine, persist, subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

// deno-lint-ignore ban-types
type Stringify<T extends string> = T | (string & {}); // just to trick the compiler

type Color = string;
export type CSSFilter = {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  opacity?: number;
  blur?: number;
};

type BackgroundMode = Stringify<"solid" | "static" | "animated">;
type BackgroundImageMode = Stringify<"custom" | "player" | "page">;
export type BackgroundState = {
  mode: BackgroundMode;
  options: {
    // For Animated and Static
    filter: CSSFilter;
    imageMode: BackgroundImageMode;
    imageSrc: string | null;

    // Solid Background
    color: Color;

    // Animated Background
    autoStopAnimation: boolean;
  };
};

type PlayerTypes = Stringify<"compact" | "default">;
export type PlayerStyle = {
  height: number;
  sliderHeight: number;
  width: number; // !! width is in percentage
  bgColor: Color | null; // null for default
  bgOpacity: number;
  paddingX: number;
  borderRadius: number;
  coverArtRadius: number;
  backdropFilter: CSSFilter;
};

export type NextSongCardState = {
  show: boolean;
  height: number;
  gap: number;
  maxWidth: number;
  paddingX: number;
  paddingY: number;
  coverArtSize: number;
  removeNextUp: boolean;
  isFloating: boolean;
  position: Stringify<"left" | "right">;
};
export type PlayerState = {
  mode: PlayerTypes;
  isFloating: boolean;
  hideExtraIcon: boolean;
  defaultStyle: PlayerStyle;
  compactStyle: PlayerStyle;
  nextSongCard: NextSongCardState;
};
type UnderMainViewTypes = Stringify<
  "default" | "playing" | "custom-img" | "custom-color" | "none"
>;
export type UnderMainViewState = {
  type: UnderMainViewTypes;

  isScrolling: boolean;
  isScaling: boolean;

  filter: CSSFilter;
  customUrl: string;

  customColor: Color;
};

export type AppState = {
  bg: BackgroundState;
  player: PlayerState;
  umv: UnderMainViewState;
};

const PLAYER_BG_FILTER = {
  blur: 32,
  saturation: 150,
  brightness: 50,
  contrast: 100,
  opacity: 100,
};

export const DEFAULT_STATE: AppState = {
  bg: {
    mode: "static",
    options: {
      filter: {
        blur: 32,
        saturation: 150,
        contrast: 100,
        brightness: 40,
        opacity: 100,
      },
      color: "#060606",
      imageMode: "player",
      imageSrc: "https://picsum.photos/1920/1080",
      autoStopAnimation: false,
    },
  },
  umv: {
    type: "default",
    isScrolling: false,
    isScaling: true,
    filter: {
      blur: 16,
      saturation: 150,
      contrast: 100,
      brightness: 80,
      opacity: 80,
    },
    customColor: "#060606",
    customUrl: "https://picsum.photos/1920/1080",
  },
  player: {
    mode: "default",
    nextSongCard: {
      show: false,
      isFloating: true,
      gap: 0,
      height: 48,
      maxWidth: 256,
      paddingX: 8,
      paddingY: 8,
      coverArtSize: 32,
      removeNextUp: true,
      position: "left",
    },
    isFloating: true,
    hideExtraIcon: true,
    defaultStyle: {
      height: 80, // in px
      sliderHeight: 4,
      width: 100, // in %
      borderRadius: 24,
      coverArtRadius: 16,
      bgOpacity: 50,
      paddingX: 8,
      backdropFilter: PLAYER_BG_FILTER,
      bgColor: `var(--glass-bg)`,
    },
    compactStyle: {
      height: 64, // in px
      sliderHeight: 4,
      width: 100, // in %
      borderRadius: 8,
      coverArtRadius: 8,
      bgOpacity: 50,
      paddingX: 8,
      backdropFilter: PLAYER_BG_FILTER,
      bgColor: `var(--glass-bg)`,
    },
  },
};

type AppStateSetters = {
  setBg: (bg: Partial<BackgroundState>) => void;
  setBgOptions: (options: Partial<BackgroundState["options"]>) => void;
  setBgFilter: (filter: Partial<BackgroundState["options"]["filter"]>) => void;

  setPlayer: (player: Partial<PlayerState>) => void;
  setPlayerNextCard: (
    nextSongCard: Partial<PlayerState["nextSongCard"]>
  ) => void;
  setPlayerBackdropFilter: (
    mode: PlayerState["mode"],
    filter: Partial<PlayerStyle["backdropFilter"]>
  ) => void;
  setPlayerStyles: (
    mode: PlayerState["mode"],
    styles: Partial<PlayerStyle>
  ) => void;

  setUMV: (umv: Partial<UnderMainViewState>) => void;
  setUMVFilter: (filter: Partial<UnderMainViewState["filter"]>) => void;

  exportConfig: () => string | null;
  importConfig: (config: AppState) => void;
  resetStore: () => void;
};

const appStore = createStore<AppState & AppStateSetters>()(
  persist(
    subscribeWithSelector(
      combine(DEFAULT_STATE, (set, get) => ({
        setBg: (bg) => set({ bg: { ...get().bg, ...bg } }),
        setBgOptions: (options) =>
          set({
            bg: {
              ...get().bg,
              options: { ...get().bg.options, ...options },
            },
          }),
        setBgFilter: (filter) =>
          set({
            bg: {
              ...get().bg,
              options: {
                ...get().bg.options,
                filter: { ...get().bg.options.filter, ...filter },
              },
            },
          }),

        setUMV: (umv) => set({ umv: { ...get().umv, ...umv } }),
        setUMVFilter: (filter) =>
          set({
            umv: {
              ...get().umv,
              filter: { ...get().umv.filter, ...filter },
            },
          }),

        setPlayer: (player) => set({ player: { ...get().player, ...player } }),
        setPlayerNextCard: (nextSongCard) =>
          set({
            player: {
              ...get().player,
              nextSongCard: { ...get().player.nextSongCard, ...nextSongCard },
            },
          }),
        setPlayerBackdropFilter: (mode, filter) => {
          const key = mode === "compact" ? "compactStyle" : "defaultStyle";
          set({
            player: {
              ...get().player,
              [key]: {
                ...get().player[key],
                backdropFilter: {
                  ...get().player[key].backdropFilter,
                  ...filter,
                },
              },
            },
          });
        },
        setPlayerStyles: (mode, styles) => {
          const key = mode === "compact" ? "compactStyle" : "defaultStyle";
          set({
            player: {
              ...get().player,
              [key]: { ...get().player[key], ...styles },
            },
          });
        },

        importConfig: (config) => set(() => merge({}, DEFAULT_STATE, config)),
        exportConfig: () => {
          try {
            const config = JSON.stringify(get(), null, 2);
            return config;
          } catch {
            return null;
          }
        },
        resetStore: () => {
          try {
            set(DEFAULT_STATE);
            localStorage.removeItem("glassify:settings");
          } catch {}
        },
      }))
    ),
    {
      name: "glassify:settings",
      version: 1,
      migrate: (persistedState) => merge(DEFAULT_STATE, persistedState ?? {}),
    }
  )
);

// Patch the store to merge missing fields into existing data.
appStore.getState().importConfig(appStore.getState()); // i wont change versioning
export default appStore;

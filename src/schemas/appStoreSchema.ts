import CSSFilterSchema from "@app/schemas/cssFilterSchema.ts";
import { boundedNumber } from "@app/utils/schema.ts";
import z from "zod";

export const ColorStateSchema = z.object({
  mode: z.enum(["default", "dynamic", "custom"]),
  accentColor: z.string(),
  isTinted: z.boolean(),
  isDark: z.boolean(),
});

export const BodyClassStateSchema = z.object({
  hideHomeHeader: z.boolean(),
  newHome: z.boolean(),
  flexyHome: z.boolean(),
});

export const BackgroundStateSchema = z.object({
  mode: z.enum(["solid", "static", "animated"]),
  options: z.object({
    filter: CSSFilterSchema,
    imageMode: z.enum(["custom", "player", "page"]),
    imageSrc: z.string().nullable(),
    color: z.string(),
    autoStopAnimation: z.boolean(),
  }),
});

export const PlayerStyleSchema = z.object({
  height: boundedNumber({ name: "Player height", min: 0, max: 512 }),
  sliderHeight: boundedNumber({ name: "Slider height", min: 1, max: 512 }),
  width: boundedNumber({ name: "Player width", min: 0, max: 100 }),
  bgColor: z.string().nullable(),
  bgOpacity: boundedNumber({ name: "Background opacity", min: 0, max: 100 }),
  paddingX: boundedNumber({ name: "Horizontal padding", min: 0, max: 256 }),
  borderRadius: boundedNumber({ name: "Border radius", min: 0, max: 256 }),
  coverArtRadius: boundedNumber({ name: "Cover art radius", min: 0, max: 256 }),
  backdropFilter: CSSFilterSchema,
});

export const NextSongCardStateSchema = z.object({
  show: z.boolean(),
  removeNextUp: z.boolean(),
  isFloating: z.boolean(),
  height: boundedNumber({ name: "Next Song Card Height", min: 0, max: 512 }),
  gap: boundedNumber({ name: "Next Song Gap", min: 0, max: 64 }),
  maxWidth: boundedNumber({
    name: "Next Song Card Max Width",
    min: 8,
    max: 1024,
  }),
  coverArtSize: boundedNumber({
    name: "Next Song Card Cover Art Size",
    min: 0,
    max: 512,
  }),
  paddingX: boundedNumber({
    name: "Next Song Card Padding X",
    min: 0,
    max: 256,
  }),
  paddingY: boundedNumber({
    name: "Next Song Card Padding Y",
    min: 0,
    max: 256,
  }),
  position: z.enum(["left", "right"]),
});

export const PlayerStateSchema = z.object({
  mode: z.enum(["compact", "default"]),
  isFloating: z.boolean(),
  hideExtraIcon: z.boolean(),
  defaultStyle: PlayerStyleSchema,
  compactStyle: PlayerStyleSchema,
  nextSongCard: NextSongCardStateSchema,
});
export const UnderMainViewStateSchema = z.object({
  type: z.enum(["default", "playing", "custom-img", "custom-color", "none"]),
  isScrolling: z.boolean(),
  isScaling: z.boolean(),
  filter: CSSFilterSchema,
  customUrl: z.string(),
  customColor: z.string(),
});

export const AppStateSchema = z.object({
  bg: BackgroundStateSchema,
  player: PlayerStateSchema,
  umv: UnderMainViewStateSchema,
});

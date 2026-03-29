import appStore from "@/store/appStore.ts";
import serializeFilters from "@/utils/dom/serializeFilters.ts";
import React, { type FC } from "react";
import { useStore } from "zustand";

const StaticBackground: FC<{ imageSrc: string | null }> = ({ imageSrc }) => {
  const filter = useStore(appStore, (state) => state.bg.options.filter);

  return (
    <div
      className={`bg static`}
      style={{
        backgroundImage: imageSrc ? `url("${imageSrc}")` : "none",
        filter: serializeFilters(filter),
      }}
    />
  );
};

export default StaticBackground;

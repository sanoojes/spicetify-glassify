import appStore from '@app/store/appStore.ts';
import serializeFilters from '@app/utils/dom/serializeFilters.ts';
import { useStore } from 'zustand';
import React from 'react';

const StaticBackground: React.FC<{ imageSrc: string | null }> = ({ imageSrc }) => {
  const filter = useStore(appStore, (state) => state.bg.options.filter);

  return (
    <div
      className={`bg static`}
      style={{
        backgroundImage: imageSrc ? `url("${imageSrc}")` : 'none',
        filter: serializeFilters(filter),
      }}
    />
  );
};

export default StaticBackground;

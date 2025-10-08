import AnimatedBackgroundCanvas from '@app/components/background/AnimatedBackgroundCanvas.tsx';
import StaticBackground from '@app/components/background/StaticBackground.tsx';
import appStore from '@app/store/appStore.ts';
import tempStore from '@app/store/tempStore.ts';
import React, { type FC } from 'react';
import { useStore } from 'zustand';

const Background: FC = () => {
  const mode = useStore(appStore, (state) => state.bg.mode);
  const color = useStore(appStore, (state) => state.bg.options.color);
  const imageMode = useStore(appStore, (state) => state.bg.options.imageMode);
  const customUrl = useStore(appStore, (state) => state.bg.options.imageSrc);
  const npUrl = useStore(tempStore, (state) => state.player?.current?.url);
  const pageImgUrl = useStore(tempStore, (state) => state.pageImg);
  const imageSrc = (() => {
    if (imageMode === 'custom' && customUrl) return customUrl;

    if (imageMode === 'page') {
      const { desktop, cover } = pageImgUrl || {};
      if (desktop) return desktop;
      if (cover) return cover;
    }

    if (npUrl) return npUrl;

    return null;
  })();

  return (
    <div className="bg-wrapper">
      {mode === 'animated' ? (
        <div className="bg animated">
          <AnimatedBackgroundCanvas imageSrc={imageSrc} />
        </div>
      ) : mode === 'solid' ? (
        <div className="bg solid" style={{ backgroundColor: color }}></div>
      ) : (
        <StaticBackground imageSrc={imageSrc} />
      )}
    </div>
  );
};

export default Background;

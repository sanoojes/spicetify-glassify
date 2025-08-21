import tempStore from '@app/store/tempStore.ts';
import debounce from '@app/utils/debounce.ts';
import waitForElements from '@app/utils/dom/waitForElements.ts';
import waitForGlobal from '@app/utils/dom/waitForGlobal.ts';
import getArtworkByPageUrl from '@app/utils/getArtworkByPageUrl.ts';
import { updateCardBgAlpha } from '@app/utils/updateCardBgAlpha.ts';

async function addPageData(history?: Spicetify.PlatformHistory['location']) {
  if (!history) history = await waitForGlobal(() => Spicetify?.Platform?.History?.location);

  if (history.pathname === '/search') {
    const intervalId = setInterval(() => updateCardBgAlpha('.Vn9yz8P5MjIvDT8c0U6w', 0.1), 300);
    setTimeout(() => clearInterval(intervalId), 6000);
  }

  getArtworkByPageUrl(
    history?.pathname ?? Spicetify?.Platform?.History?.location?.pathname ?? '/'
  ).then((img) =>
    tempStore.getState().setPageImg({ cover: img.imageUrl, desktop: img.desktopImageUrl })
  );

  document.body.dataset.pageUrl = history?.pathname ?? '';
}

const observeForPlaylistModal = () => {
  waitForElements('.Root').then((rootElem) => {
    const rootObserver = new MutationObserver(
      debounce(() => {
        const sourceDiv = rootElem.querySelector('.FP_XXx0FMQPJEu3WzfpM') as HTMLDivElement | null;
        if (!sourceDiv) return;

        const styleObserver = new MutationObserver(() => {
          const rgbRegex = /rgb\(\s*((?:\d{1,3}\s*,\s*){2}\d{1,3})\s*\)/;
          const color = sourceDiv.style.backgroundColor.match(rgbRegex)?.[1];
          if (!color || !sourceDiv.parentElement) return;

          sourceDiv.parentElement.style.setProperty('--accent-color', color);
        });

        styleObserver.observe(sourceDiv, { attributes: true });
      }, 300)
    );
    rootObserver.observe(rootElem, { childList: true });
  });
};

observeForPlaylistModal();

waitForGlobal<Spicetify.PlatformHistory>(() => Spicetify?.Platform?.History).then((history) =>
  history.listen((e) => addPageData(e))
);

export default addPageData;

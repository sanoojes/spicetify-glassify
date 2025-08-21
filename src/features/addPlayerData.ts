import tempStore, { type PlayerData } from "@app/store/tempStore.ts";
import waitForGlobal from "@app/utils/dom/waitForGlobal.ts";

async function addPlayerData(playerData?: typeof Spicetify.Player.data) {
  const data =
    playerData ?? (await waitForGlobal(() => Spicetify?.Player?.data));

  const getImageUrl = (item?: typeof data.item | null) => {
    const images = item?.images;
    return (
      images?.[3]?.url ||
      images?.[2]?.url ||
      images?.[1]?.url ||
      images?.[0]?.url ||
      null
    );
  };

  const currentUrl = getImageUrl(data.item);
  if (!currentUrl) return;
  document.body.style.setProperty("--np-img-url", `url("${currentUrl}")`);
  // const currentColors = await getExtractedColors([currentUrl]);
  tempStore.getState().setPlayer({
    current: {
      url: currentUrl,
      // colors: currentColors?.data?.extractedColors?.[0] ?? undefined,
      data: data.item,
    },
  });
  const loadItems = async (items?: (typeof data.item)[]) => {
    return (
      await Promise.all(
        items?.map(async (item) => {
          const url = getImageUrl(item);
          if (!url) return null;
          // const colors = await getExtractedColors([url]);
          return {
            url,
            // colors: colors?.data?.extractedColors?.[0] ?? undefined,
            data: item,
          };
        }) ?? []
      )
    ).filter(Boolean) as PlayerData[];
  };

  const prev = await loadItems(data.previousItems?.slice(-2));
  const next = await loadItems(data.nextItems?.slice(0, 2));

  tempStore.getState().setPlayer({
    prev,
    next,
  });
}

waitForGlobal(() => Spicetify?.Player).then(() =>
  Spicetify.Player.addEventListener("songchange", (e) => addPlayerData(e?.data))
);

waitForGlobal(() => Spicetify?.Platform?.PlayerAPI?._queue?._events).then(
  (events: any) => events?.addListener("queue_update", () => addPlayerData())
);

export default addPlayerData;

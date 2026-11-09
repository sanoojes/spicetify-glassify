/*
 * Current Spotify Home cards place navigation and direct-play controls in
 * overlapping layers. Glassify removes direct play on Home, then routes clicks
 * on otherwise non-interactive card surfaces to the card's real destination.
 */
const CARD_SELECTOR = ".main-card-cardContainer.Card";
const DESTINATION_TYPES = ["playlist", "album", "collection", "show", "episode", "artist"];

function getDestination(card: HTMLElement) {
  const links = [...card.querySelectorAll<HTMLAnchorElement>("a[href]")];

  for (const type of DESTINATION_TYPES) {
    const destination = links.find((link) => {
      const href = link.getAttribute("href") ?? "";
      return href.startsWith(`/${type}/`) || href.startsWith(`spotify:${type}:`);
    });

    if (destination) return destination;
  }

  return links[0];
}

function activateHomeCard(event: MouseEvent) {
  if (
    document.body.dataset.pageUrl !== "/" ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element) || target.closest("a, button")) return;

  const card = target.closest<HTMLElement>(CARD_SELECTOR);
  if (!card) return;

  const destination = getDestination(card);
  const href = destination?.getAttribute("href");
  if (!href) return;

  event.preventDefault();
  event.stopPropagation();
  Spicetify.Platform.History.push(href);
}

export default function enableHomeCardArtworkLinks() {
  document.addEventListener("click", activateHomeCard, true);
}

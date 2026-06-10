import Fuse from "fuse.js";
import { cards, cardImageUrl, cardFullUrl, type Card } from "./cards";
import "./style.css";

const HISTORY_KEY = "tarot_history";
const HISTORY_MAX = 10;

function getHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function pushHistory(cardId: string) {
  const history = getHistory().filter((id) => id !== cardId);
  history.unshift(cardId);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, HISTORY_MAX)));
}

type GroupKey = "major" | "wands" | "cups" | "swords" | "pentacles";

const groups: Record<GroupKey, Card[]> = {
  major:     cards.filter(c => c.number !== null),
  wands:     cards.filter(c => c.id.startsWith("wands-")),
  cups:      cards.filter(c => c.id.startsWith("cups-")),
  swords:    cards.filter(c => c.id.startsWith("swords-")),
  pentacles: cards.filter(c => c.id.startsWith("pentacles-")),
};

const groupLabels: Record<GroupKey, string> = {
  major:     "大アルカナ",
  wands:     "ワンド",
  cups:      "カップ",
  swords:    "剣",
  pentacles: "コイン",
};

const searchIndex = cards.flatMap((card) => [
  { card, term: card.name },
  { card, term: card.name_ja },
  ...card.aliases.map((a) => ({ card, term: a })),
]);

const fuse = new Fuse(searchIndex, {
  keys: ["term"],
  threshold: 0.35,
  includeScore: true,
});

function searchCards(query: string): Card[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  for (const { card } of searchIndex) {
    if (card.aliases.some((a) => a.toLowerCase() === q)) return [card];
  }
  const results = fuse.search(q);
  const seen = new Set<string>();
  return results
    .map((r) => r.item.card)
    .filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
}

function stripRuby(html: string): string {
  return html.replace(/<rt>[^<]*<\/rt>/g, "").replace(/<\/?ruby>/g, "");
}

function renderCard(card: Card): string {
  const numberLabel = card.number !== null
    ? `<span class="card-number-inline">（${card.number}）</span>`
    : "";
  const imgUrl = cardImageUrl(card);
  const fullUrl = cardFullUrl(card);
  return `
    <article class="card-detail">
      <header class="card-header">
        <img class="card-thumb" src="${imgUrl}" alt="${card.name}" data-src="${fullUrl}" />
        <div class="card-titles">
          <h2 class="card-name-ja">${card.name_ja}${numberLabel}</h2>
          <p class="card-name-en">${card.name}</p>
        </div>
      </header>
      <section class="meaning upright">
        <h3>正位置</h3>
        <p class="keywords">${stripRuby(card.upright.keywords_ja)}</p>
        <p class="detail-ja">${stripRuby(card.upright.detail_ja)}</p>
        <p class="detail-en">${card.upright.detail_en}</p>
      </section>
      <section class="meaning reversed">
        <h3>逆位置</h3>
        <p class="keywords">${stripRuby(card.reversed.keywords_ja)}</p>
        <p class="detail-ja">${stripRuby(card.reversed.detail_ja)}</p>
        <p class="detail-en">${card.reversed.detail_en}</p>
      </section>
    </article>
  `;
}

function renderBrowseGrid(group: GroupKey): string {
  return groups[group].map(card => `
    <button class="browse-card" data-id="${card.id}">
      <img src="${cardImageUrl(card)}" alt="${card.name}" loading="lazy" />
      <span>${card.name_ja}</span>
    </button>
  `).join("");
}

// ── DOM ──────────────────────────────────────────────────────────────────────

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <div class="top-bar">
    <h1 class="site-title">タロット辞典</h1>
    <div class="search-wrapper">
      <input
        type="search"
        id="search"
        placeholder="カード名を検索…"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
      <ul id="suggestions" class="suggestions" hidden></ul>
    </div>
    <button id="nav-browse-desktop" class="nav-toggle">一覧</button>
  </div>

  <main id="main">
    <div id="card-view" class="view-container"></div>
    <div id="browse-view" class="view-container" hidden>
      <div class="browse-tabs">
        ${(Object.keys(groupLabels) as GroupKey[]).map((g, i) =>
          `<button class="browse-tab${i === 0 ? " active" : ""}" data-group="${g}">${groupLabels[g]}</button>`
        ).join("")}
      </div>
      <div id="browse-grid" class="browse-grid"></div>
    </div>
  </main>

  <nav class="bottom-nav">
    <button id="nav-search" class="bottom-nav-btn active">検索</button>
    <button id="nav-browse" class="bottom-nav-btn">一覧</button>
  </nav>

  <div id="lightbox" class="lightbox" hidden>
    <img id="lightbox-img" src="" alt="" />
  </div>
  <footer class="attribution">
    Card images: Rider-Waite Tarot (1909), public domain /
    <a href="https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_card_images" target="_blank" rel="noopener">Wikimedia Commons</a>
  </footer>
`;

const searchEl        = app.querySelector<HTMLInputElement>("#search")!;
const suggestionsEl   = app.querySelector<HTMLUListElement>("#suggestions")!;
const cardViewEl      = app.querySelector<HTMLDivElement>("#card-view")!;
const browseViewEl    = app.querySelector<HTMLDivElement>("#browse-view")!;
const browseGridEl    = app.querySelector<HTMLDivElement>("#browse-grid")!;
const browseTabsEl    = app.querySelector<HTMLDivElement>(".browse-tabs")!;
const navSearchBtn    = app.querySelector<HTMLButtonElement>("#nav-search")!;
const navBrowseBtn    = app.querySelector<HTMLButtonElement>("#nav-browse")!;
const navBrowseDesktop = app.querySelector<HTMLButtonElement>("#nav-browse-desktop")!;
const lightboxEl      = app.querySelector<HTMLDivElement>("#lightbox")!;
const lightboxImgEl   = app.querySelector<HTMLImageElement>("#lightbox-img")!;

// ── View switching ────────────────────────────────────────────────────────────

let currentMode: "card" | "browse" = "card";
let currentGroup: GroupKey = "major";

function showView(mode: "card" | "browse") {
  currentMode = mode;
  cardViewEl.hidden = mode !== "card";
  browseViewEl.hidden = mode !== "browse";
  navSearchBtn.classList.toggle("active", mode === "card");
  navBrowseBtn.classList.toggle("active", mode === "browse");
  navBrowseDesktop.textContent = mode === "browse" ? "検索に戻る" : "一覧";
}

function showBrowseGroup(group: GroupKey) {
  currentGroup = group;
  browseGridEl.innerHTML = renderBrowseGrid(group);
  browseTabsEl.querySelectorAll<HTMLButtonElement>(".browse-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.group === group);
  });
  browseGridEl.querySelectorAll<HTMLButtonElement>(".browse-card").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = cards.find(c => c.id === btn.dataset.id);
      if (card) { showCard(card); showView("card"); }
    });
  });
}

browseTabsEl.addEventListener("click", (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>(".browse-tab");
  if (btn?.dataset.group) showBrowseGroup(btn.dataset.group as GroupKey);
});

navSearchBtn.addEventListener("click", () => showView("card"));
navBrowseBtn.addEventListener("click", () => { showView("browse"); showBrowseGroup(currentGroup); });
navBrowseDesktop.addEventListener("click", () => {
  if (currentMode === "browse") showView("card");
  else { showView("browse"); showBrowseGroup(currentGroup); }
});

// ── Card display ──────────────────────────────────────────────────────────────

function showCard(card: Card, addToHistory = true) {
  if (addToHistory) pushHistory(card.id);
  cardViewEl.innerHTML = renderCard(card);

  const thumb = cardViewEl.querySelector<HTMLImageElement>(".card-thumb");
  if (thumb) {
    thumb.addEventListener("click", () => {
      lightboxImgEl.src = thumb.dataset.src!;
      lightboxImgEl.alt = thumb.alt;
      lightboxEl.hidden = false;
    });
  }
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

lightboxEl.addEventListener("click", () => { lightboxEl.hidden = true; });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightboxEl.hidden) lightboxEl.hidden = true;
});

// ── Search & history dropdown ─────────────────────────────────────────────────

let activeIndex = -1;

function populateSuggestions(items: Card[], isHistory = false) {
  if (items.length === 0) { suggestionsEl.hidden = true; return; }
  suggestionsEl.innerHTML = items.slice(0, 6).map((c, i) =>
    `<li><button data-id="${c.id}" data-index="${i}">
      ${isHistory ? `<span class="suggestion-hint">履歴</span>` : ""}
      ${c.name_ja} <span>${c.name}</span>
    </button></li>`
  ).join("");
  suggestionsEl.hidden = false;
  activeIndex = -1;

  suggestionsEl.querySelectorAll<HTMLButtonElement>("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = cards.find(c => c.id === btn.dataset.id);
      if (card) {
        searchEl.value = "";
        suggestionsEl.hidden = true;
        showCard(card);
        showView("card");
      }
    });
  });
}

function showHistoryDropdown() {
  const history = getHistory()
    .map(id => cards.find(c => c.id === id))
    .filter((c): c is Card => !!c);
  populateSuggestions(history, true);
}

searchEl.addEventListener("focus", () => {
  if (!searchEl.value.trim()) showHistoryDropdown();
});

searchEl.addEventListener("input", () => {
  const q = searchEl.value;
  if (!q.trim()) { showHistoryDropdown(); return; }
  const results = searchCards(q);
  if (results.length === 0) { suggestionsEl.hidden = true; return; }
  populateSuggestions(results);
});

function setActive(index: number) {
  activeIndex = index;
  suggestionsEl.querySelectorAll<HTMLButtonElement>("button").forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.index) === activeIndex);
  });
}

searchEl.addEventListener("keydown", (e) => {
  const total = suggestionsEl.querySelectorAll("button").length;
  if (e.key === "Escape") {
    suggestionsEl.hidden = true;
    activeIndex = -1;
  } else if (e.key === "ArrowDown" && activeIndex < total - 1) {
    e.preventDefault();
    setActive(activeIndex + 1);
  } else if (e.key === "ArrowUp" && activeIndex > -1) {
    e.preventDefault();
    setActive(activeIndex - 1);
  } else if (e.key === "Enter" && !suggestionsEl.hidden) {
    e.preventDefault();
    const i = activeIndex >= 0 ? activeIndex : 0;
    const target = suggestionsEl.querySelector<HTMLButtonElement>(`button[data-index="${i}"]`)!;
    const card = cards.find(c => c.id === target.dataset.id)!;
    searchEl.value = "";
    suggestionsEl.hidden = true;
    activeIndex = -1;
    showCard(card);
    showView("card");
  }
});

document.addEventListener("click", (e) => {
  if (!app.querySelector(".search-wrapper")!.contains(e.target as Node)) {
    suggestionsEl.hidden = true;
  }
});

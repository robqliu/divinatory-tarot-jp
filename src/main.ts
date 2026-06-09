import Fuse from "fuse.js";
import { cards, type Card } from "./cards";
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

  // Exact alias match first
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
  return `
    <article class="card-detail">
      <header class="card-header">
        <span class="card-number">${card.number !== null ? card.number : "—"}</span>
        <div class="card-titles">
          <h2 class="card-name-ja">${card.name_ja}</h2>
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

function renderHistory(): string {
  const history = getHistory();
  if (history.length === 0) return "";

  const items = history
    .map((id) => {
      const card = cards.find((c) => c.id === id);
      if (!card) return "";
      return `<button class="history-item" data-id="${card.id}">${card.name_ja} <span>${card.name}</span></button>`;
    })
    .filter(Boolean)
    .join("");

  return `<div class="history"><p class="history-label">最近の検索</p><div class="history-items">${items}</div></div>`;
}

function showCard(card: Card, addToHistory = true) {
  if (addToHistory) pushHistory(card.id);
  resultsEl.innerHTML = renderCard(card);
  historyEl.innerHTML = renderHistory();
  bindHistoryButtons();

}

function bindHistoryButtons() {
  historyEl.querySelectorAll<HTMLButtonElement>(".history-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = cards.find((c) => c.id === btn.dataset.id);
      if (card) showCard(card, false);
    });
  });
}

// DOM
const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <div class="container">
    <header class="site-header">
      <h1>タロット辞典</h1>
    </header>
    <div class="search-wrapper">
      <input
        type="search"
        id="search"
        placeholder="カード名を検索… (例: 0, fool, 愚者, 17)"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
      <ul id="suggestions" class="suggestions" hidden></ul>
    </div>
    <div id="history"></div>
    <div id="results"></div>
  </div>
`;

const searchEl = app.querySelector<HTMLInputElement>("#search")!;
const suggestionsEl = app.querySelector<HTMLUListElement>("#suggestions")!;
const resultsEl = app.querySelector<HTMLDivElement>("#results")!;
const historyEl = app.querySelector<HTMLDivElement>("#history")!;

historyEl.innerHTML = renderHistory();
bindHistoryButtons();

searchEl.addEventListener("input", () => {
  const q = searchEl.value;
  if (!q.trim()) {
    suggestionsEl.hidden = true;
    suggestionsEl.innerHTML = "";
    return;
  }

  const results = searchCards(q);
  if (results.length === 0) {
    suggestionsEl.hidden = true;
    return;
  }

  suggestionsEl.innerHTML = results
    .slice(0, 6)
    .map(
      (c, i) =>
        `<li><button data-id="${c.id}" data-index="${i}">${c.name_ja} <span>${c.name}</span></button></li>`
    )
    .join("");
  suggestionsEl.hidden = false;
  activeIndex = -1;

  suggestionsEl.querySelectorAll<HTMLButtonElement>("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = cards.find((c) => c.id === btn.dataset.id);
      if (card) {
        searchEl.value = "";
        suggestionsEl.hidden = true;
        showCard(card);
      }
    });
  });
});

let activeIndex = -1;

function setActive(index: number) {
  activeIndex = index;
  suggestionsEl.querySelectorAll<HTMLButtonElement>("button").forEach((btn) => {
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
    const card = cards.find((c) => c.id === target.dataset.id)!;
    searchEl.value = "";
    suggestionsEl.hidden = true;
    activeIndex = -1;
    showCard(card);
  }
});

document.addEventListener("click", (e) => {
  if (!app.querySelector(".search-wrapper")!.contains(e.target as Node)) {
    suggestionsEl.hidden = true;
  }
});

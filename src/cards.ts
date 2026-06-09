export interface CardMeaning {
  keywords_ja: string;
  detail_ja: string;
  detail_en: string;
}

export interface Card {
  id: string;
  number: number | null;
  name: string;
  name_ja: string;
  aliases: string[];
  upright: CardMeaning;
  reversed: CardMeaning;
}

const WIKIMEDIA = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/";

const majorFilenames: Record<string, string> = {
  "fool":             "RWS_Tarot_00_Fool.jpg",
  "magician":         "RWS_Tarot_01_Magician.jpg",
  "high-priestess":   "RWS_Tarot_02_High_Priestess.jpg",
  "empress":          "RWS_Tarot_03_Empress.jpg",
  "emperor":          "RWS_Tarot_04_Emperor.jpg",
  "hierophant":       "RWS_Tarot_05_Hierophant.jpg",
  "lovers":           "RWS_Tarot_06_Lovers.jpg",
  "chariot":          "RWS_Tarot_07_Chariot.jpg",
  "strength":         "RWS_Tarot_08_Strength.jpg",
  "hermit":           "RWS_Tarot_09_Hermit.jpg",
  "wheel-of-fortune": "RWS_Tarot_10_Wheel_of_Fortune.jpg",
  "justice":          "RWS_Tarot_11_Justice.jpg",
  "hanged-man":       "RWS_Tarot_12_Hanged_Man.jpg",
  "death":            "RWS_Tarot_13_Death.jpg",
  "temperance":       "RWS_Tarot_14_Temperance.jpg",
  "devil":            "RWS_Tarot_15_Devil.jpg",
  "tower":            "RWS_Tarot_16_Tower.jpg",
  "star":             "RWS_Tarot_17_Star.jpg",
  "moon":             "RWS_Tarot_18_Moon.jpg",
  "sun":              "RWS_Tarot_19_Sun.jpg",
  "judgement":        "RWS_Tarot_20_Judgement.jpg",
  "world":            "RWS_Tarot_21_World.jpg",
};

const suitPrefix: Record<string, string> = {
  wands: "Wands", cups: "Cups", swords: "Swords", pentacles: "Pents",
};

const rankNum: Record<string, string> = {
  ace: "01", "2": "02", "3": "03", "4": "04", "5": "05",
  "6": "06", "7": "07", "8": "08", "9": "09", "10": "10",
  page: "11", knight: "12", queen: "13", king: "14",
};

export function cardImageUrl(card: Card): string {
  if (majorFilenames[card.id]) return WIKIMEDIA + majorFilenames[card.id];
  const [suit, rank] = card.id.split("-");
  return WIKIMEDIA + suitPrefix[suit] + rankNum[rank] + ".jpg";
}

import { minorArcana } from "./minor-arcana";

const majorArcana: Card[] = [
  {
    id: "fool",
    number: 0,
    name: "The Fool",
    name_ja: "愚者",
    aliases: ["0", "fool", "愚者", "ぐしゃ"],
    upright: {
      keywords_ja: "自由、新しい始まり、冒険",
      detail_ja: "<ruby>無限<rt>むげん</rt></ruby>の<ruby>可能性<rt>かのうせい</rt></ruby>を<ruby>持<rt>も</rt></ruby>つ<ruby>新<rt>あたら</rt></ruby>しい<ruby>旅<rt>たび</rt></ruby>の<ruby>始<rt>はじ</rt></ruby>まりを<ruby>表<rt>あらわ</rt></ruby>します。<ruby>純粋<rt>じゅんすい</rt></ruby>な<ruby>心<rt>こころ</rt></ruby>で<ruby>未知<rt>みち</rt></ruby>の<ruby>世界<rt>せかい</rt></ruby>へ<ruby>踏<rt>ふ</rt></ruby>み<ruby>出<rt>だ</rt></ruby>す<ruby>勇気<rt>ゆうき</rt></ruby>と<ruby>自由<rt>じゆう</rt></ruby>を<ruby>象徴<rt>しょうちょう</rt></ruby>します。",
      detail_en: "New beginnings, innocence, spontaneity, a free spirit setting out on a new adventure with unlimited potential.",
    },
    reversed: {
      keywords_ja: "無責任、無謀、向こう見ず",
      detail_ja: "<ruby>準備<rt>じゅんび</rt></ruby>なしの<ruby>無謀<rt>むぼう</rt></ruby>な<ruby>行動<rt>こうどう</rt></ruby>や、<ruby>無責任<rt>むせきにん</rt></ruby>さを<ruby>警告<rt>けいこく</rt></ruby>します。<ruby>リスク<rt>りすく</rt></ruby>を<ruby>軽視<rt>けいし</rt></ruby>している<ruby>状態<rt>じょうたい</rt></ruby>かもしれません。",
      detail_en: "Recklessness, risk-taking without preparation, naivety leading to poor decisions.",
    },
  },
  {
    id: "magician",
    number: 1,
    name: "The Magician",
    name_ja: "魔術師",
    aliases: ["1", "magician", "魔術師", "まじゅつし"],
    upright: {
      keywords_ja: "意志、創造力、技術",
      detail_ja: "すべての<ruby>道具<rt>どうぐ</rt></ruby>を<ruby>手<rt>て</rt></ruby>にした<ruby>魔術師<rt>まじゅつし</rt></ruby>は、<ruby>強<rt>つよ</rt></ruby>い<ruby>意志<rt>いし</rt></ruby>と<ruby>技術<rt>ぎじゅつ</rt></ruby>で<ruby>望<rt>のぞ</rt></ruby>む<ruby>現実<rt>げんじつ</rt></ruby>を<ruby>作<rt>つく</rt></ruby>り<ruby>出<rt>だ</rt></ruby>せることを<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Manifestation, resourcefulness, power. You have all the tools you need to succeed.",
    },
    reversed: {
      keywords_ja: "詐欺、操作、才能の無駄遣い",
      detail_ja: "<ruby>才能<rt>さいのう</rt></ruby>を<ruby>悪<rt>わる</rt></ruby>い<ruby>目的<rt>もくてき</rt></ruby>に<ruby>使<rt>つか</rt></ruby>ったり、<ruby>力<rt>ちから</rt></ruby>を<ruby>発揮<rt>はっき</rt></ruby>できていない<ruby>状態<rt>じょうたい</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。",
      detail_en: "Manipulation, poor planning, untapped talents going to waste.",
    },
  },
  {
    id: "high-priestess",
    number: 2,
    name: "The High Priestess",
    name_ja: "女教皇",
    aliases: ["2", "high priestess", "女教皇", "にょきょうこう", "priestess"],
    upright: {
      keywords_ja: "直感、神秘、潜在意識",
      detail_ja: "<ruby>内<rt>うち</rt></ruby>なる<ruby>知恵<rt>ちえ</rt></ruby>と<ruby>直感<rt>ちょっかん</rt></ruby>に<ruby>従<rt>したが</rt></ruby>うことを<ruby>促<rt>うなが</rt></ruby>します。<ruby>表面<rt>ひょうめん</rt></ruby>に<ruby>見<rt>み</rt></ruby>えないものに<ruby>目<rt>め</rt></ruby>を<ruby>向<rt>む</rt></ruby>けてください。",
      detail_en: "Intuition, sacred knowledge, divine femininity, the subconscious mind.",
    },
    reversed: {
      keywords_ja: "秘密、直感を無視する、表面的",
      detail_ja: "<ruby>自分<rt>じぶん</rt></ruby>の<ruby>直感<rt>ちょっかん</rt></ruby>を<ruby>信<rt>しん</rt></ruby>じられず、<ruby>秘密<rt>ひみつ</rt></ruby>が<ruby>隠<rt>かく</rt></ruby>されている<ruby>状態<rt>じょうたい</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Secrets, disconnected from intuition, information withheld.",
    },
  },
  {
    id: "empress",
    number: 3,
    name: "The Empress",
    name_ja: "女帝",
    aliases: ["3", "empress", "女帝", "にょてい"],
    upright: {
      keywords_ja: "自然、豊かさ、創造、母性",
      detail_ja: "<ruby>豊<rt>ゆた</rt></ruby>かな<ruby>自然<rt>しぜん</rt></ruby>と<ruby>母性<rt>ぼせい</rt></ruby>の<ruby>力<rt>ちから</rt></ruby>を<ruby>象徴<rt>しょうちょう</rt></ruby>します。<ruby>愛情<rt>あいじょう</rt></ruby>と<ruby>豊かさ<rt>ゆたかさ</rt></ruby>が<ruby>あふれる<rt>あふれる</rt></ruby><ruby>時期<rt>じき</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。",
      detail_en: "Femininity, beauty, nature, nurturing, abundance, fertility.",
    },
    reversed: {
      keywords_ja: "依存、過保護、創造性の阻害",
      detail_ja: "<ruby>過<rt>か</rt></ruby>ぎた<ruby>依存<rt>いぞん</rt></ruby>や<ruby>過保護<rt>かほご</rt></ruby>、または<ruby>自分<rt>じぶん</rt></ruby>の<ruby>創造力<rt>そうぞうりょく</rt></ruby>が<ruby>発揮<rt>はっき</rt></ruby>できていない<ruby>状態<rt>じょうたい</rt></ruby>です。",
      detail_en: "Creative block, dependence, smothering, lack of growth.",
    },
  },
  {
    id: "emperor",
    number: 4,
    name: "The Emperor",
    name_ja: "皇帝",
    aliases: ["4", "emperor", "皇帝", "こうてい"],
    upright: {
      keywords_ja: "安定、秩序、権威、構造",
      detail_ja: "<ruby>強<rt>つよ</rt></ruby>い<ruby>指導力<rt>しどうりょく</rt></ruby>と<ruby>秩序<rt>ちつじょ</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。<ruby>規律<rt>きりつ</rt></ruby>と<ruby>構造<rt>こうぞう</rt></ruby>によって<ruby>安定<rt>あんてい</rt></ruby>した<ruby>基盤<rt>きばん</rt></ruby>を<ruby>築<rt>きず</rt></ruby>きます。",
      detail_en: "Authority, establishment, structure, a father figure providing stability and order.",
    },
    reversed: {
      keywords_ja: "支配、横暴、柔軟性のなさ",
      detail_ja: "<ruby>権力<rt>けんりょく</rt></ruby>の<ruby>乱用<rt>らんよう</rt></ruby>や<ruby>頑固<rt>がんこ</rt></ruby>さ、<ruby>支配的<rt>しはいてき</rt></ruby>な<ruby>態度<rt>たいど</rt></ruby>を<ruby>警告<rt>けいこく</rt></ruby>します。",
      detail_en: "Domination, excessive control, rigidity, inflexibility.",
    },
  },
  {
    id: "hierophant",
    number: 5,
    name: "The Hierophant",
    name_ja: "教皇",
    aliases: ["5", "hierophant", "教皇", "きょうこう", "pope"],
    upright: {
      keywords_ja: "教育、信念、伝統、慣習",
      detail_ja: "<ruby>伝統<rt>でんとう</rt></ruby>的な<ruby>価値観<rt>かちかん</rt></ruby>と<ruby>社会<rt>しゃかい</rt></ruby>の<ruby>規範<rt>きはん</rt></ruby>を<ruby>象徴<rt>しょうちょう</rt></ruby>します。<ruby>精神的<rt>せいしんてき</rt></ruby>な<ruby>指導者<rt>しどうしゃ</rt></ruby>や<ruby>教育<rt>きょういく</rt></ruby>の<ruby>場<rt>ば</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>すこともあります。",
      detail_en: "Tradition, conformity, morality, ethics, spiritual guidance, institutions.",
    },
    reversed: {
      keywords_ja: "反抗、自分だけの信念、因習打破",
      detail_ja: "<ruby>既存<rt>きぞん</rt></ruby>の<ruby>ルール<rt>るーる</rt></ruby>や<ruby>制度<rt>せいど</rt></ruby>への<ruby>反抗<rt>はんこう</rt></ruby>、<ruby>自分<rt>じぶん</rt></ruby>だけの<ruby>道<rt>みち</rt></ruby>を<ruby>歩<rt>ある</rt></ruby>む<ruby>姿勢<rt>しせい</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Personal beliefs, freedom, challenging the status quo, unconventional.",
    },
  },
  {
    id: "lovers",
    number: 6,
    name: "The Lovers",
    name_ja: "恋人",
    aliases: ["6", "lovers", "恋人", "こいびと"],
    upright: {
      keywords_ja: "愛、関係、選択、調和",
      detail_ja: "<ruby>深<rt>ふか</rt></ruby>い<ruby>愛<rt>あい</rt></ruby>の<ruby>絆<rt>きずな</rt></ruby>と<ruby>重要<rt>じゅうよう</rt></ruby>な<ruby>選択<rt>せんたく</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。<ruby>価値観<rt>かちかん</rt></ruby>に<ruby>基<rt>もと</rt></ruby>づいた<ruby>決断<rt>けつだん</rt></ruby>が<ruby>求<rt>もと</rt></ruby>められます。",
      detail_en: "Love, harmony, relationships, values alignment, choices.",
    },
    reversed: {
      keywords_ja: "不和、誤った選択、価値観のズレ",
      detail_ja: "<ruby>関係<rt>かんけい</rt></ruby>の<ruby>不調和<rt>ふちょうわ</rt></ruby>や<ruby>価値観<rt>かちかん</rt></ruby>のずれ、<ruby>誘惑<rt>ゆうわく</rt></ruby>に<ruby>負<rt>ま</rt></ruby>けた<ruby>選択<rt>せんたく</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Disharmony, imbalance, misalignment of values, poor choices.",
    },
  },
  {
    id: "chariot",
    number: 7,
    name: "The Chariot",
    name_ja: "戦車",
    aliases: ["7", "chariot", "戦車", "せんしゃ"],
    upright: {
      keywords_ja: "勝利、意志の力、自制心",
      detail_ja: "<ruby>強<rt>つよ</rt></ruby>い<ruby>意志<rt>いし</rt></ruby>と<ruby>自制心<rt>じせいしん</rt></ruby>で<ruby>困難<rt>こんなん</rt></ruby>を<ruby>乗<rt>の</rt></ruby>り<ruby>越<rt>こ</rt></ruby>え、<ruby>勝利<rt>しょうり</rt></ruby>を<ruby>つかむ<rt>つかむ</rt></ruby>ことを<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Control, willpower, success, determination, assertion.",
    },
    reversed: {
      keywords_ja: "方向を見失う、自制のなさ",
      detail_ja: "<ruby>感情<rt>かんじょう</rt></ruby>に<ruby>流<rt>なが</rt></ruby>され、<ruby>目標<rt>もくひょう</rt></ruby>を<ruby>見失<rt>みうしな</rt></ruby>った<ruby>状態<rt>じょうたい</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。",
      detail_en: "Lack of control, aggression, obstacles, lack of direction.",
    },
  },
  {
    id: "strength",
    number: 8,
    name: "Strength",
    name_ja: "力",
    aliases: ["8", "strength", "力", "ちから"],
    upright: {
      keywords_ja: "勇気、忍耐、内なる力",
      detail_ja: "<ruby>暴力<rt>ぼうりょく</rt></ruby>ではなく<ruby>愛<rt>あい</rt></ruby>と<ruby>穏<rt>おだ</rt></ruby>やかさで<ruby>困難<rt>こんなん</rt></ruby>を<ruby>乗<rt>の</rt></ruby>り<ruby>越<rt>こ</rt></ruby>える<ruby>内<rt>うち</rt></ruby>なる<ruby>強<rt>つよ</rt></ruby>さを<ruby>表<rt>あらわ</rt></ruby>します。",
      detail_en: "Strength, courage, persuasion, influence, compassion.",
    },
    reversed: {
      keywords_ja: "自信のなさ、弱さ、疑念",
      detail_ja: "<ruby>内<rt>うち</rt></ruby>なる<ruby>力<rt>ちから</rt></ruby>を<ruby>信<rt>しん</rt></ruby>じられず、<ruby>恐怖<rt>きょうふ</rt></ruby>や<ruby>疑念<rt>ぎねん</rt></ruby>に<ruby>支配<rt>しはい</rt></ruby>されている<ruby>状態<rt>じょうたい</rt></ruby>です。",
      detail_en: "Self-doubt, weakness, lack of confidence, insecurity.",
    },
  },
  {
    id: "hermit",
    number: 9,
    name: "The Hermit",
    name_ja: "隠者",
    aliases: ["9", "hermit", "隠者", "いんじゃ"],
    upright: {
      keywords_ja: "孤独、内省、探求",
      detail_ja: "<ruby>一人<rt>ひとり</rt></ruby>で<ruby>静<rt>しず</rt></ruby>かに<ruby>自己<rt>じこ</rt></ruby>と<ruby>向<rt>む</rt></ruby>き<ruby>合<rt>あ</rt></ruby>い、<ruby>真実<rt>しんじつ</rt></ruby>を<ruby>求<rt>もと</rt></ruby>める<ruby>時期<rt>じき</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Soul searching, introspection, being alone, inner guidance.",
    },
    reversed: {
      keywords_ja: "孤立、引きこもり、孤独を恐れる",
      detail_ja: "<ruby>孤立<rt>こりつ</rt></ruby>を<ruby>恐<rt>おそ</rt></ruby>れるか、<ruby>逆<rt>ぎゃく</rt></ruby>に<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>孤独<rt>こどく</rt></ruby>から<ruby>逃<rt>に</rt></ruby>げている<ruby>状態<rt>じょうたい</rt></ruby>です。",
      detail_en: "Isolation, loneliness, withdrawal, rejection of inner guidance.",
    },
  },
  {
    id: "wheel-of-fortune",
    number: 10,
    name: "Wheel of Fortune",
    name_ja: "運命の輪",
    aliases: ["10", "wheel", "wheel of fortune", "運命の輪", "うんめいのわ", "運命", "うんめい"],
    upright: {
      keywords_ja: "幸運、転機、運命、循環",
      detail_ja: "<ruby>人生<rt>じんせい</rt></ruby>の<ruby>転機<rt>てんき</rt></ruby>と<ruby>変化<rt>へんか</rt></ruby>の<ruby>時<rt>とき</rt></ruby>。<ruby>物事<rt>ものごと</rt></ruby>は<ruby>常<rt>つね</rt></ruby>に<ruby>循環<rt>じゅんかん</rt></ruby>しており、<ruby>幸運<rt>こううん</rt></ruby>が<ruby>訪<rt>おとず</rt></ruby>れる<ruby>時期<rt>じき</rt></ruby>です。",
      detail_en: "Good luck, karma, life cycles, destiny, a turning point.",
    },
    reversed: {
      keywords_ja: "不運、抵抗、悪循環",
      detail_ja: "<ruby>変化<rt>へんか</rt></ruby>に<ruby>抵抗<rt>ていこう</rt></ruby>したり、<ruby>悪<rt>わる</rt></ruby>い<ruby>流<rt>なが</rt></ruby>れが<ruby>続<rt>つづ</rt></ruby>いている<ruby>状態<rt>じょうたい</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Bad luck, resistance to change, breaking cycles.",
    },
  },
  {
    id: "justice",
    number: 11,
    name: "Justice",
    name_ja: "正義",
    aliases: ["11", "justice", "正義", "せいぎ"],
    upright: {
      keywords_ja: "真実、公正、法律、因果応報",
      detail_ja: "<ruby>公平<rt>こうへい</rt></ruby>な<ruby>判断<rt>はんだん</rt></ruby>と<ruby>因果応報<rt>いんがおうほう</rt></ruby>の<ruby>法則<rt>ほうそく</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。<ruby>行動<rt>こうどう</rt></ruby>には<ruby>必<rt>かなら</rt></ruby>ず<ruby>結果<rt>けっか</rt></ruby>が<ruby>伴<rt>ともな</rt></ruby>います。",
      detail_en: "Justice, fairness, truth, cause and effect.",
    },
    reversed: {
      keywords_ja: "不公平、嘘、責任逃れ",
      detail_ja: "<ruby>不正直<rt>ふしょうじき</rt></ruby>さや<ruby>不公平<rt>ふこうへい</rt></ruby>な<ruby>状況<rt>じょうきょう</rt></ruby>、<ruby>責任<rt>せきにん</rt></ruby>を<ruby>逃<rt>に</rt></ruby>げようとする<ruby>姿勢<rt>しせい</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Unfairness, lack of accountability, dishonesty.",
    },
  },
  {
    id: "hanged-man",
    number: 12,
    name: "The Hanged Man",
    name_ja: "吊るされた男",
    aliases: ["12", "hanged man", "hanged", "吊るされた男", "つるされたおとこ", "吊り人", "つりびと"],
    upright: {
      keywords_ja: "立ち止まる、新しい見方、手放す",
      detail_ja: "<ruby>自発的<rt>じはつてき</rt></ruby>に<ruby>立<rt>た</rt></ruby>ち<ruby>止<rt>と</rt></ruby>まり、<ruby>別<rt>べつ</rt></ruby>の<ruby>角度<rt>かくど</rt></ruby>から<ruby>物事<rt>ものごと</rt></ruby>を<ruby>見<rt>み</rt></ruby>ることで<ruby>新<rt>あたら</rt></ruby>しい<ruby>気<rt>き</rt></ruby>づきが<ruby>得<rt>え</rt></ruby>られます。",
      detail_en: "Pause, surrender, letting go, new perspectives.",
    },
    reversed: {
      keywords_ja: "停滞、遅れ、無駄な犠牲",
      detail_ja: "<ruby>無駄<rt>むだ</rt></ruby>な<ruby>犠牲<rt>ぎせい</rt></ruby>を<ruby>払<rt>はら</rt></ruby>ったり、<ruby>前進<rt>ぜんしん</rt></ruby>できずに<ruby>停滞<rt>ていたい</rt></ruby>している<ruby>状況<rt>じょうきょう</rt></ruby>です。",
      detail_en: "Delays, resistance, stalling, futile sacrifice.",
    },
  },
  {
    id: "death",
    number: 13,
    name: "Death",
    name_ja: "死神",
    aliases: ["13", "death", "死神", "しにがみ"],
    upright: {
      keywords_ja: "終わりと始まり、変化、移行",
      detail_ja: "<ruby>文字通<rt>もじどお</rt></ruby>りの<ruby>死<rt>し</rt></ruby>ではなく、<ruby>古<rt>ふる</rt></ruby>いものの<ruby>終<rt>お</rt></ruby>わりと<ruby>新<rt>あたら</rt></ruby>しいものの<ruby>誕生<rt>たんじょう</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。",
      detail_en: "Endings, change, transformation, transition.",
    },
    reversed: {
      keywords_ja: "変化への抵抗、停滞、執着",
      detail_ja: "<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>変化<rt>へんか</rt></ruby>に<ruby>抵抗<rt>ていこう</rt></ruby>し、<ruby>過去<rt>かこ</rt></ruby>に<ruby>執着<rt>しゅうちゃく</rt></ruby>している<ruby>状態<rt>じょうたい</rt></ruby>です。",
      detail_en: "Resistance to change, inability to move on, clinging to the past.",
    },
  },
  {
    id: "temperance",
    number: 14,
    name: "Temperance",
    name_ja: "節制",
    aliases: ["14", "temperance", "節制", "せっせい"],
    upright: {
      keywords_ja: "バランス、忍耐、調和、節度",
      detail_ja: "<ruby>極端<rt>きょくたん</rt></ruby>に<ruby>走<rt>はし</rt></ruby>らず、<ruby>穏<rt>おだ</rt></ruby>やかに<ruby>バランス<rt>ばらんす</rt></ruby>を<ruby>保<rt>たも</rt></ruby>ちながら<ruby>物事<rt>ものごと</rt></ruby>を<ruby>進<rt>すす</rt></ruby>めることの<ruby>大切<rt>たいせつ</rt></ruby>さを<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Balance, moderation, patience, purpose.",
    },
    reversed: {
      keywords_ja: "バランスの崩れ、過剰、不節制",
      detail_ja: "<ruby>過剰<rt>かじょう</rt></ruby>なものや<ruby>バランス<rt>ばらんす</rt></ruby>の<ruby>崩れ<rt>くずれ</rt></ruby>た<ruby>生活<rt>せいかつ</rt></ruby>、<ruby>極端<rt>きょくたん</rt></ruby>な<ruby>行動<rt>こうどう</rt></ruby>を<ruby>警告<rt>けいこく</rt></ruby>します。",
      detail_en: "Imbalance, excess, lack of long-term vision.",
    },
  },
  {
    id: "devil",
    number: 15,
    name: "The Devil",
    name_ja: "悪魔",
    aliases: ["15", "devil", "悪魔", "あくま"],
    upright: {
      keywords_ja: "依存、誘惑、束縛、物質主義",
      detail_ja: "<ruby>自分<rt>じぶん</rt></ruby>を<ruby>縛<rt>しば</rt></ruby>る<ruby>恐怖<rt>きょうふ</rt></ruby>や<ruby>依存<rt>いぞん</rt></ruby>、<ruby>物質的<rt>ぶっしつてき</rt></ruby>な<ruby>執着<rt>しゅうちゃく</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。<ruby>多<rt>おお</rt></ruby>くは<ruby>自ら<rt>みずから</rt></ruby>が<ruby>作<rt>つく</rt></ruby>った<ruby>鎖<rt>くさり</rt></ruby>です。",
      detail_en: "Shadow self, attachment, addiction, restriction, sexuality.",
    },
    reversed: {
      keywords_ja: "自由、解放、束縛からの脱出",
      detail_ja: "<ruby>依存<rt>いぞん</rt></ruby>や<ruby>束縛<rt>そくばく</rt></ruby>から<ruby>解放<rt>かいほう</rt></ruby>されつつある<ruby>状態<rt>じょうたい</rt></ruby>、または<ruby>そこ<rt>そこ</rt></ruby>から<ruby>抜<rt>ぬ</rt></ruby>け<ruby>出<rt>だ</rt></ruby>す<ruby>可能性<rt>かのうせい</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Releasing limiting beliefs, exploring dark thoughts, detachment.",
    },
  },
  {
    id: "tower",
    number: 16,
    name: "The Tower",
    name_ja: "塔",
    aliases: ["16", "tower", "塔", "とう"],
    upright: {
      keywords_ja: "突然の変化、崩壊、気づき",
      detail_ja: "<ruby>突然<rt>とつぜん</rt></ruby>の<ruby>破壊<rt>はかい</rt></ruby>的な<ruby>変化<rt>へんか</rt></ruby>が<ruby>古<rt>ふる</rt></ruby>い<ruby>構造<rt>こうぞう</rt></ruby>を<ruby>崩<rt>くず</rt></ruby>し、<ruby>真実<rt>しんじつ</rt></ruby>を<ruby>明<rt>あき</rt></ruby>らかにします。",
      detail_en: "Sudden change, upheaval, chaos, revelation, awakening.",
    },
    reversed: {
      keywords_ja: "恐怖、先延ばし、危機を避ける",
      detail_ja: "<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>変化<rt>へんか</rt></ruby>を<ruby>先延<rt>さきのば</rt></ruby>しにし、<ruby>崩壊<rt>ほうかい</rt></ruby>を<ruby>恐<rt>おそ</rt></ruby>れて<ruby>動<rt>うご</rt></ruby>けない<ruby>状態<rt>じょうたい</rt></ruby>です。",
      detail_en: "Personal transformation, fear of change, averting disaster.",
    },
  },
  {
    id: "star",
    number: 17,
    name: "The Star",
    name_ja: "星",
    aliases: ["17", "star", "星", "ほし"],
    upright: {
      keywords_ja: "希望、再生、信念、インスピレーション",
      detail_ja: "<ruby>試練<rt>しれん</rt></ruby>の<ruby>後<rt>あと</rt></ruby>に<ruby>訪<rt>おとず</rt></ruby>れる<ruby>希望<rt>きぼう</rt></ruby>の<ruby>光<rt>ひかり</rt></ruby>。<ruby>心<rt>こころ</rt></ruby>を<ruby>癒<rt>いや</rt></ruby>し、<ruby>未来<rt>みらい</rt></ruby>への<ruby>信頼<rt>しんらい</rt></ruby>を<ruby>取<rt>と</rt></ruby>り<ruby>戻<rt>もど</rt></ruby>す<ruby>時<rt>とき</rt></ruby>です。",
      detail_en: "Hope, faith, purpose, renewal, spirituality.",
    },
    reversed: {
      keywords_ja: "絶望、希望の喪失、失意",
      detail_ja: "<ruby>希望<rt>きぼう</rt></ruby>を<ruby>失<rt>うしな</rt></ruby>い、<ruby>未来<rt>みらい</rt></ruby>への<ruby>信頼<rt>しんらい</rt></ruby>が<ruby>揺<rt>ゆ</rt></ruby>らいでいる<ruby>状態<rt>じょうたい</rt></ruby>です。",
      detail_en: "Lack of faith, despair, self-trust issues, disconnection.",
    },
  },
  {
    id: "moon",
    number: 18,
    name: "The Moon",
    name_ja: "月",
    aliases: ["18", "moon", "月", "つき"],
    upright: {
      keywords_ja: "不安、恐怖、幻想、潜在意識",
      detail_ja: "<ruby>物事<rt>ものごと</rt></ruby>の<ruby>真実<rt>しんじつ</rt></ruby>が<ruby>見<rt>み</rt></ruby>えにくく、<ruby>幻想<rt>げんそう</rt></ruby>や<ruby>不安<rt>ふあん</rt></ruby>が<ruby>支配<rt>しはい</rt></ruby>している<ruby>時期<rt>じき</rt></ruby>です。<ruby>潜在意識<rt>せんざいいしき</rt></ruby>からの<ruby>メッセージ<rt>めっせーじ</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>してください。",
      detail_en: "Illusion, fear, the subconscious, confusion.",
    },
    reversed: {
      keywords_ja: "不安が晴れる、物事が見えてくる",
      detail_ja: "<ruby>混乱<rt>こんらん</rt></ruby>や<ruby>幻想<rt>げんそう</rt></ruby>から<ruby>抜<rt>ぬ</rt></ruby>け<ruby>出<rt>だ</rt></ruby>し、<ruby>物事<rt>ものごと</rt></ruby>が<ruby>明<rt>あき</rt></ruby>らかになりつつある<ruby>状態<rt>じょうたい</rt></ruby>です。",
      detail_en: "Release of fear, repressed emotion, inner confusion, clarity emerging.",
    },
  },
  {
    id: "sun",
    number: 19,
    name: "The Sun",
    name_ja: "太陽",
    aliases: ["19", "sun", "太陽", "たいよう"],
    upright: {
      keywords_ja: "喜び、成功、元気、前向き",
      detail_ja: "<ruby>全<rt>すべ</rt></ruby>てが<ruby>明<rt>あか</rt></ruby>るく<ruby>照<rt>て</rt></ruby>らされ、<ruby>成功<rt>せいこう</rt></ruby>と<ruby>幸福<rt>こうふく</rt></ruby>が<ruby>約束<rt>やくそく</rt></ruby>されたような<ruby>輝<rt>かがや</rt></ruby>きに<ruby>満<rt>み</rt></ruby>ちた<ruby>時期<rt>じき</rt></ruby>です。",
      detail_en: "Positivity, fun, warmth, success, vitality.",
    },
    reversed: {
      keywords_ja: "元気のなさ、悲観、内なる子供",
      detail_ja: "<ruby>一時的<rt>いちじてき</rt></ruby>に<ruby>輝<rt>かがや</rt></ruby>きが<ruby>陰<rt>かげ</rt></ruby>り、<ruby>内<rt>うち</rt></ruby>なる<ruby>活力<rt>かつりょく</rt></ruby>を<ruby>取<rt>と</rt></ruby>り<ruby>戻<rt>もど</rt></ruby>すことが<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>時期<rt>じき</rt></ruby>です。",
      detail_en: "Inner child, feeling down, overly optimistic.",
    },
  },
  {
    id: "judgement",
    number: 20,
    name: "Judgement",
    name_ja: "審判",
    aliases: ["20", "judgement", "judgment", "審判", "しんぱん"],
    upright: {
      keywords_ja: "目覚め、再生、内なる声",
      detail_ja: "<ruby>過去<rt>かこ</rt></ruby>を<ruby>振<rt>ふ</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>り<ruby>評価<rt>ひょうか</rt></ruby>し、<ruby>新<rt>あたら</rt></ruby>しい<ruby>自己<rt>じこ</rt></ruby>へと<ruby>生<rt>う</rt></ruby>まれ<ruby>変<rt>か</rt></ruby>わる<ruby>覚醒<rt>かくせい</rt></ruby>の<ruby>時<rt>とき</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。",
      detail_en: "Judgement, rebirth, inner calling, absolution.",
    },
    reversed: {
      keywords_ja: "後悔、自己批判、自信のなさ",
      detail_ja: "<ruby>自分<rt>じぶん</rt></ruby>を<ruby>厳<rt>きび</rt></ruby>しく<ruby>裁<rt>さば</rt></ruby>きすぎたり、<ruby>過去<rt>かこ</rt></ruby>の<ruby>後悔<rt>こうかい</rt></ruby>に<ruby>縛<rt>しば</rt></ruby>られている<ruby>状態<rt>じょうたい</rt></ruby>です。",
      detail_en: "Self-doubt, inner critic, ignoring the call.",
    },
  },
  {
    id: "world",
    number: 21,
    name: "The World",
    name_ja: "世界",
    aliases: ["21", "world", "世界", "せかい"],
    upright: {
      keywords_ja: "達成、完成、旅の終わり、まとまり",
      detail_ja: "<ruby>長<rt>なが</rt></ruby>い<ruby>旅<rt>たび</rt></ruby>の<ruby>完成<rt>かんせい</rt></ruby>と<ruby>成就<rt>じょうじゅ</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>します。<ruby>全<rt>すべ</rt></ruby>てが<ruby>一つ<rt>ひとつ</rt></ruby>に<ruby>統合<rt>とうごう</rt></ruby>され、<ruby>豊<rt>ゆた</rt></ruby>かな<ruby>充実感<rt>じゅうじつかん</rt></ruby>に<ruby>満<rt>み</rt></ruby>ちています。",
      detail_en: "Completion, integration, accomplishment, travel.",
    },
    reversed: {
      keywords_ja: "未完成、達成感のなさ、近道を求める",
      detail_ja: "<ruby>物事<rt>ものごと</rt></ruby>が<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>解決<rt>かいけつ</rt></ruby>しておらず、<ruby>まだ<rt>まだ</rt></ruby><ruby>課題<rt>かだい</rt></ruby>が<ruby>残<rt>のこ</rt></ruby>っている<ruby>状態<rt>じょうたい</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>します。",
      detail_en: "Incompletion, no closure, carrying baggage.",
    },
  },
];

export const cards: Card[] = [...majorArcana, ...minorArcana];

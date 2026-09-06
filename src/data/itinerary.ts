import { dirLink, mapsLink, APT, HOME, BGN_LOT15, ATH_AIRPORT, SYN } from "@/lib/maps";

export type Currency = "EUR" | "ILS";
export type CostFor = "person" | "couple" | "flat";
export type EventKind =
  | "flight"
  | "drive"
  | "transit"
  | "stay"
  | "food"
  | "sight"
  | "swim"
  | "shop"
  | "note";

export type Cost = {
  amount: number;
  currency: Currency;
  for: CostFor;
  estimate?: boolean;
  note?: string;
};

export type MapLink = { label: string; url: string };

export type EventItem = {
  id: string;
  start: string;
  end?: string;
  title: string;
  detail: string;
  kind: EventKind;
  costs: Cost[];
  maps: MapLink[];
  tips?: string[];
};

export type Alternative = {
  id: string;
  title: string;
  why: string;
  maps: MapLink[];
  costNote?: string;
};

export type DayPlan = {
  id: string;
  date: string;
  weekday: string;
  short: string;
  title: string;
  summary: string;
  events: EventItem[];
  alternatives: Alternative[];
};

export const TRIP = {
  title: "אתונה",
  couple: "ישראל ושרית הדר",
  datesLabel: "23–28 בספטמבר 2026",
  nights: 5,
  apartment: "Didotou 30, Athens 10680",
  apartmentName: "My Greek Vacations · Elia Didotou",
  booking: "5865470878",
  pnr: "Y88IEP",
  hostPhone: "+30 210 721 4834",
  hostEmail: "info@mygreekvacations.com",
  outbound: "LY547  ת\"א 04:55 → אתונה 07:05",
  inbound: "LY542  אתונה 10:40 → ת\"א 12:40",
  seats: "שרית 27A הלוך · 35B חזור",
};

export const PAID: Cost[] = [
  { amount: 640.18, currency: "EUR", for: "couple", note: "דירה 5 לילות, לא ניתן להחזר" },
];

export const days: DayPlan[] = [
  {
    id: "d23",
    date: "2026-09-23",
    weekday: "רביעי",
    short: "ד׳",
    title: "הגעה והיכרות עם המרכז",
    summary: "טיסת לילה, תיקים באחסון, פלאקה ושוק, כניסה לדירה ואז מקדשים וגן.",
    events: [
      {
        id: "d23-drive",
        start: "00:20",
        end: "02:00",
        title: "יציאה מקרית אתא לחניון 15 נתב\"ג",
        detail:
          "כביש 6 → כביש 1. בלילה כ־75–90 דק', כ־115 ק\"מ. יעד: חניון 15 ארוך־טווח, שאטל חינם ל־T3 כל ~20 דק'. להיות בביטחון אל על ב־02:00.",
        kind: "drive",
        costs: [
          { amount: 50, currency: "ILS", for: "flat", estimate: true, note: "חניה ליום · כ־275–300 ₪ לכל התקופה" },
        ],
        maps: [
          dirLink("ניווט מהבית", BGN_LOT15, "driving", HOME),
          mapsLink("חניון 15", BGN_LOT15),
          mapsLink("טרמינל 3", "Ben Gurion Airport Terminal 3"),
        ],
        tips: ["Economy Lite — בלי כבודה בבטן, רק תיק יד.", "מושבים שולמו מראש, לא ניתנים להחזר."],
      },
      {
        id: "d23-fly",
        start: "04:55",
        end: "07:05",
        title: "טיסה LY547 תל אביב → אתונה",
        detail: "El Al / Electra Airways, Economy Lite. PNR Y88IEP. מושב שרית 27A. שער באפליקציית אל על.",
        kind: "flight",
        costs: [],
        maps: [
          mapsLink("נתב\"ג T3", "Ben Gurion Airport Terminal 3"),
          mapsLink("שדה אתונה", ATH_AIRPORT),
        ],
      },
      {
        id: "d23-land",
        start: "07:05",
        end: "09:20",
        title: "נחיתה, EES ומטרו לסינטגמה",
        detail:
          "דרכון + מערכת EES (צילום פנים וטביעות) 20–40 דק'. מטרו קו 3 כחול לכיוון Syntagma / Dimotiko Theatro. על הצג חייב להיות כתוב Airport בכיוון ההפוך — אתם יורדים בסינטגמה.",
        kind: "transit",
        costs: [
          { amount: 9, currency: "EUR", for: "person", note: "כרטיס שדה, לא הכרטיס העירוני" },
          { amount: 40, currency: "EUR", for: "couple", estimate: true, note: "חלופה: מונית רשמית יציאה 3, מחיר קבוע ביום" },
        ],
        maps: [
          dirLink("שדה → דירה במטרו", APT, "transit", ATH_AIRPORT),
          mapsLink("שדה אתונה", ATH_AIRPORT),
          mapsLink("סינטגמה", SYN),
        ],
        tips: ["מונית המארחים 48 € ביום — יקרה יותר מהמטרו."],
      },
      {
        id: "d23-plaka",
        start: "09:20",
        end: "14:45",
        title: "פלאקה + צהריים בשוק ורבאקיוס",
        detail:
          "החדר נפתח ב־15:00. להשאיר תיקים ב־Bounce / Radical Storage ליד סינטגמה או מונסטיראקי. קפה בפלאקה, צהריים בשוק — Diporto או דוכן בשוק. בלי אקרופוליס היום, בלי ים.",
        kind: "sight",
        costs: [
          { amount: 7, currency: "EUR", for: "person", estimate: true, note: "אחסון תיק" },
          { amount: 18, currency: "EUR", for: "person", estimate: true, note: "קפה + צהריים בשוק" },
        ],
        maps: [
          mapsLink("אחסון תיקים סינטגמה", "luggage storage Syntagma Athens"),
          mapsLink("פלאקה", "Plaka Athens"),
          mapsLink("שוק ורבאקיוס", "Varvakios Central Market Athens"),
          mapsLink("Diporto", "Diporto restaurant Athens"),
          dirLink("סינטגמה → שוק", "Varvakios Central Market Athens", "walking", SYN),
        ],
      },
      {
        id: "d23-checkin",
        start: "15:00",
        end: "15:45",
        title: "צ'ק־אין דירה Didotou 30",
        detail:
          "My Greek Vacations City Apartments. כניסה עם הקוד מהצ'ק־אין המקוון (וואטסאפ ~20.9). מטרו קרוב: Panepistimio קו 2, 7 דק' הליכה. מסינטגמה כ־15 דק' צפונה ב־Panepistimiou. יש מעלית.",
        kind: "stay",
        costs: [],
        maps: [
          mapsLink("הדירה", APT),
          mapsLink("מטרו Panepistimio", "Panepistimio metro station Athens"),
          dirLink("סינטגמה → דירה", APT, "walking", SYN),
        ],
        tips: [
          "סט פתיחה: מגבות, מצעים, טיפוח, נייר טואלט.",
          "כספת — להשאיר דרכונים וכרטיסים מיותרים.",
        ],
      },
      {
        id: "d23-super",
        start: "15:45",
        end: "16:15",
        title: "סופר ליד הדירה",
        detail:
          "לבדוק מה יש בדירה ואז לקנות רק מה שחסר: קפה/קפסולות, חלב, יוגורט, פירות, מים. מגבות ים — מהבית.",
        kind: "shop",
        costs: [{ amount: 20, currency: "EUR", for: "couple", estimate: true, note: "השלמות לארוחות בוקר" }],
        maps: [
          mapsLink("סופר ליד דידוטו", "supermarket near Didotou 30 Athens"),
          mapsLink("הדירה", APT),
        ],
      },
      {
        id: "d23-olymp",
        start: "16:20",
        end: "19:30",
        title: "אולימפייאון, שער הדריאנוס, הגן הלאומי, אצטדיון פנאתנאי",
        detail:
          "הליכה אחת דרך סינטגמה. שער הדריאנוס מבחוץ חינם. מקדש זאוס עד ~19:30. הגן הלאומי עד שקיעה. האצטדיון (Kallimarmaro) עד 19:00.",
        kind: "sight",
        costs: [
          { amount: 8, currency: "EUR", for: "person", note: "אולימפייאון" },
          { amount: 10, currency: "EUR", for: "person", note: "אצטדיון פנאתנאי" },
        ],
        maps: [
          dirLink("מהדירה לאולימפייאון", "Temple of Olympian Zeus Athens", "walking"),
          mapsLink("אולימפייאון", "Temple of Olympian Zeus Athens"),
          mapsLink("שער הדריאנוס", "Hadrian Arch Athens"),
          mapsLink("הגן הלאומי", "National Garden Athens"),
          mapsLink("אצטדיון פנאתנאי", "Panathenaic Stadium Athens"),
        ],
        tips: ["חייל משמר בסינטגמה בכל שעה עגולה."],
      },
      {
        id: "d23-dinner",
        start: "20:00",
        end: "22:00",
        title: "ערב: טברנה Klimataria או Athinaikon",
        detail: "ערב ראשון רגוע אחרי טיסת לילה. Klimataria בפסירי, או Athinaikon ליד אומוניה.",
        kind: "food",
        costs: [{ amount: 35, currency: "EUR", for: "person", estimate: true, note: "טברנה + יין" }],
        maps: [
          mapsLink("Klimataria", "Klimataria taverna Psyrri Athens"),
          mapsLink("Athinaikon", "Athinaikon restaurant Athens"),
          dirLink("מהדירה ל-Klimataria", "Klimataria Psyrri Athens", "walking"),
        ],
      },
    ],
    alternatives: [
      {
        id: "a23-guard",
        title: "החלפת משמר בסינטגמה",
        why: "כל שעה עגולה, חינם, בדרך בין הדירה לאולימפייאון.",
        maps: [mapsLink("הפרלמנט", "Hellenic Parliament Syntagma")],
        costNote: "חינם",
      },
      {
        id: "a23-monast",
        title: "שוק הפשפשים במונסטיראקי",
        why: "אם ורבאקיוס עמוס — הליכה קצרה לכיכר ולחנויות עתיקות.",
        maps: [mapsLink("מונסטיראקי", "Monastiraki Square Athens")],
        costNote: "חינם לשוטטות",
      },
      {
        id: "a23-keram",
        title: "קרמייקוס",
        why: "בית קברות עתיק שקט, פחות תיירים מאשר האגורה.",
        maps: [mapsLink("קרמייקוס", "Kerameikos Archaeological Site Athens")],
        costNote: "כ־8 €, או כרטיס משולב",
      },
    ],
  },
  {
    id: "d24",
    date: "2026-09-24",
    weekday: "חמישי",
    short: "ה׳",
    title: "ים בבוקר, מוזיאון ואגורה",
    summary: "שחייה ב־Edem, המוזיאון הארכאולוגי הלאומי, אחר הצהריים באגורה העתיקה.",
    events: [
      {
        id: "d24-swim",
        start: "07:15",
        end: "11:30",
        title: "שחייה בבוקר: Edem / Flisvos",
        detail:
          "יציאה עם בגד ים ומגבת. הליכה לסינטגמה (~15 דק') → טראם דרומה ל־Edem. כרטיס 1.20 €, 25–40 דק'. חוף ציבורי חינם. Bolivar הוא מועדון מאורגן — אופציה, לא חובה.",
        kind: "swim",
        costs: [{ amount: 1.2, currency: "EUR", for: "person", note: "טראם הלוך (חזור בנפרד או בכרטיס יומי)" }],
        maps: [
          mapsLink("Edem", "Edem Beach Palaio Faliro"),
          mapsLink("Flisvos", "Flisvos Marina Palaio Faliro"),
          mapsLink("Bolivar", "Bolivar Beach Bar Akti tou Iliou Alimos"),
          dirLink("מהדירה ל-Edem", "Edem Beach Palaio Faliro", "transit"),
        ],
        tips: [
          "לא להשאיר תיק בלי השגחה לשחייה ארוכה — לשחות במשמרות.",
          "דרכונים בכספת בדירה.",
        ],
      },
      {
        id: "d24-nam",
        start: "12:00",
        end: "15:30",
        title: "צהריים בשוק + המוזיאון הארכאולוגי הלאומי",
        detail:
          "צהריים קלים בורבאקיוס או סופלקי, ואז 2.5 שעות בנחת במוזיאון. הגעה: הליכה מהדירה ~10–15 דק' או מטרו 2 לאומוניה/ויקטוריה.",
        kind: "sight",
        costs: [
          { amount: 15, currency: "EUR", for: "person", estimate: true, note: "צהריים" },
          { amount: 12, currency: "EUR", for: "person", note: "כרטיס מוזיאון" },
        ],
        maps: [
          mapsLink("המוזיאון הארכאולוגי", "National Archaeological Museum Athens"),
          dirLink("מהדירה למוזיאון", "National Archaeological Museum Athens", "walking"),
          mapsLink("שוק ורבאקיוס", "Varvakios Central Market Athens"),
        ],
      },
      {
        id: "d24-agora",
        start: "15:45",
        end: "19:00",
        title: "אגורה עתיקה, מקדש הפאיסטוס, תיסיו",
        detail:
          "הליכה או מטרו למונסטיראקי/תיסיו. סטיו של אטאלוס + מקדש הפאיסטוס (השמור ביותר בעיר). שעות 08:00–19:30, כניסה אחרונה ~19:00. כניסה 2026: שער תיסיו / Apostolou Pavlou, לא Adrianou.",
        kind: "sight",
        costs: [{ amount: 20, currency: "EUR", for: "person", note: "כרטיס אתר + מוזיאון האגורה" }],
        maps: [
          mapsLink("אגורה עתיקה", "Ancient Agora of Athens"),
          mapsLink("מקדש הפאיסטוס", "Temple of Hephaestus Athens"),
          dirLink("מהמוזיאון לאגורה", "Ancient Agora of Athens", "walking", "National Archaeological Museum Athens"),
          mapsLink("כניסה תיסיו", "Thiseio Square Ancient Agora entrance"),
        ],
      },
      {
        id: "d24-dinner",
        start: "19:30",
        end: "22:00",
        title: "ערב באקסארכיה: Rozalia או Yiantes",
        detail: "טברנה מקומית ליד הדירה. אחרי: משקה ב־Blue Fox אם יש כוח.",
        kind: "food",
        costs: [{ amount: 32, currency: "EUR", for: "person", estimate: true }],
        maps: [
          mapsLink("Rozalia", "Rozalia taverna Exarcheia Athens"),
          mapsLink("Yiantes", "Yiantes restaurant Exarcheia Athens"),
          dirLink("מהדירה ל-Rozalia", "Rozalia Exarcheia Athens", "walking"),
        ],
      },
    ],
    alternatives: [
      {
        id: "a24-fresh",
        title: "בריכת גג Fresh Hotel",
        why: "אם הים רחוק מדי או אין חשק לטראם. נפתח ~10:00, נוף לאקרופוליס.",
        maps: [mapsLink("Fresh Hotel", "Fresh Hotel Athens Sofokleous")],
        costNote: "כ־30 € ביום חול / 40 € בסוף שבוע",
      },
      {
        id: "a24-psyrri",
        title: "שוטטות בפסירי במקום האגורה",
        why: "אם הרגליים עייפות אחרי המוזיאון — בארים, גרפיטי וגלריות בלי כרטיס.",
        maps: [mapsLink("פסירי", "Psyrri Athens")],
        costNote: "חינם לשוטטות",
      },
      {
        id: "a24-benaki-islam",
        title: "מוזיאון בנאקי לאמנות אסלאמית",
        why: "קטן וממוזג, קרוב לקרמייקוס.",
        maps: [mapsLink("בנאקי אסלאמי", "Benaki Museum of Islamic Art Athens")],
        costNote: "כ־9 €",
      },
    ],
  },
  {
    id: "d25",
    date: "2026-09-25",
    weekday: "שישי",
    short: "ו׳",
    title: "אקרופוליס והסמטאות",
    summary: "יום הליכה: האתר, המוזיאון, אנאפיוטיקה, אגורה רומית ותצפית פילופאפוס.",
    events: [
      {
        id: "d25-acro",
        start: "08:00",
        end: "14:00",
        title: "אקרופוליס + מוזיאון האקרופוליס",
        detail:
          "לקנות כרטיס עם משבצת שעה מראש (08:00–09:00). האתר 08:00–19:00 ב־16–29.9. כובע ומים. אחרי: מוזיאון האקרופוליס (כרטיס נפרד) וצהריים בפלאקה. הגעה: מטרו 2 ל־Acropoli או הליכה ~25 דק'.",
        kind: "sight",
        costs: [
          { amount: 30, currency: "EUR", for: "person", note: "אקרופוליס" },
          { amount: 20, currency: "EUR", for: "person", note: "מוזיאון האקרופוליס" },
          { amount: 20, currency: "EUR", for: "person", estimate: true, note: "צהריים בפלאקה" },
        ],
        maps: [
          mapsLink("אקרופוליס", "Acropolis of Athens"),
          mapsLink("מוזיאון האקרופוליס", "Acropolis Museum Athens"),
          dirLink("מהדירה לאקרופוליס", "Acropolis of Athens", "walking"),
          mapsLink("מטרו Acropoli", "Acropoli metro station Athens"),
        ],
        tips: ["יום בלי ים — הרגלים.", "לא לשמור תיק על גב הכיסא במסעדה."],
      },
      {
        id: "d25-anafi",
        start: "14:30",
        end: "19:30",
        title: "אנאפיוטיקה, אגורה רומית, פילופאפוס",
        detail:
          "הכל ברגל מהאקרופוליס. אנאפיוטיקה — סמטאות סיקלדיות על המדרון. אגורה רומית + מגדל הרוחות + ספריית הדריאנוס. גבעת פילופאפוס / Areopagus לתצפית שקיעה. קפה במונסטיראקי לפני הטברנה.",
        kind: "sight",
        costs: [{ amount: 10, currency: "EUR", for: "person", note: "אגורה רומית / ספריית הדריאנוס" }],
        maps: [
          mapsLink("אנאפיוטיקה", "Anafiotika Plaka Athens"),
          mapsLink("אגורה רומית", "Roman Agora Athens"),
          mapsLink("ספריית הדריאנוס", "Hadrian Library Athens"),
          mapsLink("פילופאפוס", "Philopappos Hill Athens"),
          mapsLink("Areopagus", "Areopagus Hill Athens"),
        ],
      },
      {
        id: "d25-dinner",
        start: "20:30",
        end: "22:30",
        title: "טברנה בפלאקה: Saita או Scholarhio",
        detail: "חלופה רגועה יותר: Mani Mani. הגעה ברגל מאזור האתר, או מונית 8–10 € חזרה לדירה.",
        kind: "food",
        costs: [{ amount: 40, currency: "EUR", for: "person", estimate: true }],
        maps: [
          mapsLink("Saita", "Saita taverna Plaka Athens"),
          mapsLink("Scholarhio", "Scholarhio Ouzeri Plaka Athens"),
          mapsLink("Mani Mani", "Mani Mani restaurant Athens"),
          dirLink("מהדירה לפלאקה", "Plaka Athens", "walking"),
        ],
      },
    ],
    alternatives: [
      {
        id: "a25-herodes",
        title: "אודיאון הרודס אטיקוס מבחוץ",
        why: "על הדרך בין האקרופוליס לפילופאפוס, בלי כרטיס נוסף.",
        maps: [mapsLink("הרודס אטיקוס", "Odeon of Herodes Atticus")],
        costNote: "חינם מבחוץ",
      },
      {
        id: "a25-dionysos",
        title: "תיאטרון דיוניסוס",
        why: "לפעמים כלול בכרטיס האקרופוליס — לבדוק בקופה.",
        maps: [mapsLink("תיאטרון דיוניסוס", "Theatre of Dionysus Athens")],
        costNote: "לרוב כלול בכרטיס האתר",
      },
      {
        id: "a25-stgeorge",
        title: "בריכת St. George Lycabettus",
        why: "אם אחרי ההר אין כוח לסמטאות — קולונאקי, גג עם נוף.",
        maps: [mapsLink("St. George", "St George Lycabettus Hotel Athens")],
        costNote: "כ־40–70 € לאדם, מ־10:00",
      },
    ],
  },
  {
    id: "d26",
    date: "2026-09-26",
    weekday: "שבת",
    short: "ש׳",
    title: "יום ים בגליפדה",
    summary: "טראם לחוף, צהריים דגים, עצירה ב־SNFCC בדרך חזרה, ערב קל ליד הדירה.",
    events: [
      {
        id: "d26-beach",
        start: "07:30",
        end: "17:00",
        title: "גליפדה — ים, מרינה וצהריים",
        detail:
          "הליכה לסינטגמה → טראם לגליפדה, 35–45 דק', 1.20 €. חוף ציבורי פתוח מוקדם. Asteria Glyfada (לוקרים) נפתח רק ב־10:00 — סט לשניים כ־70 € בסוף שבוע. חזרה כ־16:30 כדי לעצור ב־SNFCC.",
        kind: "swim",
        costs: [
          { amount: 1.2, currency: "EUR", for: "person", note: "טראם" },
          { amount: 35, currency: "EUR", for: "person", estimate: true, note: "צהריים דגים במרינה" },
          { amount: 70, currency: "EUR", for: "couple", estimate: true, note: "אופציונלי: Asteria, סט לשניים בסופ״ש" },
        ],
        maps: [
          dirLink("מהדירה לגליפדה", "Glyfada Beach Athens", "transit"),
          mapsLink("חוף גליפדה", "Glyfada Beach Athens"),
          mapsLink("מרינת גליפדה", "Glyfada Marina Athens"),
          mapsLink("Asteria", "Asteria Glyfada Poseidonos 110"),
        ],
        tips: [
          "לוקרים אמיתיים רק בחוף המאורגן (Asteria).",
          "בחוף הציבורי — לשחות במשמרות.",
        ],
      },
      {
        id: "d26-snfcc",
        start: "17:15",
        end: "19:30",
        title: "מרכז סטברוס ניארכוס בדרך חזרה",
        detail: "הטראם עובר ליד. פארק, ספרייה ותצפית לים. כניסה חופשית לגנים. אחר כך מטרו/טראם לדירה.",
        kind: "sight",
        costs: [],
        maps: [
          mapsLink("SNFCC", "Stavros Niarchos Foundation Cultural Center Athens"),
          dirLink("מגליפדה ל-SNFCC", "Stavros Niarchos Foundation Cultural Center", "transit", "Glyfada Beach Athens"),
        ],
      },
      {
        id: "d26-dinner",
        start: "20:00",
        end: "21:30",
        title: "ערב קל ליד הדירה",
        detail: "אחרי יום ים ארוך — פיתה, סלט, או שאריות מהסופר. לא לרוץ לטברנה רחוקה.",
        kind: "food",
        costs: [{ amount: 18, currency: "EUR", for: "person", estimate: true }],
        maps: [
          mapsLink("הדירה", APT),
          mapsLink("מסעדות ליד דידוטו", "restaurants near Didotou 30 Athens"),
        ],
      },
    ],
    alternatives: [
      {
        id: "a26-vouli",
        title: "אגם ווליאגמני",
        why: "מים מינרליים חמימים, מאורגן. בלי רכב זה ארוך (~1.5 שעות).",
        maps: [mapsLink("ווליאגמני", "Lake Vouliagmeni Athens")],
        costNote: "כניסה כ־15–20 €, תחבורה ארוכה",
      },
      {
        id: "a26-bolivar",
        title: "Bolivar Beach Bar",
        why: "המארחים ממליצים כחוף הקרוב המאורגן. טראם לתחנת Kalamaki.",
        maps: [dirLink("מהדירה ל-Bolivar", "Bolivar Beach Bar Alimos", "transit")],
        costNote: "כניסה + מיטות, משתנה בסופ״ש",
      },
      {
        id: "a26-edem",
        title: "להישאר ב-Edem / Flisvos",
        why: "קצר יותר מגליפדה אם רוצים פחות נסיעה.",
        maps: [dirLink("מהדירה ל-Edem", "Edem Beach Palaio Faliro", "transit")],
        costNote: "חינם + טראם 1.20 €",
      },
    ],
  },
  {
    id: "d27",
    date: "2026-09-27",
    weekday: "ראשון",
    short: "א׳",
    title: "ים אחרון, קולונאקי וליקאבטוס",
    summary: "שחייה קצרה, צהריים בקולונאקי, בנאקי + קייקלדי, שקיעה בליקאבטוס, ארוחת פרידה.",
    events: [
      {
        id: "d27-swim",
        start: "07:30",
        end: "11:00",
        title: "שחייה אחרונה — Edem (מומלץ) או גליפדה",
        detail: "לא למתוח: מחר טיסה ב־10:40. Edem קרוב יותר. שחייה 08:15–10:15 וחזרה למרכז.",
        kind: "swim",
        costs: [{ amount: 1.2, currency: "EUR", for: "person", note: "טראם" }],
        maps: [
          dirLink("ל-Edem", "Edem Beach Palaio Faliro", "transit"),
          dirLink("לגליפדה", "Glyfada Beach Athens", "transit"),
        ],
      },
      {
        id: "d27-kolonaki",
        start: "12:00",
        end: "17:15",
        title: "צהריים בקולונאקי, בנאקי, מוזיאון קייקלדי",
        detail:
          "הליכה ~15–20 דק' מהדירה מזרחה. צהריים סביב כיכר פיליקיס אתאירייה. בנאקי בניין Koumbari, ואז 3 דק' למוזיאון האמנות הקיקלדית — קטן ומומלץ.",
        kind: "sight",
        costs: [
          { amount: 25, currency: "EUR", for: "person", estimate: true, note: "צהריים בקולונאקי" },
          { amount: 12, currency: "EUR", for: "person", note: "בנאקי" },
          { amount: 14, currency: "EUR", for: "person", note: "אמנות קייקלדית" },
        ],
        maps: [
          mapsLink("קולונאקי", "Kolonaki Square Athens"),
          mapsLink("בנאקי", "Benaki Museum Koumbari 1 Athens"),
          mapsLink("קייקלדי", "Museum of Cycladic Art Athens"),
          dirLink("מהדירה לבנאקי", "Benaki Museum Koumbari Athens", "walking"),
        ],
      },
      {
        id: "d27-lyca",
        start: "17:30",
        end: "19:15",
        title: "רכבל ליקאבטוס ושקיעה",
        detail: "רכבל מתחנת Ploutarchou. תצפית 360°. לרדת לפני שחשכה לגמרי אם מעדיפים לא לרדת ברגל.",
        kind: "sight",
        costs: [{ amount: 10, currency: "EUR", for: "person", estimate: true, note: "רכבל הלוך־חזור" }],
        maps: [
          mapsLink("רכבל ליקאבטוס", "Lycabettus funicular Athens"),
          mapsLink("פסגת ליקאבטוס", "Mount Lycabettus Athens"),
          dirLink("מבנאקי לרכבל", "Lycabettus funicular Ploutarchou", "walking", "Benaki Museum Koumbari Athens"),
        ],
      },
      {
        id: "d27-dinner",
        start: "20:30",
        end: "22:30",
        title: "ארוחת פרידה — טברנה",
        detail: "To Mavro Provato בפגרטי, או לחזור ל-Rozalia הקרובה. לא לאכול כבד — קימה ב־06:15.",
        kind: "food",
        costs: [{ amount: 40, currency: "EUR", for: "person", estimate: true }],
        maps: [
          mapsLink("To Mavro Provato", "To Mavro Provato Pagrati Athens"),
          mapsLink("Rozalia", "Rozalia Exarcheia Athens"),
        ],
      },
    ],
    alternatives: [
      {
        id: "a27-byz",
        title: "המוזיאון הביזנטי והנוצרי",
        why: "ליד בנאקי, אם הקייקלדי סגור או עמוס.",
        maps: [mapsLink("ביזנטי", "Byzantine and Christian Museum Athens")],
        costNote: "כ־8 €",
      },
      {
        id: "a27-numis",
        title: "המוזיאון הנומיסמטי",
        why: "בניין איליו מליאטון המפואר בסינטגמה, ביקור קצר.",
        maps: [mapsLink("נומיסמטי", "Numismatic Museum Athens")],
        costNote: "כ־6 €",
      },
      {
        id: "a27-fresh",
        title: "בריכת Fresh במקום הים",
        why: "יום לפני טיסה מוקדמת — בלי טראם ובלי חול.",
        maps: [mapsLink("Fresh Hotel", "Fresh Hotel Athens Sofokleous")],
        costNote: "כ־40 € ביום ראשון",
      },
    ],
  },
  {
    id: "d28",
    date: "2026-09-28",
    weekday: "שני",
    short: "ב׳",
    title: "חזרה הביתה",
    summary: "יציאה ב־07:00, מטרו לשדה, טיסה 10:40, רכב בחניון 15.",
    events: [
      {
        id: "d28-out",
        start: "06:15",
        end: "08:00",
        title: "יציאה מהדירה ומטרו לשדה",
        detail:
          "קימה 06:15, יציאה 07:00. צ'ק־אאוט הרשמי 11:00 לא רלוונטי. לכבות מזגן, דוד ואורות. מטרו קו 3 מפאנפיסטימיו/סינטגמה כיוון Airport. כרטיס שדה 9 €. הגעה ~07:50.",
        kind: "transit",
        costs: [{ amount: 9, currency: "EUR", for: "person", note: "מטרו לשדה" }],
        maps: [
          dirLink("דירה → שדה", ATH_AIRPORT, "transit"),
          mapsLink("Panepistimio", "Panepistimio metro station Athens"),
          mapsLink("סינטגמה", "Syntagma metro station Athens"),
          mapsLink("שדה אתונה", ATH_AIRPORT),
        ],
        tips: ["על הצג חייב להיות כתוב Airport.", "אובדן מפתח = חיוב."],
      },
      {
        id: "d28-fly",
        start: "10:40",
        end: "12:40",
        title: "טיסה LY542 אתונה → תל אביב",
        detail: "Economy Lite, מושב שרית 35B. להיות בביטחון עד ~08:40. בלי כבודה לבטן.",
        kind: "flight",
        costs: [],
        maps: [mapsLink("שדה אתונה", ATH_AIRPORT)],
      },
      {
        id: "d28-car",
        start: "13:15",
        end: "15:00",
        title: "איסוף הרכב וחזרה לקרית אתא",
        detail: "שאטל לחניון 15, כביש 1 → כביש 6 הביתה.",
        kind: "drive",
        costs: [],
        maps: [
          mapsLink("חניון 15", BGN_LOT15),
          dirLink("נתב\"ג → הבית", HOME, "driving", BGN_LOT15),
        ],
      },
    ],
    alternatives: [
      {
        id: "a28-coffee",
        title: "קפה אחרון בסינטגמה לפני המטרו",
        why: "רק אם יוצאים מהדירה עם מרווח — לא על חשבון הביטחון בשדה.",
        maps: [mapsLink("סינטגמה", SYN)],
        costNote: "4–6 €",
      },
      {
        id: "a28-taxi",
        title: "מונית לשדה במקום מטרו",
        why: "אם יש עיכוב או תיקים כבדים בבוקר.",
        maps: [dirLink("דירה → שדה במונית", ATH_AIRPORT, "driving")],
        costNote: "כ־40 € ביום / 48 € עם המארחים",
      },
    ],
  },
];

export function formatCost(c: Cost) {
  const n =
    c.currency === "EUR"
      ? `${c.amount % 1 === 0 ? c.amount.toFixed(0) : c.amount.toFixed(2)} €`
      : `${c.amount} ₪`;
  const who = c.for === "person" ? "לאדם" : c.for === "couple" ? "לזוג" : "";
  return [n, who, c.estimate ? "הערכה" : null, c.note].filter(Boolean).join(" · ");
}

export function coupleAmount(c: Cost) {
  return c.for === "person" ? c.amount * 2 : c.amount;
}

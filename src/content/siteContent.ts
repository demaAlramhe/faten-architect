/**
 * Central content for Faten Architect – text, business info, links, projects.
 * Projects order is hard-coded; do not sort alphabetically.
 */

/** Path to logo in public folder (e.g. "/logo.png" or "/projects/logo.png.jpeg") */
export const logoPath = "/projects/logo.png.jpeg";

/** אייקונים ל״דרכי התקשרות״ – שים קבצים בתיקייה public/icons/ */
export const contactIcons = {
  whatsapp: "/icons/whatsapp.png",
  phone: "/icons/phone.png",
  email: "/icons/email.png",
  instagram: "/icons/instagram.png",
} as const;

export const business = {
  name: "Faten Architect",
  city: "שפרעם",
  phoneDisplay: "050-909-0662",
  phoneE164: "+972509090662",
  email: "alramhef@gmail.com",
  instagram:
    "https://www.instagram.com/faten_architect?igsh=cWtlbmZrYzF3Z2d3&utm_source=qr",
  whatsApp: "https://wa.me/972509090662",
  call: "tel:+972509090662",
  emailMailto: "mailto:alramhef@gmail.com",
  ctaPrimary: "לתאם שיחת ייעוץ",
} as const;

export const hero = {
  headline:
    "אדריכלות ועיצוב פנים\n\nתכנון ועיצוב שמדייק את החיים שלך — פונקציונלי, אלגנטי ומרשים.",
  subheadline:
    "היי, אני פאתן אל רמחי חליפה, אדריכלית ומעצבת פנים. בעלות תואר ראשון באדריכלות, עם 4 שנות ניסיון בתכנון מבני ציבור ומגורים. מלווה פרויקטים בהתאמה אישית — מהבנת הצרכים ועד תכנון חכם וניצול מקסימלי של החלל, עם שפה עיצובית הרמונית וירידה לפרטים.",
} as const;

export const services = [
  "אדריכלות – תכנון מבני מגורים ומבני ציבור, תכניות והיתרים לפי הצורך",
  "עיצוב פנים – תכנון חלל, חומרים, תאורה ונגרות בהתאמה אישית",
  "הום סטיילינג – הלבשת הבית, צבעוניות, ריהוט ואקססוריז עד למראה מושלם",
  "עיצוב מסחרי – חנויות/עסקים עם חוויית לקוח, זרימה נכונה ונראות שמוכרת",
] as const;

export const about = `תכנון אדריכלי ועיצוב פנים בגישה מדויקת, מאוזנת ופרקטית.
כל פרויקט מתחיל בניתוח עומק של המבנה/ החלל , אור טבעי, זרימת תנועה ופוטנציאל תכנוני — ומתורגם לפתרונות חכמים המשלבים פונקציונליות עם אסתטיקה מוקפדת.

העבודה מתבצעת תוך חשיבה מערכתית, תכנון מפורט וירידה לרמת הביצוע, כולל בחירת חומרים, תאורה ונגרות בהתאמה אישית.
המטרה היא ליצור חללים שמרגישים טבעיים, מדויקים ונכונים — כאלה שמשפרים את איכות החיים ומשקפים את הזהות של מי שחי בהם.`;

export const processSteps = [
  "היכרות ואפיון",
  "קונספט ותכנון",
  "בחירת חומרים ותכנון מפורט",
  "ליווי עד סיום",
] as const;

export const faq: { question: string; answer: string }[] = [
  {
    question: "כמה זמן לוקח תהליך עיצוב/תכנון?",
    answer:
      "משך התהליך תלוי בגודל ובהיקף הפרויקט. בשיחת הייעוץ נגדיר לוחות זמנים ברורים ומסודרים.",
  },
  {
    question: "אפשר לעבוד איתך גם אם יש לי תקציב מוגבל?",
    answer:
      "כן. בונים תכנון חכם שמתעדף נכון את התקציב ויוצר תוצאה מרשימה גם במסגרת מוגבלת.",
  },
  {
    question: "את מלווה גם בבחירת ספקים וקניות?",
    answer:
      "בהחלט. ניתן לכלול ליווי בבחירת ספקים, חומרים ורכישות בהתאם לצורך הפרויקט.",
  },
];

/** Ordered project slugs – use this order everywhere. Do NOT sort alphabetically. */
export const projectSlugOrder = ["apartment", "teen-room", "jewelry-store"] as const;

export type ProjectSlug = (typeof projectSlugOrder)[number];

export interface ProjectMeta {
  slug: ProjectSlug;
  title: string;
  description: string;
  imageCount: number;
}

/** Projects metadata in display order (apartment → teen-room → jewelry-store). */
export const projectsMeta: ProjectMeta[] = [
  {
    slug: "apartment",
    title: "עיצוב פנים – דירה",
    description:
      "תכנון מדויק לניצול מקסימלי של החלל, תאורה נכונה וחומריות שמחברת בין יופי לנוחות יומיומית.",
    imageCount: 13,
  },
  {
    slug: "teen-room",
    title: "הום סטיילינג – חדר נערה",
    description:
      "חדר שמרגיש אישי, נעים ומדויק: צבעוניות מאוזנת, פתרונות אחסון חכמים ופינישים שמוסיפים אופי.",
    imageCount: 9,
  },
  {
    slug: "jewelry-store",
    title: "עיצוב מסחרי – חנות תכשיטים",
    description:
      "תכנון שמדגיש את המוצרים, יוצר זרימה נכונה ללקוחות ומייצר נראות יוקרתית שמגדילה מכירה.",
    imageCount: 15,
  },
];

/** Base path for project images (in public). */
export const projectsImageBase = "/projects";

/** File extension for project images (e.g. ".jpg" or ".jpg.jpeg"). */
export const projectImageExtension = ".jpg.jpeg";

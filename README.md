# Faten Architect – אתר תיק עבודות

פורטיו מודרני בעברית (RTL) לסטודיו לאדריכלות ועיצוב פנים.

## טכנולוגיות

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (אנימציות עדינות)
- **next/image** לאופטימיזציית תמונות

## התקנה והרצה

```bash
npm install
npm run dev
```

פותח בדפדפן: [http://localhost:3000](http://localhost:3000).

## בנייה ופריסה

```bash
npm run build
npm start
```

### פריסה ל-Vercel

1. העלה את הפרויקט ל-GitHub (או ספק אחר שתומך ב-Vercel).
2. היכנס ל-[Vercel](https://vercel.com) וחבר את ה-repo.
3. Vercel יזהה אוטומטית Next.js; אשר את ההגדרות ולחץ Deploy.
4. אופציונלי: הגדר משתנה סביבה `NEXT_PUBLIC_SITE_URL` לכתובת האתר (למשל `https://your-domain.co.il`) עבור SEO (sitemap, OpenGraph).

## נכסים (Assets)

- **לוגו:** שים קובץ `logo.png` בתיקייה `public/`.
- **פרויקטים:** תמונות בתיקיות:
  - `public/projects/apartment/01.jpg` … `13.jpg`
  - `public/projects/teen-room/01.jpg` … `09.jpg`
  - `public/projects/jewelry-store/01.jpg` … `15.jpg`

אם חסרות תמונות, ייתכן שיופיעו שברים בתצוגה; הוסף את הקבצים לפי המבנה למעלה.

## תוכן ועריכת טקסטים

כל הטקסטים, פרטי העסק והפרויקטים מרוכזים ב:

- `src/content/siteContent.ts`

שם ניתן לעדכן כותרות, שירותים, FAQ, סדר פרויקטים ועוד.

## טופס צור קשר

ברירת המחדל: שליחת הטופס פותחת `mailto:` עם השדות.  
להפעלת שליחה דרך שרת (למשל עם nodemailer), הגדר משתני סביבה:

- `EMAIL_SERVER_HOST`
- `EMAIL_SERVER_USER`
- `EMAIL_SERVER_PASS`

והשלם את הלוגיקה ב-`src/app/api/contact/route.ts` (למשל שימוש ב-nodemailer).

## SEO

- מטא-תגים ו-OpenGraph ב-`src/app/layout.tsx`
- JSON-LD מסוג LocalBusiness ב-`src/components/JsonLd.tsx`
- `sitemap.xml` ו-`robots.txt` נוצרים אוטומטית (App Router)

## נגישות

- RTL מלא (`dir="rtl"`, `lang="he"`)
- ניווט מקלדת וגלריית Lightbox עם לכידת פוקוס
- טקסטים אלטרנטיביים ותיאורים לרכיבים אינטראקטיביים
- התאמה ל-WCAG

## רישיון

שימוש פרטי לפרויקט Faten Architect.

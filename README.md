# The Philly Pizza Project — Static Website

Complete static website for GitHub Pages. No build tools, no npm, no dependencies.

---

## Deploy to GitHub Pages

1. Create a new GitHub repository named `thephillypizzaproject` (or any name)
2. Upload all files maintaining the folder structure
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. GitHub Pages URL will be: `https://yourusername.github.io/thephillypizzaproject/`

---

## Connect Custom Domain (thephillypizzaproject.com)

1. In your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  yourusername.github.io
   ```
2. In GitHub: **Settings → Pages → Custom domain** → enter `thephillypizzaproject.com`
3. Check "Enforce HTTPS" (wait 24h for DNS propagation)

---

## Add a New Review

1. Create a new folder: `/reviews/restaurant-name/`
2. Copy `/reviews/sorellina/index.html` as a template
3. Replace all Sorellina-specific content:
   - Restaurant name, address, style badge, price
   - Group score and individual reviewer scores
   - Pizza cards (each pizza scored individually)
   - Criteria table scores and bar widths (`data-score` attribute)
   - Free comment paragraph and Instagram verdict
4. Add the restaurant to `/reviews/index.html` (add a new card)
5. Add it to the correct ranking table in `/rankings/index.html`
6. Add an entry to `search.json`
7. Add the URL to `sitemap.xml`

---

## Add a New Blog Article

1. Create folder: `/blog/article-slug/`
2. Copy any existing article as a template
3. Update: title, meta description, canonical URL, category badge, date, body content, tags
4. Add the card to `/blog/index.html`
5. Add the URL to `sitemap.xml`
6. Add an entry to `search.json`

---

## Modify Colors

All colors are CSS custom properties in `/assets/css/main.css` (top of file):

```css
:root {
  --cream: #FAF8F4;        /* Page background */
  --red: #C41E3A;          /* Philadelphia red — primary accent */
  --olive: #6B7C5C;        /* Olive green — secondary accent */
  --charcoal: #1A1A1A;     /* Main text */
  --border: #E8E4DD;       /* Dividers and borders */
}
```

Change any value and it updates sitewide instantly.

---

## Modify Fonts

Fonts are loaded from Google Fonts in each HTML `<head>`. To change:

1. Go to fonts.google.com and generate a new `<link>` tag
2. Replace the Google Fonts `<link>` in each HTML file (or create a shared header include)
3. Update these CSS variables in `main.css`:
   ```css
   --font-head: 'Playfair Display', Georgia, serif;
   --font-body: 'Inter', system-ui, sans-serif;
   ```

---

## Optimize SEO

Each page already has:
- `<title>` tag
- `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`)
- Twitter Card tags
- `<link rel="canonical">`
- Schema.org structured data (homepage, review pages, article pages)
- `sitemap.xml` with priorities and change frequencies
- `robots.txt`

To optimize further:
- Add real images with descriptive `alt` attributes
- Add `og:image` tags pointing to actual photos
- Write unique meta descriptions for each page (already done — verify they're specific enough)
- Submit `sitemap.xml` to Google Search Console

---

## Add Real Images

Replace emoji placeholders with real photography:

```html
<!-- Replace this: -->
<div class="card__img"><div class="card__img-placeholder">🍕</div></div>

<!-- With this: -->
<div class="card__img">
  <img src="/assets/images/sorellina-diavolo.jpg" 
       alt="Diavolo pizza at Sorellina, Philadelphia" 
       loading="lazy" width="800" height="450">
</div>
```

Store images in `/assets/images/`. Use WebP format for best performance. Target <200KB per image.

---

## Future Article Ideas (SEO-optimized)

1. "Best Pizza Near Me in Philadelphia" — local SEO  
2. "Pizzeria Beddia Philadelphia Review" — high search volume  
3. "Tacconelli's Pizza Philadelphia Review" — iconic institution  
4. "Angelo's Pizzeria South Philly Review" — popular spot  
5. "What Is Tomato Pie? Philadelphia vs Trenton" — informational  
6. "Best Late Night Pizza Philadelphia" — practical guide  
7. "Pizza by the Slice Philadelphia: Where to Go"  
8. "Wood-Fired Pizza Philadelphia: The Complete Guide"  
9. "Philadelphia vs New York Pizza: An Honest Comparison"  
10. "Best BYOB Pizza Philadelphia"  
11. "Detroit Style Pizza Philadelphia: Where to Find It"  
12. "How to Make Neapolitan Pizza at Home (What We Learned)"  
13. "Best Pizza in Fishtown Philadelphia"  
14. "Cheap Pizza Philadelphia: Under $20 Per Person"  
15. "Best Pizza Near University City Philadelphia"  
16. "Philadelphia Pizza vs. Chicago Deep Dish: Different Planets"  
17. "Italian-American Food Culture in South Philadelphia"  
18. "Best Pizza Toppings Ranked: Our Definitive List"  
19. "Philadelphia Restaurant Week: Best Pizza Deals"  
20. "Natural Wine and Pizza Pairings: A Philadelphia Guide"  

---

## File Structure

```
thephillypizzaproject/
├── index.html                          # Homepage
├── robots.txt                          # SEO
├── sitemap.xml                         # SEO
├── search.json                         # Client-side search index
├── about/index.html
├── contact/index.html
├── privacy/index.html
├── guides/index.html
├── history/index.html
├── reviews/
│   ├── index.html
│   └── sorellina/index.html            # ← First review
├── rankings/index.html
├── blog/
│   ├── index.html
│   ├── best-pizza-philadelphia/
│   ├── history-tomato-pie/
│   ├── south-philly-pizza-tour/
│   ├── how-to-judge-pizza/
│   ├── hidden-gems/
│   ├── best-sicilian-pizza/
│   ├── best-new-york-style/
│   ├── oldest-pizza-shops/
│   ├── pizza-etiquette/
│   └── pizza-events-philadelphia/
└── assets/
    ├── css/main.css
    ├── js/main.js
    └── images/                         # Add your photos here
```

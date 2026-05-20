# Audit SEO tecnico - Home Permaline
**Agente:** HAWK - SEO Specialist
**Data:** 2026-05-20
**URL live:** https://keryxdesign.github.io/permaline-site/
**Codice:** `~/Documents/Claude/permaline-site/`

## 1. On-page SEO

**Title** (`BaseLayout.astro:12`): "PERMALINE® - La linea che protegge il progetto" - 53 char. Manca brand parent (Compassin) e keyword commerciale. Suggerimento: "PERMALINE | Accessi tecnici a filo parete e soffitto - Compassin" (62 char).

**Meta description** (`BaseLayout.astro:13`): 184 char, ok lunghezza ma 0 CTR-driver. Registro stile 3 (Bernbach) coerente col brand, ma in SERP italiana B2B competiamo con stile 1. Suggerimento: "Accessi tecnici a filo parete e soffitto per ambienti di alta finitura. Valvole, filtri, domotica integrati senza compromessi sulla superficie. Standard PERMALINE Compassin." (172 char).

**Canonical** (`BaseLayout.astro:17,30`): corretto. Attenzione: questo canonical fissera su github.io tutte le pagine che Google indicizza ora - vedi Migrazione.

**Open Graph / Twitter** (`BaseLayout.astro:34-43`): mancano `og:site_name`, `og:image:width/height/alt`, `twitter:image`.

**Heading**: H1 unico ok. L'H1 non contiene keyword commerciale ("accesso tecnico", "chiusura a filo"). Lo stile evocativo cliente e prioritario ma si puo rinforzare il context.

**Alt text**: ottimi sulle immagini hero. Logo header/footer ok.

**Link interni**: anchor descrittivi molto buoni.

## 2. Semantic HTML

- `<header>`, `<nav aria-label>`, `<main>`, `<footer>`, `<section>`: OK
- Mancano `<article>` su Manifesto e PencilCriterion (testi argomentativi auto-contenuti)
- Mancano `aria-labelledby` sulle section
- Section Hero senza h2 ok, ma andrebbe `aria-label="Introduzione PERMALINE"`
- Footer: `<p class="eyebrow">` "Contatti" e "Social" (`Footer.astro:23, 54`) andrebbero convertiti in `<h2>` o `<h3>`
- Pulsante mobile menu (`Header.astro:50-61`): manca `aria-expanded` e `aria-controls`
- Slider hero: manca `aria-roledescription="carousel"` e `aria-live`

## 3. Schema markup (JSON-LD pronto)

Da inserire in `BaseLayout.astro` prima di `</head>` (riga 51).

```html
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.compassin.it/#organization",
      "name": "Compassin",
      "url": "https://www.compassin.it/",
      "logo": "https://keryxdesign.github.io/permaline-site/logo/compassin.png",
      "sameAs": [
        "https://www.instagram.com/chiusure_a_filo_compassin",
        "https://www.youtube.com/@AFILOdiCOMPASSiN",
        "https://chiusureperimpianti.it"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+39-375-571-8600",
        "contactType": "technical support",
        "email": "supporto@compassin.it",
        "areaServed": "IT",
        "availableLanguage": ["Italian"]
      }
    },
    {
      "@type": "Brand",
      "@id": "https://keryxdesign.github.io/permaline-site/#brand",
      "name": "PERMALINE",
      "logo": "https://keryxdesign.github.io/permaline-site/logo/permaline.svg",
      "parentOrganization": { "@id": "https://www.compassin.it/#organization" }
    },
    {
      "@type": "Product",
      "@id": "https://keryxdesign.github.io/permaline-site/#product",
      "name": "PERMALINE",
      "category": "Accessi tecnici a filo parete e soffitto",
      "description": "Standard di accesso tecnico di precisione per ambienti ad alta finitura. Sportelli di ispezione, accessi a valvole, filtri e domotica progettati per scomparire nella superficie e restare precisi nel tempo.",
      "brand": { "@id": "https://keryxdesign.github.io/permaline-site/#brand" },
      "manufacturer": { "@id": "https://www.compassin.it/#organization" },
      "image": [
        "https://keryxdesign.github.io/permaline-site/img/hero-1.png",
        "https://keryxdesign.github.io/permaline-site/img/hero-2.png",
        "https://keryxdesign.github.io/permaline-site/img/hero-3.png"
      ],
      "url": "https://keryxdesign.github.io/permaline-site/"
    },
    {
      "@type": "WebSite",
      "@id": "https://keryxdesign.github.io/permaline-site/#website",
      "url": "https://keryxdesign.github.io/permaline-site/",
      "name": "PERMALINE",
      "inLanguage": "it-IT",
      "publisher": { "@id": "https://www.compassin.it/#organization" }
    }
  ]
})} />
```

Nota: NIENTE `searchAction` (no ricerca interna), NIENTE `aggregateRating`/`offers` (Permaline e standard, non SKU comprabile online).

**BreadcrumbList**: solo sulle landing figlie. **FAQPage**: sulla /faq quando arriva il contenuto.

## 4. Keyword strategy preliminare (Fase 1)

Volumi NON inseriti, da validare con Search Console + SEMrush/Ahrefs.

**Cos'e PERMALINE** (informazionale)
- "accessi tecnici a filo parete"
- "chiusure a filo per impianti"
- "sportelli di ispezione invisibili"

**Architetti** (commerciale decisore progetto)
- "sportelli ispezione design alta finitura"
- "accessi tecnici per progetti residenziali alto di gamma"
- "chiusure invisibili impianti architettura"

**Imprese** (operativo posatore)
- "posa sportelli ispezione a filo intonaco"
- "chiusure tecniche per cartongesso a filo"
- "sportello tecnico parete con sistema di posa"

**Cannibalizzazione con chiusureperimpianti.it**: da NON ripetere su permaline.it: articoli educational generici, glossari tecnici di categoria, comparazione tecnologie di chiusura. Permaline.it = brand standard, decisori, prodotto, caso applicativo. Blog resta hub informazionale.

## 5. Tech issues GitHub Pages

**Sitemap**: presente e corretta. Solo home perche le altre pagine non esistono.

**robots.txt**: ASSENTE. In fase temp questo e il problema piu serio.

**Indicizzazione attuale**: il sito E indicizzabile. RACCOMANDAZIONE FORTE: noindex finche non si migra.

Fix immediato - aggiungere in `BaseLayout.astro:30`:
```html
<meta name="robots" content="noindex, nofollow" />
```

E creare `public/robots.txt`:
```
User-agent: *
Disallow: /

Sitemap: https://keryxdesign.github.io/permaline-site/sitemap-index.xml
```

**Issue secondario**: link in menu puntano a pagine non ancora costruite. Producono 404. Quick fix: o costruire stub minimi o nascondere le voci di menu.

## 6. Migrazione futura a permaline.it

**NON fare adesso**:
1. NON indicizzare github.io (302 redirect cross-domain non supportato)
2. NON costruire link esterni verso github.io
3. NON cambiare URL slug tra ora e migrazione
4. NON impostare canonical che punta a permaline.it

**Al momento migrazione**:
1. Cambiare `astro.config.mjs` site + rimuovere base
2. Rimuovere noindex + robots Allow
3. Verificare link interni con withBase()
4. Submit sitemap a Search Console
5. Internal linking da chiusureperimpianti.it
6. DNS CNAME + HTTPS Let's Encrypt
7. Test 404 con Screaming Frog

## Lista prioritizzata fix

**ALTO impatto - 48h**
- Meta noindex,nofollow + robots.txt Disallow (CRITICO: stiamo indicizzando github.io)
- JSON-LD Organization+Brand+Product+WebSite
- Risolvere link menu rotti (stub o hide)

**MEDIO impatto - settimana 1-2**
- Title + meta description con keyword commerciali
- og:site_name, twitter:image
- aria-labelledby + aria-expanded
- `<article>` su Manifesto/PencilCriterion
- `<h2>` semantici in footer
- Self-host Inter via @astrojs/font

**BASSO impatto / pre-migrazione**
- BreadcrumbList sulle landing
- FAQPage schema
- Keyword research validata
- Crawl chiusureperimpianti.it per overlap concreto
- `<picture>` srcset hero

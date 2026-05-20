# Audit PIXEL — Permaline home + Design System Fase 1

Audit live `https://keryxdesign.github.io/permaline-site/` + sorgente `~/Documents/Claude/permaline-site/`.
Skill applicate: frontend-design, brand-guidelines, ui-ux-pro-max.

---

## A. Audit home

### 1. Coerenza spaziale
Padding sezione oggi: Hero `pt-12 md:pt-20 pb-12 md:pb-16`, Manifesto/Pencil/Smistamento `py-16 md:py-24`. Hero asimmetrico, le altre uniformi. Container: Hero/Smistamento `max-w-7xl`, Manifesto/Pencil `max-w-3xl`. Va bene ma non e dichiarato. Gap card: `gap-5 md:gap-6` (Smistamento) vs `gap-10 lg:gap-12` (Hero). Serve **scala unica** (vedi token §B2).

### 2. Gerarchia tipografica
H1 hero `text-4xl sm:text-5xl lg:text-6xl`. H2 Manifesto `text-3xl md:text-4xl lg:text-5xl` (3 step). H2 Pencil/Smistamento `text-3xl md:text-4xl` (2 step). H3 card Smistamento `text-2xl md:text-3xl`. Manifesto e piu grande di Pencil pur essendo stesso livello: incoerente. Body oscilla tra `text-lg`, `text-base md:text-lg`, `text-lg md:text-xl`. Necessita **scala fissa** con clamp().

### 3. Responsive
- Hero: `grid lg:grid-cols-12` significa che fino a 1024px immagine e testo sono stackati. Ok mobile, ma su tablet 768-1023 si spreca larghezza. Suggerito breakpoint `md:` a 2 colonne con immagine piu piccola.
- Slider hero: aspect `4/3` su mobile, `5/4` da md+. PNG 1.7-5.7MB serviti a tutti i device anche su 375px: spreco enorme.
- Smistamento card: `md:grid-cols-2`, su tablet stretto le due card affiancate diventano testi compressi. Considerare break a `lg:`.
- Header desktop a `lg:` (1024+): tra 768 e 1023 vede solo logo + hamburger + CTA Supporto. Funziona ma e spartano per tablet.
- Nessuna rottura strutturale rilevata, ma `max-w-xl` su colonna hero blocca il titolo su mobile a una larghezza inferiore al viewport: ok perche c'e il padding ester​no, da verificare a 320px.

### 4. Accessibilita (contrasti WCAG calcolati)
| Coppia | Ratio | Esito |
|---|---|---|
| graphite `#76777A` su paper `#FAFAF7` | 4.28 | FAIL AA body, pass solo large 18px+ |
| graphite su bone `#F4F3EE` | 4.03 | FAIL AA body |
| charcoal `#373A36` su paper | 11.03 | PASS |
| charcoal su bone | 10.38 | PASS |
| ink `#1A1C1A` su paper | 16.39 | PASS |
| accent `#2F6B4A` su paper | 6.04 | PASS |
| white/70 su charcoal | 5.50 | PASS |
| white/60 su charcoal | 4.05 | FAIL body |

**Problema reale**: `text-[var(--color-graphite)]` usato in Hero (`leading-relaxed mb-8`) e in Pencil (paragrafo finale `text-lg`) per body 16-18px. Sotto 18.66px non passa AA. Stessa cosa eyebrow `text-graphite` a 12px (eyebrow accetta AA large solo a 14px+ bold: bold aiuta, ma 12px regular no). Fix: usare `--color-charcoal` con opacita `/75` invece di graphite per body secondario; tenere graphite solo per testi >=18px.

Altri punti:
- **Focus visibili**: NESSUN elemento ha `focus-visible:` esplicito. Header link, slider dots, card link, CTA: navigazione tastiera invisibile. Critico.
- **Slider dots**: `aria-label` ok, ma manca `role="tablist"` o equivalente, manca `aria-current`, e bottoni non hanno bordo visibile su sfondo chiaro (sono bianchi su immagini variabili — se slide chiara diventano invisibili).
- **Hit target**: dots `h-1.5` (6px). Sotto i 44px minimi. Aumentare area cliccabile con padding invisibile.
- **Hamburger** `h-10 w-10` = 40px, sotto soglia 44. Portare a `h-11 w-11`.
- **Mobile menu**: toggle non aggiorna `aria-expanded`, non chiude su Escape, non blocca scroll. Migliorabile.
- **Alt text**: hero alt descrittivi ok. Logo Compassin footer ha alt `COMPASSiN` ok. Slider dots aria-label ok. Nessuna immagine senza alt rilevata.

### 5. Performance
- **Hero PNG**: 1.7+1.0+5.7+1.5 = ~10MB totali, tutti serviti a qualunque viewport. Conversione a AVIF/WebP con `srcset` riduce >85%. `hero-3.png` 5.7MB e un blocker reale di LCP su 4G.
- **Layout shift slider**: l'aspect-ratio container e fissato, quindi CLS dovrebbe essere 0. OK.
- **Font**: Google Fonts caricato con `display=swap` + preconnect: ok, ma 5 pesi (300/400/500/600/700) e' molto. Usati realmente 400/500/600/700 (verificare 300). Considerare self-host woff2 subset latin.
- **Slider autoplay 5s**: continua all'infinito anche se utente non interagisce e non rispetta `prefers-reduced-motion`. Aggiungere stop su `(prefers-reduced-motion: reduce)` e su tab non visibile (`document.visibilitychange`).
- **Lazy loading**: `loading="lazy"` solo dai slide 2+: corretto.

---

## B. Design System minimale (Fase 1)

### 1. Token tipografici (estendere `global.css`)

```css
@theme {
  /* type scale con clamp - mobile -> desktop */
  --text-eyebrow: 0.75rem;          /* 12px fissi, bold */
  --text-body-sm: clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem);
  --text-body:    clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);
  --text-lead:    clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem);
  --text-h3:      clamp(1.5rem, 1.3rem + 0.9vw, 1.875rem);   /* 24->30 */
  --text-h2:      clamp(1.875rem, 1.5rem + 1.7vw, 2.5rem);   /* 30->40 */
  --text-h1:      clamp(2.5rem, 1.9rem + 2.9vw, 3.75rem);    /* 40->60 */

  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.55;
}
.h1{font-size:var(--text-h1);line-height:var(--leading-tight);letter-spacing:-0.02em;font-weight:600;color:var(--color-charcoal)}
.h2{font-size:var(--text-h2);line-height:var(--leading-tight);letter-spacing:-0.018em;font-weight:600;color:var(--color-charcoal)}
.h3{font-size:var(--text-h3);line-height:var(--leading-snug);letter-spacing:-0.012em;font-weight:600;color:var(--color-charcoal)}
.lead{font-size:var(--text-lead);line-height:var(--leading-normal);color:rgb(55 58 54 / 0.92)}
.body{font-size:var(--text-body);line-height:var(--leading-normal);color:rgb(55 58 54 / 0.85)}
```

### 2. Token spaziali (scala 0-12, base 4px)
`0=0, 1=4, 2=8, 3=12, 4=16, 5=24, 6=32, 7=40, 8=48, 9=64, 10=80, 11=96, 12=128`.
Padding sezione standard: **`py-7 md:py-10 lg:py-11`** (40/80/96). Gap card standard: **`gap-5 md:gap-6`** (24/32). Container padding orizzontale: **`px-5 md:px-8`** (gia coerente in tutti i componenti, mantenere).

### 3. Componenti riutilizzabili da creare (`src/components/ui/`)

- **`Section.astro`**: wrapper con `<section>`, props `tone` (`paper|bone|charcoal`), `bordered` (boolean per `border-y border-mist`), `id`. Applica padding sezione standard.
- **`Container.astro`**: props `size` (`narrow=max-w-3xl` per testo, `default=max-w-5xl` per misti, `wide=max-w-7xl` per griglie). Padding x standard.
- **`Eyebrow.astro`**: slot, prop `tone` (`graphite|accent|on-dark`). Usa la classe `.eyebrow` esistente.
- **`Button.astro`**: props `variant` (`primary|secondary|ghost`), `size` (`md|lg`), `href`, `external`. Primary = charcoal pill, Secondary = bordo charcoal, Ghost = solo testo + freccia. **Sempre con `focus-visible:outline-2 outline-offset-2 outline-[var(--color-accent)]`** e min-height 44px.
- **`Card.astro`**: props `tone` (`light|bone|dark`), `interactive` (boolean), slot eyebrow/title/body/cta. `rounded-2xl border p-7 md:p-8`. Hover su interactive: bordo charcoal o sfondo ink.
- **`List.astro`** + **`ListItem.astro`**: lista con marker custom CSS (linea hairline 12px o numero in eyebrow uppercase). **Niente bullet unicode**, niente emoji. Usare `::marker` o `<span>` con `--color-line`.

Esempio marker numerato:
```css
.list-numbered{counter-reset:item;list-style:none;padding:0}
.list-numbered li{counter-increment:item;display:grid;grid-template-columns:2.5rem 1fr;gap:1rem;padding:1rem 0;border-top:1px solid var(--color-line)}
.list-numbered li::before{content:counter(item,decimal-leading-zero);font-size:0.75rem;letter-spacing:0.18em;font-weight:600;color:var(--color-graphite);padding-top:0.25rem}
```

### 4. Pattern alternanza sfondi (ritmo verticale)
Sequenza consigliata per ogni pagina Fase 1: **paper -> bone (bordered) -> paper -> charcoal (CTA finale) -> footer**. Mai 2 bone consecutivi. La sezione charcoal in fondo gioca da rinforzo e prepara al footer dark. Manifesto e Pencil oggi rispettano (paper -> bone). Replicare lo schema in Architetti/Imprese/Cos'e.

### 5. Pattern lista
- **Lista descrittiva**: hairline divider tra item, niente bullet, marker numerico opzionale a sinistra.
- **Lista feature**: griglia di Card piccole (3-4 colonne desktop, 1 mobile), eyebrow + titolo breve + 2 righe.
- **Bullet inline**: se serve davvero, usare `<span aria-hidden>—</span>` no, **errore: em dash vietata da memoria globale**. Usare trattino corto `-` o pallino CSS `::before{content:"";width:6px;height:6px;background:var(--color-charcoal);border-radius:50%}`.

---

## C. Quick win (implementabili subito, prima di costruire le altre pagine)

1. **Comprimi gli hero PNG** -> AVIF + WebP con `srcset`. `hero-3.png` da 5.7MB e prioritario. Target <150KB per immagine a 1600px. File: `public/img/`, poi aggiornare `src/components/Hero.astro` righe 53-67 a `<picture><source type="image/avif" srcset="...">...</picture>`. Aggiungere `fetchpriority="high"` al primo slide.

2. **Fix contrasto body**: in `Hero.astro` riga 26 e `PencilCriterion.astro` riga 28 sostituire `text-[var(--color-graphite)]` con `text-[var(--color-charcoal)]/75`. Tenere graphite solo per eyebrow bold o per lead >=18px.

3. **Focus-visible globale**: aggiungere a `global.css`:
   ```css
   :where(a,button,[role="button"]):focus-visible{outline:2px solid var(--color-accent);outline-offset:3px;border-radius:6px}
   ```
   Risolve tastiera su tutto il sito in 4 righe.

4. **Slider accessibile + reduced-motion**: in `Hero.astro` script (righe 93-135) aggiungere:
   - check `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;` prima di `start()`
   - pausa autoplay su `document.hidden`
   - `aria-current="true"` sul dot attivo
   - aumentare hit area dots con `p-2` invisibile e `bg-clip-content`.

5. **Hamburger 44px + aria-expanded**: in `Header.astro` riga 52 portare a `h-11 w-11` e nello script (riga 96) aggiungere `toggle.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true')` + chiusura su `Escape`.

(bonus 6) **Self-host Inter subset latin** in `public/fonts/` con `font-display:swap` e rimuovere il peso 300 se non usato: -1 round-trip a Google e -30KB su font payload.

---

**File rilevanti per next step (creare i componenti UI):**
- `/Users/davidefilippini/Documents/Claude/permaline-site/src/components/ui/` (da creare)
- `/Users/davidefilippini/Documents/Claude/permaline-site/src/styles/global.css` (estendere token)
- `/Users/davidefilippini/Documents/Claude/permaline-site/src/components/Hero.astro` (quick win 1-2-4)
- `/Users/davidefilippini/Documents/Claude/permaline-site/src/components/Header.astro` (quick win 5)
- `/Users/davidefilippini/Documents/Claude/permaline-site/src/components/PencilCriterion.astro` (quick win 2)

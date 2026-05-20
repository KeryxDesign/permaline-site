# AUDIT DRD - PERMALINE Home
**Agente:** LORI - Direct Response Designer
**Data:** 2026-05-20
**Oggetto:** Home Permaline live + sorgenti `src/components/*.astro`

## 1. Leggibilità sezione per sezione

### Hero (`Hero.astro`)
- **Misura della riga**: colonna copy in `max-w-xl` (576px) dentro `lg:col-span-6` su grid a 12 colonne con `gap-12`. Body a `text-base md:text-lg` (16-18px) su 576px = circa 70-78 caratteri per riga su desktop. **Sopra il range Whieldon 40-60**. Su mobile (sotto sm) la colonna è full-width ma il copy resta breve, quindi ok.
- **Contrasto tipografico**: H1 `text-6xl` (60px) → subhead `text-xl` (20px) → body `text-lg` (18px). Salto H1→subhead corretto, ma subhead→body è troppo piatto (20→18px). Manca uno scalino chiaro.
- **Peso font**: tutto Inter 400/500/600. `font-medium` sul subhead + `font-semibold` (600) sulle CTA. Heading a 600 + `letter-spacing: -0.02em` (`global.css:36`) - ok, ma 600 è leggero per un H1 da 60px. Lori Haller indica peso forte (700+) per headline DR. Qui resta editoriale.
- **Leading**: H1 a `leading-[1.05]` = 63px su 60px font = corretto (tight). Body a `leading-relaxed` (1.625) = generoso, leggibile.
- **Muri di testo**: nessuno. Hero ben spaziato.

### Manifesto (`Manifesto.astro`)
- **Misura della riga**: container `max-w-3xl` (768px) - 40px padding = circa 728px. Body `text-lg` (18px) = 85-95 caratteri per riga su desktop. Fuori range, troppo larga. Su 2K/4K diventa molto fastidiosa.
- **4 paragrafi consecutivi (righe 12-30)** con stessa dimensione, stesso peso, stessa interlinea. Il pattern "Quando un architetto... Quando un posatore... Quando un committente..." è un'anafora forte nel copy che la grafica non sottolinea: i tre paragrafi sono indistinguibili visivamente. Eye flow piatto.
- **Contrasto H2/body**: H2 `text-5xl` con `block text-[var(--color-graphite)]` sulla seconda riga = gerarchia interna ottima. Pattern dual-tone Haller.
- **Box "Linea costante / Linea irregolare"** (righe 32-47): qui sta il cuore drammatico del messaggio commerciale e visivamente è due card neutre uguali. Manca la drammatizzazione visiva del criterio.

### PencilCriterion (`PencilCriterion.astro`)
- **Misura della riga**: stesso `max-w-3xl` = stesso problema riga troppo lunga.
- **Underline animata** sotto "linea di matita" (righe 10-13): `h-px` (1px) - letteralmente la linea di matita del messaggio commerciale è invisibile. Questo è IL momento visivo della pagina e passa inosservato.
- **Box centrale claim** (righe 21-26): peso visivo basso. Border 1px + bg white su bone, padding 6-8. Per essere il "criterio assoluto" dovrebbe avere più presenza.

### Smistamento (`Smistamento.astro`)
- Card simmetriche Architetto/Impresa = corretto da PM (due percorsi). Card scura/chiara crea contrasto. Buono.
- Body card a `text-base md:text-lg` su card di `max-w-7xl` / 2 col = circa 500-540px = 60-70 cpr, dentro il range.

## 2. Eye flow + gerarchia

**Test 3 secondi (desktop)**: l'occhio cade su H1 "La linea che protegge il progetto" → carosello (forte attrazione visiva, 50% dello spazio) → CTA "Sono un architetto" (nera) → "Ho un'impresa" (outline, secondaria).

**Problema 1**: il carosello a destra ruba attenzione al copy. Foto cantieri belle + animazione opacity 1s ogni 5s = movimento che disturba la lettura della headline. Lori Haller: immagini secondarie al copy, mai concorrenti.

**Problema 2**: due CTA con peso quasi pari (nera piena vs outline nera). Va bene per evitare di forzare un percorso, ma sopra 1024px l'occhio salta direttamente alla CTA senza leggere il subhead. Manca uno scalino di motivazione tra promessa e azione.

**Scansione sequenziale Hero → Manifesto → Pencil → Smistamento**: regge perché c'è `pencil-line` divisoria (riga 90 Hero) e cambio bg `paper`→`paper`→`bone`→`paper`. Buono il ritmo di sfondo. Smistamento chiude bene con due card scelta.

## 3. Rinforzo emotivo del copy

**"C'è un punto del cantiere che parla da solo"** (Manifesto riga 7): copy nudo. Nessun visual sopra/sotto che mostri questo "punto". Né un'immagine zoom di un accesso a filo, né un dettaglio fotografico di una linea ben fatta vs male fatta. Il copy promette una rivelazione visiva e la pagina non la consegna.

**"Linea costante / Linea irregolare"**: drammatizzazione visiva assente. Le due card sono indistinguibili tranne il bg. Dovrebbero contenere una rappresentazione grafica della linea stessa: un tratto sottile e perfetto vs un tratto irregolare.

**"linea di matita" underline a 1px**: bell'idea concettuale, esecuzione sotto-scala. Andrebbe a 2px minimo + colore charcoal pieno, o trattata come segno grafico evidente.

## 4. Anti-pattern DRD

- **Carosello hero auto-play 5s**: distrae, abbassa tempo di lettura headline.
- **Riga troppo lunga in Manifesto + Pencil** (85-95 cpr): fuori dal range 40-60.
- **Capilettera assenti**: in un manifesto narrativo di 4 paragrafi, un capolettera al primo paragrafo aumenterebbe lettura del 13% (Ogilvy).
- **Box claim Pencil con peso troppo leggero**: il momento "criterio assoluto" non si vede come tale.

## 5. Raccomandazioni prioritizzate

**ALTO - 1. Drammatizzare visivamente "linea costante vs irregolare"** (Manifesto.astro 32-47).
Dentro ogni card aggiungere un SVG inline che mostri il concetto: card sinistra una linea perfettamente dritta 2px charcoal; card destra una path SVG con micro-irregolarità (3-4 nodi sfalsati di 1-2px). Stesso colore, solo la geometria cambia. Il messaggio commerciale diventa autodimostrante.

**ALTO - 2. Restringere misura riga in Manifesto + PencilCriterion**.
Cambiare `max-w-3xl` (768px) in `max-w-2xl` (672px). Porta i caratteri per riga a 65-75. Modifica di 1 token Tailwind in 2 file.

**ALTO - 3. Pencil-underline da 1px a 2px + estensione del segno** (PencilCriterion.astro riga 12).
Da `h-px bg-[var(--color-charcoal)]` a `h-0.5 bg-[var(--color-ink)]` con leggera estensione (left -0.5 right -0.5).

**MEDIO - 4. Differenziare il box claim PencilCriterion** (righe 21-26).
Aggiungere bordo sinistro più spesso (`border-l-4 border-[var(--color-charcoal)]`) o spostarlo su fondo `--color-ink` con testo bone. È la frase-criterio del prodotto, deve avere presenza tipo pull-quote.

**MEDIO - 5. Pausare il carosello hero o ritardare il primo cambio** (Hero.astro 93-134).
Almeno: ritardare il primo cambio da 5s a 10-12s, oppure stop on hover sull'area. La headline ha bisogno di 6-8s di lettura indisturbata. In alternativa rimuovere autoplay e affidarsi ai dots (controllo utente). Mantiene la promessa cliente "niente effetti inutili".

**BASSO - 6. Capolettera primo paragrafo Manifesto** (riga 12).
Drop cap su "La" del primo paragrafo, charcoal, due righe.

---

**Note per PIXEL**: tutti i punti sono modifiche locali ai componenti esistenti, senza riscritture, senza nuovi asset.

# fromThoughts — Inbound Strategie

*Opgesteld: februari 2026 | Fase: parallel aan outbound, prioriteit 2*

> De inbound strategie is bewust een tweede prioriteit in fase 1. Outbound + design partners is de primaire route naar de eerste 10 klanten. Inbound is de parallelle investering die in 2027 volume toevoegt. Beide zijn nodig — maar in de juiste volgorde.

---

## De kernobservatie

Het ICP zoekt niet naar "sales management software." Ze weten niet dat dat hun probleem is. Ze zoeken naar antwoorden op een specifieke pijn:

- *"Mijn salesrep haalt zijn targets niet — wat doe ik nu?"*
- *"Hoe weet ik of mijn rep underperformt of dat het mijn proces is?"*
- *"Ik sluit nog steeds elke deal zelf terwijl ik een rep heb — wat gaat er mis?"*

Inbound werkt alleen als je die exacte zoekvraag of dat exacte gesprek onderschept op het moment dat de pijn het hoogst is. Alles wat over fromThoughts-als-product praat, werkt niet — er is nog geen categorie waar founders naar zoeken.

**De inbound strategie is gebouwd op één principe:** wees aanwezig op het moment dat een founder zijn specifieke probleem herkent, niet op het moment dat hij een oplossing zoekt.

---

## Prioriteit 1 — Gratis diagnostisch tool op de website

**Bouw dit eerst. Hoogste ROI, direct waarde, snel te realiseren.**

### Optie A: Pipeline Reality Check (aanbevolen)

Een interactieve calculator die live op de website staat:

**Input:**
- ARR-target dit kwartaal
- Gemiddelde ACV (€)
- Win rate (%)
- Huidige pipeline waarde (€)
- Aantal actieve deals

**Output:**
- Realistische pipeline waarde na slippage-correctie (default: 40% slippage, aanpasbaar)
- Aantal qualified opportunities dat nog nodig is
- Of de rep genoeg activiteit heeft om het gat te dichten
- Specifieke observatie: "Je pipeline ziet er gezond uit maar 60% van je deals heeft geen volgende stap vastgelegd — dat is het probleem."

**Waarom dit werkt:**
- De ICP ervaart precies dit op maandagmiddag in HubSpot
- Het is deelbaar — founders sturen dit naar co-founder, investor of rep
- Het vangt een e-mailadres voor de volledige output of om resultaten op te slaan
- Het demonstreert de denklaag van fromThoughts zonder iets te pitchen
- Bouwbaar in 2–3 dagen in de bestaande Next.js stack

### Optie B: Sales Hire Readiness Score

De PMF-kwalificatievragen uit `docs/strategy/icp-assumptions.md` omgebouwd naar een interactief 8-vragenformat. Founder krijgt een score + specifieke diagnose over of ze klaar zijn voor een eerste hire — of wat er eerst opgelost moet worden.

**Bereikt:** pre-hire ICP én post-hire ICP die terugkijkt op hun hiring beslissing.

### Overlap met bestaande tools — lees dit eerst

**Niet bouwen tot gevalideerd in gesprekken.**

De bestaande "Build Your Revenue Roadmap" forecast tool doet al een deel van wat de Pipeline Reality Check zou doen: het berekent de revenue gap, vergelijkt met benchmarks, en geeft een gap analysis. Het Opportunities dashboard is al de wekelijkse recurring engagement mechanic — Ranjith reviewt de pipeline, founders checken hun curated lijst.

Het verschil in theorie: de bestaande tool is strategisch en eénmalig (OKRs, executieplan), de calculator zou tactisch en wekelijks zijn (is mijn pipeline deze week gezond?). Maar of founders die wekelijkse calculator daadwerkelijk willen — en of ze hem buiten het product om zouden gebruiken als inbound tool — is een aanname, geen vastgesteld feit.

**Bouw dit alleen als:** in gesprekken met design partners of prospects blijkt dat ze specifiek een zelfstandige, snelle pipeline check willen — los van het volledige onboarding-traject. Dan is er vraag bewezen. Niet eerder.

### Implementatie (als gevalideerd)

- Geen e-mail vereist voor basisresultaat (verlaagt drempel)
- E-mail vereist voor gedetailleerde output of om op te slaan
- E-mail gaat naar Mailchimp/Resend lijst → handmatige follow-up van Ranjith in fase 1
- Geen geautomatiseerde sales sequence — persoonlijk bericht na 48 uur

---

## Prioriteit 2 — LinkedIn thought leadership

LinkedIn is het juiste kanaal. Dutch B2B founders zijn er actief en lezen het écht. Geen Twitter, geen Instagram, geen YouTube.

### Wat werkt — en wat niet

**Niet:**
> *"fromThoughts helpt founders met hun sales transitie 🚀 Boek een demo!"*

**Wel:**
> *"Een founder belde me vorige week. Rep had drie weken geen deal laten vorderen. Hij dacht: mensen probleem. Ik vroeg: wat moest je rep op maandagochtend doen? Stilte. Dat is geen people problem. Dat is een process problem. Hier is hoe je het verschil herkent:"*

Het format dat werkt voor dit ICP:
- Herkenbare situatie (ze denken: dat is bij mij ook zo)
- Specifieke observatie of inzicht
- Concrete conclusie of actie
- Geen CTA naar product in de post zelf

### Cadans en bronnen

**1–2 posts per week.** Niet meer — kwaliteit boven volume.

Bronmateriaal zit al in de docs:
- `docs/strategy/sales-manager-scope.md` — concrete taken die founders niet doen
- `docs/strategy/market-research-deep.md` — PMF als verborgen risico, Producer vs. Performer
- `docs/sales/sales-objections-playbook.md` — bezwaren als postmateriaal ("Founders zeggen vaak X — maar wat ze écht bedoelen is Y")
- Eigen gesprekken met Rikkert, Bas en toekomstige design partners — geanonimiseerd

Claude kan helpen met drafts. Ranjith geeft het zijn eigen stem. Publiceren en kijken wat landt — bijhouden welke posts de meeste reacties of DMs opleveren.

### Wat te meten

Niet likes. Niet bereik. Wel:
- Directe DMs van founders die zichzelf herkennen in de post
- Commentaren van mensen in het netwerk die iemand taggen
- Nieuwe connectieverzoeken van founders met de juiste profielen

---

## Prioriteit 3 — Drie strategische referrers

Geen affiliate-programma. Drie warme relaties met mensen die het ICP regelmatig zien op het moment van pijn.

**Wie:**

| Type | Voorbeeld in NL | Waarom |
|---|---|---|
| Seed investor | Peak Capital, Endeit, Newion, Volta Ventures | Zien portfolio-bedrijven worstelen met de sales hire transitie |
| Accountant / CFO-adviseur | Accountants die SaaS founders bedienen | Zien de P&L wanneer de rep zijn salary niet rechtvaardigt |
| Accelerator / scale-up programma | Rockstart, Yes!Delft, Dutch Founders Fund | Begeleiden founders actief in de groeifase |

**Aanpak:**

Eén gesprek per persoon. Geen pitch, geen provisie-afspraak (dat maakt het commercieel en dus ongemakkelijk). Alleen:

> *"Als je een founder ziet met deze situatie — eerste rep aangenomen, werkt nog niet — en ze hebben nog geen oplossing, zou ik het waarderen als je me noemt. Ik help ze begrijpen wat er mis gaat voordat ze te lang wachten."*

Dit werkt omdat:
- Het geen commitment vraagt
- Het ze iets geeft om te geven aan hun founders (een resource, niet een product)
- Het Ranjith positioneert als expert, niet als verkoper

**Wanneer:** Maart 2026, na eerste 2–3 design partner gesprekken. Dan is er al iets concreets te vertellen.

---

## Prioriteit 4 — Één definitief SEO-artikel

Een uitputtende gids in het Nederlands die verschijnt wanneer founders op hun specifieke zoekvraag zoeken.

**Primair artikel:**
*"De eerste salesrep aangenomen: wat nu? Een gids voor B2B founders"*

**Inhoud:**
- De concrete dingen die misgaan (met data uit `market-research-deep.md`)
- Hoe je een people problem onderscheidt van een process problem
- Hoe een goede wekelijkse rep review eruitziet
- Wanneer je moet ingrijpen (met de 6-weken PIP benchmark)
- Wat je de rep op maandagochtend geeft om op te focussen

**Wat dit niet is:** een promotional stuk over fromThoughts. Het is een genuïne resource die ook zonder fromThoughts bruikbaar is. De conversie komt van de link naar de Pipeline Reality Check aan het einde.

**Timing:** Q2 2026. Niet eerder — na de eerste klanten zijn er echte cases om in te verwerken, wat de geloofwaardigheid verhoogt.

**SEO-realisme:** Niche Dutch-language content rankt niet snel. Verwacht 6–12 maanden voor organische traffic. Dit is een langetermijninvestering, niet een snelle win.

---

## Wat niet te doen in fase 1

| Kanaal | Waarom niet |
|---|---|
| Paid advertising | Te vroeg, geen conversion data, te duur per lead in deze niche |
| Breed content calendar (3+ kanalen) | Energieverspilling — beter één kanaal goed dan drie kanalen matig |
| Product Hunt launch | Zonder gebruikers is dit een non-event |
| Podcast starten als host | Te veel productietijd voor te weinig bereik in fase 1 |
| Nieuwsbrief starten | Pas relevant als er een lijst is om naartoe te sturen |
| Twitter/X | Ranjith heeft geen presence, ICP zit er niet primair |

---

## De volgorde

| Wanneer | Actie | Verwacht resultaat |
|---|---|---|
| Maart 2026 | Pipeline Reality Check tool bouwen en live zetten | Eerste email captures, deelbaar asset |
| Maart 2026 | LinkedIn posts starten (1–2/week) | Bereik opbouwen, ICP-herkenning, DMs op termijn |
| Maart 2026 | 3 referrers benaderen | Warme inbound, snelste route naar kwalitatieve leads |
| Q2 2026 | Long-form SEO artikel schrijven | Na eerste klanten: echte cases verwerken, geloofwaardigheid |
| Q3 2026 | Meten wat werkt | Welk kanaal levert de meeste inbound DMs? Verdubbel daar op |

---

## Meting — wat telt

In fase 1 is de enige relevante metric: **hoeveel founders nemen zelf contact op via welk kanaal?**

Niet:
- Website traffic
- LinkedIn bereik
- Tool-gebruikers zonder follow-up

Wel:
- Inbound DMs of e-mails van founders die zichzelf herkennen
- Referrals van de drie strategische partners
- Tool-gebruikers die hun e-mailadres achterlieten én reageren op follow-up

Bijhouden in een simpele spreadsheet — welk kanaal, welke trigger, welke boodschap. Na 3 maanden is er genoeg data om te beslissen waar dubbel op ingezet wordt.

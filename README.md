# ☕ Rave Coffee — World Map

An interactive world map of my personal Rave Coffee subscription collection.  
Click any pin to open a card styled after the physical Rave Coffee tasting cards.

## Features

- **32 coffees** across 14 countries, plotted on an interactive world map
- **Card design** faithful to the real Rave Coffee physical cards — front and back
- **Flip cards** to see growing details: altitude, varietal, process, producer, roastery notes
- **Filter by region** — Africa, Americas, Asia, Blends
- **Pan & zoom** — mouse drag, scroll wheel, pinch-to-zoom on mobile
- **Rave colour palette** — dark roast black background, yellow accent, individual card colours

## Structure

```
rave-coffee-map/
├── index.html     # Main page — map, header, modal system
├── coffees.js     # All 32 coffees with coordinates, colours, metadata
├── map.js         # SVG map rendering, pin clustering, pan/zoom, card logic
└── README.md
```

## Usage

Just open `index.html` in any modern browser. No build step, no dependencies beyond Google Fonts.

Or host it on GitHub Pages:
1. Push to a GitHub repo
2. Go to **Settings → Pages → Source: main branch / root**
3. Done — your coffee map is live

## Cards

Each card shows:

**Front**
- Coffee name + country + N° number
- Roast level (bean pip icons, 1–5)
- Tasting notes
- Brew method checkboxes (Whole Bean ticked — subscription is whole bean)

**Back**
- Grown (region/farm)
- Altitude
- Varietal
- Process
- Producers
- Roastery notes

## The Collection

| N° | Coffee | Country | Roast | Tastes Like |
|---|---|---|---|---|
| 2 | The Italian Job Blend | Blend | Dark | Heavy Cocoa, Roasted Nuts |
| 3 | Mocha Java Blend | Blend | Medium/Dark | Chocolate, Earthy, Hazelnut |
| 4 | Espresso Blend | Blend | Dark | Toffee, Spice |
| 50 | El Carmen | Colombia | Medium/Dark | Caramel, Red Fruits |
| 53 | Monsoon Malabar | India | Dark | Chocolate, Smoky |
| 109 | Fazenda Campestre | Brazil | Medium | Molasses, Red Apple |
| 249 | Sasini | Kenya | Medium | Honey, Blackberry, Dark Chocolate |
| 252 | Bookkisa | Ethiopia | Light/Medium | Strawberry, Jasmine |
| 263 | Korongo | Tanzania | Dark | Black Tea, Toffee |
| 265 | Nueva Era | Guatemala | Medium | Blackberry, Hibiscus, Cocoa |
| 273 | Clarke Farm | Uganda | Dark | Black Cherry, Dark Chocolate |
| 291 | Mbili Twiga | Tanzania | Dark | Blackberry, Cocoa |
| 293 | Wahana Estate | Indonesia | Dark | Cinnamon, Cocoa, Brown Sugar |
| 294 | Terruño Nayarita | Mexico | Medium | Raspberry, Light Caramel |
| 301 | Asali AB | Kenya | Dark | Treacle, Blackcurrant, Dark Spice |
| 302 | Elver Coronel | Peru | Medium | Butterscotch, Vanilla |
| 304 | Racafé Crecer | Colombia | Dark | Black Cherry, Cola, Milk Chocolate |
| 310 | Acatenango | Guatemala | Medium | White Tea, Milk Chocolate |
| 313 | Coope Dota | Costa Rica | Medium | Apple, Cocoa, Butter Candy |
| 315 | Matagalpa | Nicaragua | Dark | Lemon, Toasted Almond |
| 316 | Clarke Farm | Uganda | Dark | Cassia, Black Cherry, Dark Chocolate |
| 318 | Hermosa Honey | Costa Rica | Medium | Brown Sugar, Apricot, Milk Chocolate |
| 319 | Sertãozinho Lot 574 | Brazil | Medium | Chai, Molasses |
| 321 | Viani | Colombia | Medium | Date, Milk Chocolate |
| 322 | Gito | Rwanda | Medium | Blackcurrant, Treacle, Bourbon |
| 324 | Permata Gayo | Indonesia | Dark | Cocoa, Cinnamon |
| 335 | Sertãozinho Lot 548 | Brazil | Medium | Cocoa Nib, Baked Apple |
| 337 | Simama | Ethiopia | Medium | Orange, Cocoa |
| 341 | Churupampa | Peru | Medium | Butter Candy, Molasses |
| 343 | Tarime Natural | Tanzania | Medium/Dark | Shortbread, Vanilla, Red Cherry Jam |
| 353 | Kebena | Ethiopia | Dark | Cherry, Dried Fruit, Dark Chocolate |
| 354 | Nyamsheke Hell's | Rwanda | Medium | Blackberry, Apricot, Maple Syrup |

---

Subscription by [Rave Coffee](https://ravecoffee.co.uk) — Cirencester, UK 🇬🇧

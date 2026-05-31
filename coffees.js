// Rave Coffee Collection — Data
// Card colours extracted from the physical card spread photo
// Each country gets coordinates for map pin placement

const COFFEES = [
  {
    id: 1,
    num: 291,
    country: "Tanzania",
    name: "Mbili Twiga",
    roast: 5, roastLabel: "Dark",
    flavours: ["Blackberry", "Cocoa"],
    region: "Africa",
    coords: { x: 553, y: 290 }, // Tanzania
    cardColor: "#C4863A", // warm tan/gold
    backColor: "#1E2B4A",
    grown: "Mbili Twiga Estate",
    altitude: "1,500m – 1,800m",
    varietal: "Bourbon",
    process: "Washed",
    producers: "Twiga Estate",
    roasteryNotes: "A bold and structured dark roast from Tanzania's highlands. The Mbili Twiga estate produces beans with exceptional depth — the blackberry note comes from the high-altitude fermentation, while cocoa develops through careful dark roasting. A coffee that rewards patience."
  },
  {
    id: 2,
    num: 50,
    country: "Colombia",
    name: "El Carmen",
    roast: 4, roastLabel: "Medium/Dark",
    flavours: ["Caramel", "Red Fruits"],
    region: "Americas",
    coords: { x: 238, y: 265 }, // Colombia
    cardColor: "#E8C84A", // yellow
    backColor: "#1E2B4A",
    grown: "El Carmen",
    altitude: "1,700m – 2,000m",
    varietal: "Caturra, Castillo",
    process: "Washed",
    producers: "Various smallholders",
    roasteryNotes: "El Carmen sits in Huila, one of Colombia's most celebrated coffee regions. The combination of volcanic soils and high altitude creates a coffee with natural sweetness — caramel from the controlled medium-dark roast, red fruits from the terroir itself."
  },
  {
    id: 3,
    num: 294,
    country: "Mexico",
    name: "Terruño Nayarita",
    roast: 3, roastLabel: "Medium",
    flavours: ["Raspberry", "Light Caramel"],
    region: "Americas",
    coords: { x: 175, y: 230 }, // Mexico
    cardColor: "#8B4A6B", // burgundy/plum
    backColor: "#1E2B4A",
    grown: "Nayarit",
    altitude: "900m – 1,200m",
    varietal: "Typica, Bourbon",
    process: "Washed",
    producers: "Terruño Collective",
    roasteryNotes: "Nayarit is an emerging coffee region on Mexico's Pacific coast. This lot showcases the brightness possible at medium roast — the raspberry is delicate and floral, fading into a gentle caramel finish. A versatile coffee that works beautifully as filter."
  },
  {
    id: 4,
    num: 313,
    country: "Costa Rica",
    name: "Coope Dota",
    roast: 3, roastLabel: "Medium",
    flavours: ["Apple", "Cocoa", "Butter Candy"],
    region: "Americas",
    coords: { x: 207, y: 268 }, // Costa Rica
    cardColor: "#5A4E8C", // purple/slate
    backColor: "#1E2B4A",
    grown: "Tarrazu",
    altitude: "1,500m – 1,900m",
    varietal: "Caturra",
    process: "Washed",
    producers: "Coope Dota cooperative",
    roasteryNotes: "Coope Dota is one of Costa Rica's oldest cooperatives, established in 1960. Their Tarrazu beans are processed at the co-op's own wet mill with exceptional precision. The apple note is characteristic of the region's clean, bright acidity."
  },
  {
    id: 5,
    num: 53,
    country: "India",
    name: "Monsoon Malabar",
    roast: 5, roastLabel: "Dark",
    flavours: ["Chocolate", "Smoky"],
    region: "Asia",
    coords: { x: 680, y: 245 }, // India
    cardColor: "#3A6B3E", // dark olive green
    backColor: "#1E2B4A",
    grown: "Malabar Coast",
    altitude: "500m – 1,100m",
    varietal: "S795, Robusta blend",
    process: "Monsooned (natural)",
    producers: "Various estates",
    roasteryNotes: "Monsooning is a unique Indian processing method where green beans are exposed to monsoon winds for several months, swelling them and mellowing the acidity dramatically. The result is a heavy, earthy, almost spice-forward coffee that is unlike anything else in the world."
  },
  {
    id: 6,
    num: 252,
    country: "Ethiopia",
    name: "Bookkisa",
    roast: 1, roastLabel: "Light/Medium",
    flavours: ["Strawberry", "Jasmine"],
    region: "Africa",
    coords: { x: 572, y: 262 }, // Ethiopia
    cardColor: "#D4556A", // coral/pink
    backColor: "#1E2B4A",
    grown: "Guji Zone",
    altitude: "1,900m – 2,200m",
    varietal: "Heirloom Ethiopian",
    process: "Natural",
    producers: "Bookkisa washing station",
    roasteryNotes: "Bookkisa is a natural-processed coffee from the Guji highlands of Ethiopia — the birthplace of coffee itself. Roasted at light/medium to preserve the extraordinary floral and fruit notes inherent to Ethiopian heirloom varieties. The strawberry and jasmine are not added; they are the coffee."
  },
  {
    id: 7,
    num: 273,
    country: "Uganda",
    name: "Clarke Farm",
    roast: 5, roastLabel: "Dark",
    flavours: ["Black Cherry", "Dark Chocolate"],
    region: "Africa",
    coords: { x: 551, y: 280 }, // Uganda
    cardColor: "#3A8C7A", // teal
    backColor: "#1E2B4A",
    grown: "Mount Elgon",
    altitude: "1,800m – 2,200m",
    varietal: "SL14, SL28",
    process: "Washed",
    producers: "Clarke Farm",
    roasteryNotes: "Mount Elgon sits on the Uganda-Kenya border at elevations that produce exceptional coffee. Clarke Farm has invested heavily in processing infrastructure, creating a dark roast with the kind of intensity — black cherry, bitter chocolate — that espresso drinkers dream of."
  },
  {
    id: 8,
    num: 302,
    country: "Peru",
    name: "Elver Coronel",
    roast: 3, roastLabel: "Medium",
    flavours: ["Butterscotch", "Vanilla"],
    region: "Americas",
    coords: { x: 247, y: 315 }, // Peru
    cardColor: "#5A8CC4", // blue
    backColor: "#1E2B4A",
    grown: "Cajamarca",
    altitude: "1,700m – 2,000m",
    varietal: "Bourbon, Typica",
    process: "Washed",
    producers: "Elver Coronel",
    roasteryNotes: "Elver Coronel is a single-producer lot from the Cajamarca region of northern Peru. The butterscotch and vanilla come from the slow-drying natural sugars in the bean. A gentle, crowd-pleasing medium roast that excels as both filter and a milky espresso base."
  },
  {
    id: 9,
    num: 265,
    country: "Guatemala",
    name: "Nueva Era",
    roast: 3, roastLabel: "Medium",
    flavours: ["Blackberry", "Hibiscus", "Cocoa"],
    region: "Americas",
    coords: { x: 196, y: 252 }, // Guatemala
    cardColor: "#D4556A", // pink
    backColor: "#1E2B4A",
    grown: "Fraijanes",
    altitude: "1,000m – 1,080m",
    varietal: "Catuai, Marsellesa, Pache, Sarchimor",
    process: "Natural",
    producers: "Jamie Sanchez & family",
    roasteryNotes: "Nueva Era processes both washed and natural coffees in Guatemala. This particular natural lot is grown in Finca Tololoche by Jamie Sanchez, his father and son. Because of the relatively low altitude, the drying times for natural coffees are only 10–12 days. The speed of drying creates a lower risk for producers in any over fermentation or spoiling. The result is a clean, sweet and fruity coffee that blends well with milk."
  },
  {
    id: 10,
    num: 263,
    country: "Tanzania",
    name: "Korongo",
    roast: 5, roastLabel: "Dark",
    flavours: ["Black Tea", "Toffee"],
    region: "Africa",
    coords: { x: 556, y: 295 }, // Tanzania (offset)
    cardColor: "#C4863A",
    backColor: "#1E2B4A",
    grown: "Mbeya Region",
    altitude: "1,400m – 1,700m",
    varietal: "Bourbon",
    process: "Washed",
    producers: "Korongo Estate",
    roasteryNotes: "Korongo translates to 'crane' in Swahili — a nod to the wildlife-rich wetlands surrounding this estate. The black tea character is distinctive for a dark roast, preserved through careful temperature profiling. The toffee sweetness lingers long after the cup."
  },
  {
    id: 11,
    num: 354,
    country: "Rwanda",
    name: "Nyamsheke Hell's",
    roast: 3, roastLabel: "Medium",
    flavours: ["Blackberry", "Apricot", "Maple Syrup"],
    region: "Africa",
    coords: { x: 542, y: 286 }, // Rwanda
    cardColor: "#C44A3A", // dark red
    backColor: "#1E2B4A",
    grown: "Nyamasheke District",
    altitude: "1,700m – 2,000m",
    varietal: "Red Bourbon",
    process: "Washed",
    producers: "Hell's Gate washing station",
    roasteryNotes: "Rwanda's Red Bourbon is one of the world's great coffee varieties, producing cup profiles of extraordinary clarity and fruit definition. Hell's Gate washing station sits beside Lake Kivu in the Nyamasheke district — the altitude and lake humidity creating the distinctive sweetness."
  },
  {
    id: 12,
    num: 353,
    country: "Ethiopia",
    name: "Kebena",
    roast: 5, roastLabel: "Dark",
    flavours: ["Cherry", "Dried Fruit", "Dark Chocolate"],
    region: "Africa",
    coords: { x: 576, y: 266 }, // Ethiopia (offset)
    cardColor: "#8B4A6B",
    backColor: "#1E2B4A",
    grown: "Sidama Zone",
    altitude: "1,800m – 2,100m",
    varietal: "Heirloom Ethiopian",
    process: "Natural",
    producers: "Kebena Cooperative",
    roasteryNotes: "Kebena is a natural-processed dark roast from Sidama — a bold, intensely fruit-forward coffee. Despite the dark roast, cherry and dried fruit notes remain vivid because natural processing deeply imprints the fruit character into the bean before roasting even begins."
  },
  {
    id: 13,
    num: 249,
    country: "Kenya",
    name: "Sasini",
    roast: 3, roastLabel: "Medium",
    flavours: ["Honey", "Blackberry", "Dark Chocolate"],
    region: "Africa",
    coords: { x: 562, y: 273 }, // Kenya
    cardColor: "#C4863A",
    backColor: "#1E2B4A",
    grown: "Kirinyaga",
    altitude: "1,650m – 1,900m",
    varietal: "SL28, SL34",
    process: "Washed",
    producers: "Sasini Estate",
    roasteryNotes: "Sasini is a large estate in Kirinyaga County, at the foot of Mount Kenya. Kenya's SL varieties — developed in the 1930s by Scott Laboratories — produce the country's famously bold, complex cup. The honey sweetness and blackberry brightness are classic Kenyan characteristics."
  },
  {
    id: 14,
    num: 318,
    country: "Costa Rica",
    name: "Hermosa Honey",
    roast: 3, roastLabel: "Medium",
    flavours: ["Brown Sugar", "Apricot", "Milk Chocolate"],
    region: "Americas",
    coords: { x: 210, y: 272 }, // Costa Rica (offset)
    cardColor: "#E8C84A",
    backColor: "#1E2B4A",
    grown: "West Valley",
    altitude: "1,400m – 1,700m",
    varietal: "Caturra, Catuai",
    process: "Honey",
    producers: "Hermosa Farm",
    roasteryNotes: "Honey processing — where some of the fruit mucilage is left on the bean during drying — adds a distinctive sweetness and body that washed coffees lack. Hermosa Farm's honey lot from Costa Rica's West Valley is a textbook example: sweet, full-bodied, and deeply satisfying."
  },
  {
    id: 15,
    num: 310,
    country: "Guatemala",
    name: "Acatenango",
    roast: 3, roastLabel: "Medium",
    flavours: ["White Tea", "Milk Chocolate"],
    region: "Americas",
    coords: { x: 193, y: 255 }, // Guatemala (offset)
    cardColor: "#5A8CC4",
    backColor: "#1E2B4A",
    grown: "Acatenango Valley",
    altitude: "1,600m – 2,000m",
    varietal: "Bourbon, Caturra",
    process: "Washed",
    producers: "Acatenango cooperative",
    roasteryNotes: "The Acatenango Valley sits in the shadow of one of Guatemala's most active volcanoes. The volcanic ash-enriched soils and consistent cloud cover create a microclimate that produces coffees of unusual delicacy — the white tea note is rare in a Guatemalan, a testament to the terroir."
  },
  {
    id: 16,
    num: 341,
    country: "Peru",
    name: "Churupampa",
    roast: 3, roastLabel: "Medium",
    flavours: ["Butter Candy", "Molasses"],
    region: "Americas",
    coords: { x: 244, y: 320 }, // Peru (offset)
    cardColor: "#3A6B3E",
    backColor: "#1E2B4A",
    grown: "Huánuco",
    altitude: "1,700m – 1,950m",
    varietal: "Bourbon, Caturra",
    process: "Washed",
    producers: "Churupampa farmers",
    roasteryNotes: "Churupampa is a small community in Peru's Huánuco region, where smallholder farmers have organised around quality processing. The butter candy sweetness is a hallmark of well-grown Peruvian coffee, and the molasses gives depth that makes this excellent as a filter coffee."
  },
  {
    id: 17,
    num: 337,
    country: "Ethiopia",
    name: "Simama",
    roast: 3, roastLabel: "Medium",
    flavours: ["Orange", "Cocoa"],
    region: "Africa",
    coords: { x: 569, y: 270 }, // Ethiopia (offset)
    cardColor: "#E8A84A", // warm orange
    backColor: "#1E2B4A",
    grown: "Yirgacheffe",
    altitude: "1,750m – 2,200m",
    varietal: "Heirloom Ethiopian",
    process: "Washed",
    producers: "Simama Cooperative",
    roasteryNotes: "Simama means 'stand' in Swahili — a name chosen to represent the producers' pride in their coffee. From Yirgacheffe, Ethiopia's most celebrated coffee district, this washed lot is roasted at medium to balance the bright citrus acidity with a gentle cocoa finish."
  },
  {
    id: 18,
    num: 324,
    country: "Indonesia",
    name: "Permata Gayo",
    roast: 5, roastLabel: "Dark",
    flavours: ["Cocoa", "Cinnamon"],
    region: "Asia",
    coords: { x: 748, y: 294 }, // Indonesia/Sumatra
    cardColor: "#8B4A6B",
    backColor: "#1E2B4A",
    grown: "Gayo Highlands, Aceh",
    altitude: "1,200m – 1,600m",
    varietal: "Ateng, Timtim",
    process: "Wet-hulled (Giling Basah)",
    producers: "Permata Gayo cooperative",
    roasteryNotes: "Indonesia's wet-hulling process (Giling Basah) gives Sumatran and Acehnese coffees their distinctive earthy, low-acid profile. Permata Gayo preserves the cinnamon spice and deep cocoa character of the Gayo Highlands — a classic dark roast for those who want weight and warmth."
  },
  {
    id: 19,
    num: 315,
    country: "Nicaragua",
    name: "Matagalpa",
    roast: 5, roastLabel: "Dark",
    flavours: ["Lemon", "Toasted Almond"],
    region: "Americas",
    coords: { x: 205, y: 260 }, // Nicaragua
    cardColor: "#4A6B8C", // steel blue
    backColor: "#1E2B4A",
    grown: "Matagalpa",
    altitude: "1,000m – 1,400m",
    varietal: "Caturra, Catimor",
    process: "Washed",
    producers: "Matagalpa farmers",
    roasteryNotes: "Matagalpa is Nicaragua's coffee heartland, and this dark roast is a surprise — the lemon acidity survives the roasting process because of the high-altitude growing conditions. Paired with the toasted almond warmth, it's a dark roast that manages to feel both bold and bright."
  },
  {
    id: 20,
    num: 316,
    country: "Uganda",
    name: "Clarke Farm",
    roast: 5, roastLabel: "Dark",
    flavours: ["Cassia", "Black Cherry", "Dark Chocolate"],
    region: "Africa",
    coords: { x: 548, y: 284 }, // Uganda (offset)
    cardColor: "#6B3A5A", // dark purple
    backColor: "#1E2B4A",
    grown: "Mount Elgon",
    altitude: "1,800m – 2,200m",
    varietal: "SL14, SL28",
    process: "Natural",
    producers: "Clarke Farm",
    roasteryNotes: "A second lot from Clarke Farm on Mount Elgon, this time processed naturally. The natural process adds cassia spice and amplifies the black cherry intensity. Side-by-side with N°273 (washed), it's a masterclass in how processing method transforms the same farm's fruit into completely different cups."
  },
  {
    id: 21,
    num: 321,
    country: "Colombia",
    name: "Viani",
    roast: 3, roastLabel: "Medium",
    flavours: ["Date", "Milk Chocolate"],
    region: "Americas",
    coords: { x: 241, y: 262 }, // Colombia (offset)
    cardColor: "#5A4E8C",
    backColor: "#1E2B4A",
    grown: "Cundinamarca",
    altitude: "1,500m – 1,800m",
    varietal: "Bourbon, Caturra",
    process: "Washed",
    producers: "Viani producers",
    roasteryNotes: "Viani is a small municipality in Cundinamarca, historically known for its coffee but less celebrated than Huila or Nariño. This lot shows what Cundinamarca can do — date-like dried fruit sweetness and creamy milk chocolate, a gentle, smooth medium roast for everyday drinking."
  },
  {
    id: 22,
    num: 335,
    country: "Brazil",
    name: "Sertãozinho Lot 548",
    roast: 3, roastLabel: "Medium",
    flavours: ["Cocoa Nib", "Baked Apple"],
    region: "Americas",
    coords: { x: 282, y: 330 }, // Brazil
    cardColor: "#C4863A",
    backColor: "#1E2B4A",
    grown: "Sertãozinho, Minas Gerais",
    altitude: "900m – 1,100m",
    varietal: "Yellow Bourbon",
    process: "Natural",
    producers: "Sertãozinho estate",
    roasteryNotes: "Brazilian naturals are the backbone of the specialty coffee world — consistent, sweet, and crowd-pleasing. Sertãozinho Lot 548 is a Yellow Bourbon natural from Minas Gerais, roasted at medium to highlight the cocoa nib bitterness and the baked apple warmth that makes Brazilian coffee so comforting."
  },
  {
    id: 23,
    num: 343,
    country: "Tanzania",
    name: "Tarime Natural",
    roast: 4, roastLabel: "Medium/Dark",
    flavours: ["Shortbread", "Vanilla", "Red Cherry Jam"],
    region: "Africa",
    coords: { x: 558, y: 298 }, // Tanzania (offset)
    cardColor: "#7A8C4A", // olive yellow-green
    backColor: "#1E2B4A",
    grown: "Tarime District",
    altitude: "1,500m – 1,750m",
    varietal: "Bourbon",
    process: "Natural",
    producers: "Tarime farmers",
    roasteryNotes: "Tarime District in northern Tanzania produces naturals with a distinctive jammy character — the red cherry jam note here comes from extended cherry fermentation under the African sun. Shortbread and vanilla add a biscuity sweetness that makes this a wonderful dessert coffee."
  },
  {
    id: 24,
    num: 319,
    country: "Brazil",
    name: "Sertãozinho Lot 574",
    roast: 3, roastLabel: "Medium",
    flavours: ["Chai", "Molasses"],
    region: "Americas",
    coords: { x: 285, y: 334 }, // Brazil (offset)
    cardColor: "#C44A3A",
    backColor: "#1E2B4A",
    grown: "Sertãozinho, Minas Gerais",
    altitude: "900m – 1,100m",
    varietal: "Yellow Catuai",
    process: "Pulped Natural",
    producers: "Sertãozinho estate",
    roasteryNotes: "A second lot from Sertãozinho, processed as pulped natural (honey process). The chai spice character is remarkable — warm cinnamon and cardamom notes emerge from the processing and the terroir. The molasses sweetness grounds it perfectly. A lot that rewards slow brewing."
  },
  {
    id: 25,
    num: 109,
    country: "Brazil",
    name: "Fazenda Campestre",
    roast: 3, roastLabel: "Medium",
    flavours: ["Molasses", "Red Apple"],
    region: "Americas",
    coords: { x: 288, y: 338 }, // Brazil (offset)
    cardColor: "#3A6B3E",
    backColor: "#1E2B4A",
    grown: "Sul de Minas",
    altitude: "900m – 1,100m",
    varietal: "Mundo Novo",
    process: "Natural",
    producers: "Fazenda Campestre",
    roasteryNotes: "Fazenda Campestre is one of Rave's longest-standing Brazilian partners — N°109 reveals that. A Mundo Novo natural from Sul de Minas, this coffee is classic Brazil: the molasses richness underpins everything, and the red apple brightness lifts what could otherwise be a heavy cup."
  },
  {
    id: 26,
    num: 301,
    country: "Kenya",
    name: "Asali AB",
    roast: 5, roastLabel: "Dark",
    flavours: ["Treacle", "Blackcurrant", "Dark Spice"],
    region: "Africa",
    coords: { x: 565, y: 276 }, // Kenya (offset)
    cardColor: "#6B3A5A",
    backColor: "#1E2B4A",
    grown: "Nyeri",
    altitude: "1,700m – 2,000m",
    varietal: "SL28, SL34, Ruiru 11",
    process: "Washed",
    producers: "Asali cooperative",
    roasteryNotes: "Asali means 'honey' in Swahili — though this AB-grade dark roast is anything but delicate. From Nyeri, one of Kenya's most prized districts, the SL varieties produce a treacle-thick body and a blackcurrant intensity that survives dark roasting with remarkable vitality."
  },
  {
    id: 27,
    num: 304,
    country: "Colombia",
    name: "Racafé Crecer",
    roast: 5, roastLabel: "Dark",
    flavours: ["Black Cherry", "Cola", "Milk Chocolate"],
    region: "Americas",
    coords: { x: 244, y: 266 }, // Colombia (offset)
    cardColor: "#8B4A6B",
    backColor: "#1E2B4A",
    grown: "Various Colombian regions",
    altitude: "1,600m – 2,000m",
    varietal: "Castillo, Caturra, Colombia",
    process: "Washed",
    producers: "Racafé Crecer programme",
    roasteryNotes: "Racafé Crecer is a social programme connecting Colombian smallholders to specialty buyers. The cola note here is a fascinating product of the dark roasting — a caramelisation of sugars that evokes exactly that. Black cherry and milk chocolate complete a profile built for a bold espresso."
  },
  {
    id: 28,
    num: 293,
    country: "Indonesia",
    name: "Wahana Estate",
    roast: 5, roastLabel: "Dark",
    flavours: ["Cinnamon", "Cocoa", "Brown Sugar"],
    region: "Asia",
    coords: { x: 752, y: 298 }, // Indonesia (offset)
    cardColor: "#5A4E8C",
    backColor: "#1E2B4A",
    grown: "Lintong, North Sumatra",
    altitude: "1,300m – 1,500m",
    varietal: "Ateng",
    process: "Wet-hulled",
    producers: "Wahana Estate",
    roasteryNotes: "Wahana Estate in North Sumatra's Lintong region has become a benchmark for Indonesian specialty coffee. The wet-hulled process imparts the cinnamon warmth and heavy body; the estate's careful cherry selection ensures the cocoa and brown sugar sweetness stay clean and bright."
  },
  {
    id: 29,
    num: 4,
    country: "Blend",
    name: "Espresso Blend",
    roast: 5, roastLabel: "Dark",
    flavours: ["Toffee", "Spice"],
    region: "Blend",
    coords: { x: 430, y: 210 }, // Atlantic — for blends
    cardColor: "#E8A84A",
    backColor: "#1E2B4A",
    grown: "Brazil, Colombia, Ethiopia",
    altitude: "Various",
    varietal: "Various",
    process: "Various",
    producers: "Rave Coffee blend",
    roasteryNotes: "Rave's classic Espresso Blend — N°4 — is a carefully calibrated combination of Brazilian natural sweetness, Colombian body, and a touch of Ethiopian fruit. Roasted dark for espresso, it delivers consistent toffee sweetness and a warming spice in the finish. The blend that started it all."
  },
  {
    id: 30,
    num: 3,
    country: "Blend",
    name: "Mocha Java Blend",
    roast: 4, roastLabel: "Medium/Dark",
    flavours: ["Chocolate", "Earthy", "Hazelnut"],
    region: "Blend",
    coords: { x: 420, y: 215 }, // Atlantic
    cardColor: "#6B5A3A",
    backColor: "#1E2B4A",
    grown: "Ethiopia (Mocha) + Indonesia (Java)",
    altitude: "Various",
    varietal: "Ethiopian Heirloom, Indonesian",
    process: "Washed + Wet-hulled",
    producers: "Rave Coffee blend",
    roasteryNotes: "The Mocha Java is one of the world's oldest coffee blends — combining the floral, fruity coffees of Ethiopia's ancient Mocha port tradition with the heavy, earthy coffees of Java, Indonesia. Rave's version at medium/dark roast brings chocolate, earthiness and hazelnut warmth in perfect balance."
  },
  {
    id: 31,
    num: 2,
    country: "Blend",
    name: "The Italian Job Blend",
    roast: 5, roastLabel: "Dark",
    flavours: ["Heavy Cocoa", "Roasted Nuts"],
    region: "Blend",
    coords: { x: 440, y: 205 }, // Atlantic
    cardColor: "#3A3A3A",
    backColor: "#1E2B4A",
    grown: "Brazil, Central America",
    altitude: "Various",
    varietal: "Various",
    process: "Various",
    producers: "Rave Coffee blend",
    roasteryNotes: "Named for the audacity of its roast level, The Italian Job is Rave's darkest offering — N°2 means it's almost as old as the roastery. Heavy cocoa and roasted nut notes dominate; this is the blend for those who want their espresso to hit like a freight train. Perfect with steamed milk."
  },
  {
    id: 32,
    num: 322,
    country: "Rwanda",
    name: "Gito",
    roast: 3, roastLabel: "Medium",
    flavours: ["Blackcurrant", "Treacle", "Bourbon"],
    region: "Africa",
    coords: { x: 540, y: 289 }, // Rwanda (offset)
    cardColor: "#4A7A6B", // dark teal-green
    backColor: "#1E2B4A",
    grown: "Nyamagabe District",
    altitude: "1,800m – 2,100m",
    varietal: "Red Bourbon",
    process: "Washed",
    producers: "Gito washing station",
    roasteryNotes: "Gito washing station sits at over 1,800m in Rwanda's Southern Province, producing Red Bourbon coffees of exceptional depth. The 'Bourbon' in the tasting notes isn't the whiskey — it refers to the Bourbon variety itself, which has a distinctive warm, winey character when grown at altitude."
  }
];

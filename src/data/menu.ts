export type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle: string;
  items: MenuItem[];
};

// Coperto 2€
export const coperto = "2";

export const menu: MenuCategory[] = [
  {
    id: "sfizi",
    name: "Sfizi",
    subtitle: "Per iniziare — bruschette e fritti",
    items: [
      { name: "Bruschette miste",              description: "Assortimento di bruschette della casa",                            price: "6" },
      { name: "Gnocco fritto con salumi",      description: "Gnocco fritto servito con salumi selezionati",                    price: "8" },
      { name: "Verdure in pastella con salse", description: "Verdure fritte in pastella leggera, servite con salse",           price: "7" },
    ],
  },
  {
    id: "panini",
    name: "Panini",
    subtitle: "I classici del Buatt",
    items: [
      { name: "Buatt",       description: "Doppio hamburger, cheddar, patatine fritte, insalata, bacon, maionese", price: "13", tag: "Top" },
      { name: "Vegetariano", description: "Ciambotta, provola, patatine fritte",                                   price: "7" },
      { name: "Biglia",      description: "Salsiccia, provola, ciambotta",                                         price: "9" },
      { name: "Sporco",      description: "Bacon, provola, patatine, maionese",                                    price: "7.50" },
      { name: "Cenzino",     description: "Salsiccia, patate soffritte, provola",                                  price: "8" },
    ],
  },
  {
    id: "pinse",
    name: "Pinse",
    subtitle: "Formato x2 — da condividere",
    items: [
      { name: "Cotto",      description: "Provola, prosciutto cotto, sfere di patata, maionese",    price: "9", tag: "x2" },
      { name: "Evergreen",  description: "Wrustel, patatine, provola",                              price: "9", tag: "x2" },
      { name: "Crock",      description: "Cotoletta panata, insalata thai, cheddar",                price: "9", tag: "x2" },
    ],
  },
  {
    id: "bun",
    name: "Bun",
    subtitle: "Soft bun d'autore",
    items: [
      { name: "Bun Crock Thai",   description: "Cotoletta panata, cheddar, insalata thai",                                      price: "10" },
      { name: "Bun Provolo",      description: "Hamburger, provola panata, maionese tartufo, cipolle caramellate",              price: "9" },
      { name: "Bun Stracciato",   description: "Straccetti di manzo, patate al forno, cipolla caramellata, BBQ, scaglie",      price: "10" },
      { name: "Bun Eggs",         description: "Hamburger, cheddar, bacon, uovo, BBQ",                                         price: "9" },
      { name: "Bun Classic",      description: "Hamburger, cheddar, bacon, insalata, pomodoro",                                 price: "8" },
    ],
  },
  {
    id: "burrito-toast",
    name: "Burrito & Toast",
    subtitle: "Street food da Buatt",
    items: [
      { name: "Mexico",    description: "Manzo, mais, cipolla, cetriolini, salsa chili, insalata",       price: "8" },
      { name: "Noname",    description: "Pulled, bacon, twister, cheddar, salsa home made",              price: "8" },
      { name: "Spuntino",  description: "Uovo sodo, maionese, wrustel di maiale",                        price: "7" },
      { name: "Pigmode",   description: "Pulled pork, cheddar, cipolle caramellate, insalata",           price: "8" },
    ],
  },
  {
    id: "bowl-fritti",
    name: "Bowl & Fritti",
    subtitle: "Croccanti e generosi",
    items: [
      { name: "Straccetti di pollo",             description: "6 pezzi",                                            price: "6" },
      { name: "Patatine",                        description: "Patatine fritte della casa",                         price: "4" },
      { name: "Twister",                         description: "Spirali croccanti",                                  price: "6" },
      { name: "Bowl patatine e cotoletta",       description: "Patatine, cotoletta panata, maionese",               price: "7" },
      { name: "Bowl twister e bacon",            description: "Twister, bacon, cheddar",                            price: "8" },
    ],
  },
  {
    id: "insalate-piatti",
    name: "Insalate & Piatti",
    subtitle: "Leggeri e completi",
    items: [
      { name: "Cesar Salad",          description: "Insalata, succo limone, pollo alla griglia, scaglie, maionese",   price: "7" },
      { name: "Crispy Cesar Salad",   description: "Insalata, rucola, mais, pomodorini, cotoletta di pollo",          price: "7" },
      { name: "Parmigiana",           description: "Parmigiana della casa",                                           price: "7" },
      { name: "Tagliata di vitello",  description: "300gr — taglio pregiato alla brace",                              price: "20", tag: "Chef" },
      { name: "Entrecote di scottona", description: "Scottona selezionata alla brace",                                price: "22", tag: "Chef" },
      { name: "Hamburger di scottona", description: "150gr — carne pregiata",                                         price: "10" },
    ],
  },
  {
    id: "birre",
    name: "Birre",
    subtitle: "Artigianali e alla spina",
    items: [
      { name: "Spitfire 0.33cl",          description: "Strong Lager — gradazione alcolica 9%",                                      price: "4" },
      { name: "TIPA 0.33cl",              description: "IPA opalescente, fresca e beverina — 4,8%",                                  price: "6" },
      { name: "Biere du Boucanier",       description: "Belga alta fermentazione, gusto corposo — 11%",                              price: "6" },
      { name: "Augustiner",              description: "Bassa fermentazione, aromi delicati e floreali — 5,2%",                      price: "6" },
      { name: "Super8 Export",           description: "Senza glutine — 4,8% · 33cl",                                                price: "5.50" },
      { name: "Primus",                  description: "Premium Pils, colore dorato — 5,2% · 25cl",                                  price: "3.50" },
      { name: "Primus 50cl",             description: "Premium Pils, colore dorato — 5,2% · 50cl",                                  price: "6" },
      { name: "Carlo V Rouge",           description: "Belgian Strong Ale, alta fermentazione — 8,5% · 33cl",                       price: "6" },
      { name: "Schneidern Weisse",       description: "Weisse, alta fermentazione, colore ambrato — 5,4% · 30cl",                   price: "4" },
      { name: "Schneidern Weisse 50cl",  description: "Weisse, alta fermentazione, colore ambrato — 5,4% · 50cl",                   price: "7" },
    ],
  },
  {
    id: "vini",
    name: "Vini",
    subtitle: "Bianchi, rossi e rosé",
    items: [
      { name: "Fiano",           description: "Bianco — Campania",  price: "20" },
      { name: "Falanghina",      description: "Bianco — Campania",  price: "15" },
      { name: "Gewurztraminer",  description: "Bianco — aromatico", price: "18" },
      { name: "Le Ghiandaie",    description: "Rosso",              price: "18" },
      { name: "Chianti",         description: "Rosso — Toscana",    price: "18" },
      { name: "Jungano",         description: "Rosso",              price: "25" },
      { name: "Primitivo",       description: "Rosso — Puglia",     price: "18" },
      { name: "Porco Nero",      description: "Rosso",              price: "20" },
      { name: "Lacryma Christi", description: "Rosé — Campania",    price: "18" },
      { name: "Lumare",          description: "Rosé",               price: "15" },
    ],
  },
  {
    id: "cocktail",
    name: "Cocktail",
    subtitle: "Pre dinner & long drink — tutti €6",
    items: [
      { name: "Aperpol Spritz",       description: "Aperol, prosecco, soda",                                          price: "6" },
      { name: "Campari Spritz",       description: "Campari, prosecco, soda",                                         price: "6" },
      { name: "Americano",            description: "Vermouth rosso, bitter Campari, soda",                            price: "6" },
      { name: "Margarita",            description: "Tequila, triple sec, succo di lime",                              price: "6" },
      { name: "Negroni",              description: "Gin, bitter Campari, vermouth rosso",                             price: "6" },
      { name: "Negroni Sbagliato",    description: "Prosecco, bitter Campari, vermouth rosso",                        price: "6" },
      { name: "Gin Tonic",            description: "Gin, acqua tonica",                                              price: "6" },
      { name: "John Collins",         description: "Gin, limone, zucchero, angostura bitter, soda",                  price: "6" },
      { name: "Long Island Ice Tea",  description: "Gin, vodka, rum, triple sec, limone, sciroppo di zucchero",      price: "6" },
      { name: "Moscow Mule",          description: "Vodka, ginger beer",                                             price: "6" },
      { name: "Vodka Tonic",          description: "Vodka, acqua tonica",                                            price: "6" },
    ],
  },
];

export const featured = [
  {
    name: "Buatt",
    category: "Panini",
    description: "Il signature: doppio hamburger, cheddar, patatine fritte, bacon e maionese. Il panino che ha fatto la storia.",
    price: "13",
    image: "burger",
  },
  {
    name: "Tagliata di vitello",
    category: "Piatti",
    description: "300gr di vitello selezionato alla brace. Il fuoco vivo trasforma la materia in memoria.",
    price: "20",
    image: "tagliata",
  },
  {
    name: "Bun Crock Thai",
    category: "Bun",
    description: "Cotoletta panata, cheddar, insalata thai. L'oriente al centro di Eboli.",
    price: "10",
    image: "bun",
  },
  {
    name: "Gnocco fritto con salumi",
    category: "Sfizi",
    description: "Gnocco fritto dorato, servito con salumi selezionati del territorio.",
    price: "8",
    image: "gnocco",
  },
];

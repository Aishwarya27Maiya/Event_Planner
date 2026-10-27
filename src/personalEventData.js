const sharedMenu = [
  { id: "spritz", category: "Drinks", name: "Citrus garden spritz", description: "Sparkling citrus with garden herbs", price: 8, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=700&q=80" },
  { id: "berry", category: "Drinks", name: "Berry cooler", description: "Mixed berries, lime, and sparkling water", price: 7, image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=700&q=80" },
  { id: "coffee", category: "Drinks", name: "Coffee and tea bar", description: "Fresh coffee and a tea selection", price: 9, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80" },
  { id: "lemonade", category: "Drinks", name: "House-made lemonade", description: "Chilled lemonade with seasonal fruit", price: 6, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80" },
  { id: "bruschetta", category: "Appetizers", name: "Tomato bruschetta", description: "Toasted bread, ripe tomato, and basil", price: 12, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=700&q=80" },
  { id: "skewers", category: "Appetizers", name: "Garden vegetable skewers", description: "Grilled vegetables with a bright herb dip", price: 11, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80" },
  { id: "cheese", category: "Appetizers", name: "Seasonal cheese board", description: "Artisan cheeses, fruit, and crisp crackers", price: 16, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=700&q=80" },
  { id: "tarts", category: "Appetizers", name: "Savory mini tarts", description: "Bite-size tarts with seasonal fillings", price: 13, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80" },
  { id: "chicken", category: "Main food", name: "Herb-roasted chicken", description: "Roasted chicken with seasonal vegetables", price: 28, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80" },
  { id: "pasta", category: "Main food", name: "Market vegetable pasta", description: "Fresh pasta with vegetables and parmesan", price: 24, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80" },
  { id: "salmon", category: "Main food", name: "Citrus-glazed salmon", description: "Salmon with greens and a citrus glaze", price: 34, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80" },
  { id: "buffet", category: "Main food", name: "Seasonal buffet", description: "A generous assortment of crowd favorites", price: 30, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=700&q=80" },
  { id: "cake", category: "Desserts", name: "Berry celebration cake", description: "Layer cake finished with seasonal berries", price: 14, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80" },
  { id: "macarons", category: "Desserts", name: "Macaron selection", description: "Colorful macarons in assorted flavors", price: 10, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=700&q=80" },
  { id: "tartlets", category: "Desserts", name: "Seasonal fruit tartlets", description: "Petite tarts with fresh fruit and cream", price: 12, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80" },
  { id: "mousse", category: "Desserts", name: "Chocolate mousse cups", description: "Silky chocolate mousse with a crisp finish", price: 11, image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=700&q=80" },
];

export const foodCategories = ["Drinks", "Appetizers", "Main food", "Desserts"];

const occasion = (id, name, group, description, image, maxGuests, defaultGuests, venuePrice, decorations, multiplier = 1) => ({
  id, name, group, description, image, maxGuests, defaultGuests, venuePrice, decorations,
  menu: sharedMenu.map((food) => ({
    ...food,
    id: `${id}-${food.id}`,
    pricePerGuest: Math.round(food.price * multiplier),
  })),
});

export const personalOccasions = [
  occasion("baby-shower", "Baby shower", "small", "A warm welcome for a little one on the way.", "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85", 40, 30, 850, [
    { id: "baby-bloom", name: "Garden blooms", price: 240, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80" },
    { id: "baby-neutral", name: "Soft neutrals", price: 195, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80" },
    { id: "baby-cloud", name: "Cloud nine", price: 275, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80" },
  ]),
  occasion("birthday", "Birthday", "small", "A joyful day for your favorite people.", "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=85", 70, 60, 1250, [
    { id: "birthday-balloons", name: "Balloon moment", price: 320, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80" },
    { id: "birthday-florals", name: "Bright florals", price: 390, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80" },
    { id: "birthday-candlelight", name: "Candlelit tables", price: 275, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80" },
  ], 1),
  occasion("graduation", "Graduation", "small", "Celebrate the hard work and what comes next.", "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=85", 120, 80, 1650, [
    { id: "grad-classic", name: "Classic school colors", price: 350, image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=700&q=80" },
    { id: "grad-garden", name: "Garden celebration", price: 425, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80" },
    { id: "grad-modern", name: "Modern milestone", price: 295, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80" },
  ]),
  occasion("gender-reveal", "Gender reveal", "small", "Share a sweet surprise with your closest friends.", "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=85", 50, 35, 950, [
    { id: "reveal-pastel", name: "Pastel garden", price: 285, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80" },
    { id: "reveal-balloon", name: "Balloon surprise", price: 240, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80" },
    { id: "reveal-elegant", name: "Sweet and simple", price: 190, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80" },
  ]),
  occasion("anniversary", "Anniversary", "big", "Celebrate a love story and the years together.", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85", 100, 80, 2100, [
    { id: "anniversary-roses", name: "Romantic roses", price: 650, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80" },
    { id: "anniversary-candle", name: "Candlelit elegance", price: 520, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80" },
    { id: "anniversary-garden", name: "Golden garden", price: 720, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80" },
  ], 1.4),
  occasion("marriage", "Marriage", "big", "A wedding celebration to bring everyone together.", "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85", 500, 250, 4800, [
    { id: "marriage-classic", name: "Classic white florals", price: 1850, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80" },
    { id: "marriage-garden", name: "Garden ceremony", price: 2200, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80" },
    { id: "marriage-modern", name: "Modern candlelight", price: 1650, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80" },
  ], 1.4),
];

export const formatUSD = (amount) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
}).format(amount);

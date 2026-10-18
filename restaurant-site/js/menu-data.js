/* ALL MENU CONTENT LIVES HERE – edit this file to change the menu.
   v: true  = vegetarian (shows a green "V" badge)
   Add a "price" field to any item (e.g. price: "£9.50") and it will show automatically. */
const MENU = [
  { id: 'starters', name: 'Antipasti', sub: 'Starters', desc: 'Small plates to begin, perfect for sharing.', items: [
    { n: 'Insalata Di Carciofi', d: 'Mixed salad with artichokes, parmesan shavings and lemon dressing', v: true },
    { n: 'Bruschetta Romana', d: 'Grilled bread with porchetta and roasted peppers' },
    { n: 'Caprese', d: 'Fresh buffalo mozzarella with cherry tomatoes, basil and extra virgin olive oil', v: true },
    { n: 'Frittura Mista', d: 'Deep-fried seafood with homemade sweet chili mayonnaise and lemon' },
    { n: 'Tagliere Di Affettati', d: 'Selection of Italian charcuterie served with bread' },
    { n: 'Tagliere Di Formaggi', d: 'Selection of Italian cheeses served with fresh grapes and chutney', v: true }
  ]},
  { id: 'pasta', name: 'Primi', sub: 'Pasta Dishes', desc: 'Homemade pasta, made fresh.', items: [
    { n: 'Tortelloni Ai 4 Formaggi', d: "Homemade pasta parcel filled with goat's gorgonzola cheese, parmesan and butter and sage sauce", v: true },
    { n: 'Tagliatelle Al Pesto', d: 'Homemade tagliatelle pasta with fresh basil pesto, potatoes and green beans', v: true },
    { n: 'Taglierini Ai Gamberoni', d: 'Homemade egg pasta with prawns, cherry tomatoes, garlic and chili' },
    { n: 'Pappardelle Abruzzesi', d: 'Homemade egg pasta pappardelle with braised lamb' },
    { n: 'Tagliatelle Alla Contadina', d: 'Homemade tagliatelle with artichokes and pancetta' },
    { n: 'Agnolotti Al Brasato', d: 'Homemade pasta parcel with braised beef, chianti wine and gremolada' }
  ]},
  { id: 'mains', name: 'Main Courses', sub: 'Chef’s Selection', desc: 'Hearty Italian classics, from pasta parcels to risotto.', items: [
    { n: 'Tortelloni Tartufati', d: 'Homemade pasta parcels filled with potatoes and truffle taleggio cheeses', v: true },
    { n: 'Taglierini Terra E Mare', d: 'Homemade eggs pasta with mix sea food and cherry tomatoes' },
    { n: 'Agnolotti Del Cacciatore', d: 'Homemade pasta parcels stuffed with slow cooked wild boar and red wine' },
    { n: 'Pappardelle Al Cervo', d: 'Homemade pappardelle with braised venison' },
    { n: 'Parmigiana Di Melanzane', d: 'Baked aubergine layers with tomato sauce, mozzarella, parmesan and basil', v: true },
    { n: 'Risotto Alla Milanese', d: 'Saffron risotto', v: true },
    { n: 'Merluzzo Alla Livornese', d: 'Oven baked cod with polenta and cherry tomatoes & olives' },
    { n: 'Tagliata Di Manzo', d: 'Beef entrecote with potatoes and black olives' }
  ]},
  { id: 'secondi', name: 'Secondi', sub: 'Main Courses', desc: 'Our second courses: fish, meat and vegetable dishes.', items: [
    { n: 'Melanzana Alla Parmigiana', d: 'Baked aubergine with tomato sauce, buffalo mozzarella, fresh basil & parmesan cheese', v: true },
    { n: 'Merluzzo Con Lenticchie E Salsa Di Prezzemolo', d: 'Pan-fried cod served with lentils and parsley sauce' },
    { n: 'Fritto Misto', d: 'Deep fried calamari, king prawns, whitebaits and courgettes' },
    { n: 'Filetto Di Tonno Servito Con Rucola, Pomodori E Limone', d: 'Tuna steak served with rocket, cherry tomatoes and lemon' },
    { n: 'Tagliata Di Manzo Con Patate Schiacciate E Olive', d: 'Beef entrecote served with crashed potatoes and olives' }
  ]},
  { id: 'sandwiches', name: 'Sandwiches', sub: 'Panini', desc: 'Filled with the best Italian cured meats and cheeses.', items: [
    { n: 'Gustoso', d: 'Prosciutto cotto (cooked ham), valmontana (medium cow\'s milk cheese), mushrooms, olives, salad, fresh tomato, olive oil & black pepper' },
    { n: 'Cremonese', d: 'Salami (milano/cremonese/spicy), gorgonzola dolce (creamy blue cheese), sundried tomatoes, olives, salad, fresh tomato, olive oil and black pepper' },
    { n: 'Bergamo', d: 'Pancetta coppata (cured neck of pork), valmontana (medium cow\'s milk cheese), roasted peppers, olives, salad, fresh tomato, olive oil and black pepper' },
    { n: 'Pugliese', d: 'Mortadella with pistachios, provolone (strong, cow\'s milk cheese), roasted peppers, olives, salad, fresh tomato, olive oil and black pepper' },
    { n: 'Casertano', d: 'Prosciutto crudo (cured ham), fresh buffalo mozzarella, sundried tomatoes, olives, salad, fresh tomato, olive oil and black pepper' },
    { n: 'Valtellina', d: 'Bresaola (cured beef), fresh goat\'s cheese, artichokes, olives, salad, fresh tomato, olive oil and black pepper' },
    { n: 'Tirolese', d: 'Speck (smoked, cured ham), gorgonzola dolce (medium blue cheese from cow\'s milk), mushrooms, olives, salad, fresh tomato, olive oil and black pepper' }
  ]},
  { id: 'salads', name: 'Salads', sub: 'Insalate', desc: 'Fresh, generous and full of flavour.', items: [
    { n: 'Siciliana', d: 'Tuna, anchovies, olives, salad, fresh tomato, olive oil and black pepper, slices of bread' },
    { n: 'Vegetarian', d: 'Grilled peppers, artichokes, sundried tomatoes, olives, salad, fresh tomato, olive oil, black pepper, slices of bread', v: true },
    { n: 'Ortolana', d: 'Artichokes, roasted peppers, provolone (strong cow\'s milk cheese), olives, salad, fresh tomato, olive oil, black pepper, slices of bread' },
    { n: 'Al Crudo', d: 'Prosciutto crudo (cured ham), fresh buffalo mozzarella, sundried tomatoes, olives, salad, fresh tomato, olive oil and black pepper, slices of bread' }
  ]},
  { id: 'sides', name: 'Sides', sub: 'Contorni', desc: 'Simple sides to share.', simple: true, items: [
    { n: 'Bread And Extra Virgin Olive Oil' }, { n: 'Spinach' }, { n: 'Green Beans' }, { n: 'Broccoli' },
    { n: 'Roasted Potatoes' }, { n: 'Green Leaves' }, { n: 'Mixed Salad' }
  ]},
  { id: 'platters', name: 'Charcuterie Platters', sub: 'Tagliere', desc: 'All platters come with sliced ciabatta and are for 4 persons.', items: [
    { n: 'Milano', d: 'Salami milano, cured ham (parma ham), coppa classica, black olives with chilli, garlic and parsley. All platters come with sliced ciabatta and are for 4 persons.' },
    { n: 'Brianza', d: 'Pancetta coppata, salame cremonese, cooked ham, artichokes. All platters come with sliced ciabatta and are for 4 persons.' },
    { n: 'Tamarro', d: 'Mortadella with pistachios, porchetta (roasted pork), salame cremonese, cherry sundried tomatoes. All platters come with sliced ciabatta and are for 4 persons.' },
    { n: 'Tirolese', d: 'Speck (smoked cured ham), cured ham (parma ham), bresaola (beef), black olives with chilli, garlic and parsley. All platters come with sliced ciabatta and are for 4 persons.' },
    { n: 'Carpaccio Di Bresaola', d: 'Slices of bresaola (beef) with shaved parmesan, extra virgin olive oil and black pepper. All platters come with sliced ciabatta and are for 4 persons.' }
  ]},
  { id: 'dolci', name: 'Dolci', sub: 'Desserts', desc: 'Something sweet to finish.', items: [
    { n: 'Warm Panettone Pudding With Vanilla Ice-Cream' },
    { n: 'Chocolate Fondant With Vanilla Ice-Cream' },
    { n: 'Tiramisù' },
    { n: 'Ice-Creams', d: 'Chocolate, coffee, vanilla, pistachio' },
    { n: 'Italian Cheese Selection' }
  ]},
  { id: 'hot', name: 'Hot Drinks', sub: 'Caffè', desc: 'Great coffee, made properly.', simple: true, items: [
    { n: 'Espresso' }, { n: 'Americano' }, { n: 'Cappuccino' }, { n: 'Latte' }, { n: 'Mocha' }, { n: 'Hot Chocolate' }, { n: 'Tea' }
  ]},
  { id: 'additions', name: 'Additions', sub: 'Coffee extras', desc: 'Make your drink your own.', simple: true, items: [
    { n: 'Decaf' }, { n: 'Extra Shot' }, { n: 'Size' }, { n: 'Oat Milk' }
  ]},
  { id: 'sparkling', name: 'Sparkling Wines', sub: 'Vino', desc: 'Please drink responsibly.', items: [
    { n: 'Prosecco Di Valdobbiadene Extra Dry D.o.c.g., Col De Salici \'Nv\'', d: 'Glera · Veneto' },
    { n: 'Aperol Spritz', d: 'Aperol, prosecco, sparkling water, ice cubes' }
  ]},
  { id: 'rose', name: 'Rosé Wines', sub: 'Vino', desc: 'Please drink responsibly.', items: [
    { n: 'Chiaretto Valtenesi Roseri D.o.p., Càmaiol', d: 'Groppello, barbera, sangiovese, marzemino · Lombardy' }
  ]},
  { id: 'dessertwine', name: 'Dessert Wines', sub: 'Vino', desc: 'Please drink responsibly.', items: [
    { n: 'Moscato D\'asti D.o.c.g., Marco Bonfante', d: 'Moscato · Piedmont' }
  ]},
  { id: 'spirits', name: 'Liquors & Spirits', sub: 'Digestivi', desc: 'Please drink responsibly.', items: [
    { n: 'Limoncello' }, { n: 'Grappa' }, { n: 'Amaretto' }, { n: 'Montenegro' }, { n: 'Aperol' },
    { n: 'Mirto Di Sardegna, Bresca Dorada', d: 'Myrtle berry liqueur · Sardinia' },
    { n: 'Arangiu Di Sardegna, Bresca Dorada', d: 'Orange liqueur · Sardinia' }
  ]}
];

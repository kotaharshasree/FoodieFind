const sampleRecipes = [
  {
    name: 'Paneer Butter Masala',
    description: 'A rich, creamy, and mildly sweet restaurant-style curry made with paneer, butter, cashews, and aromatic spices in a velvety tomato gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=80',
    category: 'Dinner',
    cookingTime: 25,
    preparationTime: 15,
    difficulty: 'Medium',
    servings: 4,
    isVegetarian: true,
    ingredients: [
      { name: 'Paneer', quantity: 250, unit: 'g' },
      { name: 'Tomato', quantity: 4, unit: 'medium' },
      { name: 'Onion', quantity: 2, unit: 'medium' },
      { name: 'Butter', quantity: 3, unit: 'tbsp' },
      { name: 'Fresh Cream', quantity: 3, unit: 'tbsp' },
      { name: 'Cashews', quantity: 12, unit: 'pieces' },
      { name: 'Ginger Garlic Paste', quantity: 1, unit: 'tbsp' },
      { name: 'Garam Masala', quantity: 1, unit: 'tsp' },
      { name: 'Kashmiri Red Chilli Powder', quantity: 1.5, unit: 'tsp' },
      { name: 'Kasuri Methi', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Boil chopped onions, tomatoes, and soaked cashews in 1 cup water for 10 minutes until soft. Let it cool, then blend into a silky smooth puree.',
      'Heat 2 tbsp butter and 1 tbsp oil in a pan. Add ginger-garlic paste and saute for 1 minute until fragrant.',
      'Pour in the blended puree and cook on medium flame for 7-8 minutes until butter separates from the edges.',
      'Add Kashmiri red chilli powder, garam masala, and salt. Stir well to combine the spices.',
      'Add cubed paneer pieces and simmer gently for 4-5 minutes on low flame.',
      'Finish with fresh cream, remaining butter, and crushed kasuri methi. Serve piping hot with naan or jeera rice.'
    ]
  },
  {
    name: 'Crispy Masala Dosa',
    description: 'Crispy golden South Indian fermented rice-lentil crepe stuffed with spiced mashed potatoes, served with coconut chutney and sambar.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80',
    category: 'Breakfast',
    cookingTime: 20,
    preparationTime: 20,
    difficulty: 'Medium',
    servings: 3,
    isVegetarian: true,
    ingredients: [
      { name: 'Dosa Batter', quantity: 3, unit: 'cups' },
      { name: 'Potato', quantity: 4, unit: 'medium' },
      { name: 'Onion', quantity: 1, unit: 'large' },
      { name: 'Mustard Seeds', quantity: 1, unit: 'tsp' },
      { name: 'Curry Leaves', quantity: 10, unit: 'leaves' },
      { name: 'Green Chilli', quantity: 2, unit: 'finely chopped' },
      { name: 'Turmeric Powder', quantity: 0.5, unit: 'tsp' },
      { name: 'Oil / Ghee', quantity: 2, unit: 'tbsp' },
      { name: 'Fresh Coriander', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Boil and peel the potatoes, then roughly mash them with a fork.',
      'Heat oil in a pan, crackle mustard seeds, add curry leaves, green chillies, and sliced onions. Saute until onions turn translucent.',
      'Add turmeric powder, salt, and mashed potatoes. Splash 2-3 tbsp water, mix thoroughly, and cook for 3 minutes. Garnish with coriander.',
      'Heat a flat non-stick cast iron tawa. Sprinkle a few drops of water and wipe clean.',
      'Pour a ladleful of dosa batter in the center and spread in a circular spiral motion towards the edges.',
      'Drizzle ghee around the edges and cook on medium flame until the bottom is crisp and golden.',
      'Place 2 tablespoons of potato filling in the center, fold over, and serve hot with coconut chutney.'
    ]
  },
  {
    name: 'Vegetable Dum Biryani',
    description: 'Fragrant long-grain basmati rice layered with spiced marinated mixed vegetables, saffron-infused milk, caramelized onions, and fresh mint.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    category: 'Lunch',
    cookingTime: 40,
    preparationTime: 20,
    difficulty: 'Hard',
    servings: 4,
    isVegetarian: true,
    ingredients: [
      { name: 'Basmati Rice', quantity: 2, unit: 'cups' },
      { name: 'Mixed Vegetables (Carrot, Beans, Peas)', quantity: 2, unit: 'cups' },
      { name: 'Yogurt', quantity: 0.5, unit: 'cup' },
      { name: 'Onion', quantity: 2, unit: 'large sliced' },
      { name: 'Biryani Masala', quantity: 2, unit: 'tbsp' },
      { name: 'Ginger Garlic Paste', quantity: 1.5, unit: 'tbsp' },
      { name: 'Mint Leaves', quantity: 0.5, unit: 'cup' },
      { name: 'Saffron Milk', quantity: 3, unit: 'tbsp' },
      { name: 'Ghee', quantity: 3, unit: 'tbsp' },
      { name: 'Whole Spices (Cardamom, Cloves, Bay Leaf)', quantity: 1, unit: 'set' },
      { name: 'Salt', quantity: 1.5, unit: 'tsp' }
    ],
    instructions: [
      'Wash and soak basmati rice for 30 minutes. Cook in boiling salted water with whole spices until 70% done, then drain.',
      'Deep fry thinly sliced onions until golden brown and crispy (birista). Set aside.',
      'In a thick-bottomed pot, heat ghee, add ginger-garlic paste, mixed vegetables, yogurt, biryani masala, and salt. Cook for 10 minutes until veggies are tender.',
      'Layer half of the partially cooked rice over the vegetable masala.',
      'Top with fresh mint, half of the fried onions, and a sprinkle of biryani masala.',
      'Add the remaining rice, drizzle saffron milk and 1 tbsp ghee on top, and scatter remaining fried onions.',
      'Cover tightly with a lid and seal edges with dough or foil. Cook on low heat (dum) for 15-20 minutes. Rest 5 minutes before fluffing.'
    ]
  },
  {
    name: 'Vegetable Grilled Sandwich',
    description: 'Quick street-style toasted sandwich layered with spiced green mint chutney, crisp cucumbers, tomatoes, boiled potatoes, and melted cheese.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80',
    category: 'Snacks',
    cookingTime: 10,
    preparationTime: 10,
    difficulty: 'Easy',
    servings: 2,
    isVegetarian: true,
    ingredients: [
      { name: 'Bread Slices', quantity: 4, unit: 'slices' },
      { name: 'Potato', quantity: 1, unit: 'boiled & sliced' },
      { name: 'Cucumber', quantity: 1, unit: 'sliced' },
      { name: 'Tomato', quantity: 1, unit: 'sliced' },
      { name: 'Onion', quantity: 1, unit: 'sliced' },
      { name: 'Cheese Slice / Grated', quantity: 2, unit: 'slices' },
      { name: 'Butter', quantity: 2, unit: 'tbsp' },
      { name: 'Green Chutney', quantity: 2, unit: 'tbsp' },
      { name: 'Chaat Masala', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Butter both sides of the bread slices, then spread generous green mint chutney on one side of each.',
      'Layer potato slices, sprinkle chaat masala, then layer cucumber, onion, and tomato slices.',
      'Top with a slice of cheese or generous grated cheese, and sprinkle extra chaat masala.',
      'Cover with the second slice of bread and butter the outer side.',
      'Grill in a sandwich toaster or on a hot skillet until golden brown and super crispy on both sides.',
      'Cut diagonally into triangles and serve immediately with tomato ketchup.'
    ]
  },
  {
    name: 'Spicy Tomato Rice',
    description: 'Tangy and aromatic South Indian one-pot rice recipe cooked with ripe tomatoes, curry leaves, mustard seeds, peanuts, and flavorful spices.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    category: 'Lunch',
    cookingTime: 20,
    preparationTime: 10,
    difficulty: 'Easy',
    servings: 3,
    isVegetarian: true,
    ingredients: [
      { name: 'Cooked Rice', quantity: 3, unit: 'cups' },
      { name: 'Tomato', quantity: 4, unit: 'finely chopped' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Peanuts', quantity: 2, unit: 'tbsp' },
      { name: 'Mustard Seeds', quantity: 1, unit: 'tsp' },
      { name: 'Curry Leaves', quantity: 10, unit: 'leaves' },
      { name: 'Green Chilli', quantity: 2, unit: 'slit' },
      { name: 'Turmeric Powder', quantity: 0.5, unit: 'tsp' },
      { name: 'Red Chilli Powder', quantity: 1, unit: 'tsp' },
      { name: 'Oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Heat oil in a heavy-bottomed kadai. Fry raw peanuts until crunchy and lightly browned. Set aside.',
      'In the same oil, add mustard seeds and let them splutter. Add curry leaves, green chillies, and sliced onions.',
      'Saute until onions turn golden. Add chopped tomatoes, turmeric, red chilli powder, and salt.',
      'Cook covered on medium flame for 6-8 minutes until tomatoes break down into a thick, pulpy sauce with oil releasing at sides.',
      'Gently fold in cooled cooked rice and fried peanuts until the tomato gravy evenly coats every grain.',
      'Cover and warm on low flame for 2 minutes. Serve hot with crispy papad or raita.'
    ]
  },
  {
    name: 'Stuffed Aloo Paratha',
    description: 'Classic Punjabi whole wheat flatbread generously stuffed with a spiced mashed potato filling, roasted with butter and served with cool curd.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
    category: 'Breakfast',
    cookingTime: 25,
    preparationTime: 15,
    difficulty: 'Medium',
    servings: 3,
    isVegetarian: true,
    ingredients: [
      { name: 'Whole Wheat Flour', quantity: 2, unit: 'cups' },
      { name: 'Potato', quantity: 3, unit: 'boiled & mashed' },
      { name: 'Green Chilli', quantity: 2, unit: 'finely minced' },
      { name: 'Garam Masala', quantity: 0.5, unit: 'tsp' },
      { name: 'Amchur (Dry Mango Powder)', quantity: 0.5, unit: 'tsp' },
      { name: 'Ajwain (Carom Seeds)', quantity: 0.5, unit: 'tsp' },
      { name: 'Fresh Coriander', quantity: 3, unit: 'tbsp' },
      { name: 'Butter / Ghee', quantity: 3, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Knead whole wheat flour with water and a pinch of salt into a soft, pliable dough. Rest for 15 minutes.',
      'In a bowl, mix boiled mashed potatoes, green chillies, garam masala, amchur powder, ajwain, coriander, and salt.',
      'Roll a small ball of dough into a 4-inch circle. Place a generous ball of potato stuffing in the center.',
      'Pleat the edges together to seal the dumpling completely, flattening with your palms.',
      'Dust with flour and roll out gently into a 7-8 inch circular paratha without tearing the skin.',
      'Roast on a hot tawa on both sides until golden brown spots appear, applying generous butter or ghee.',
      'Serve hot with fresh butter dollop, curd, and mango pickle.'
    ]
  },
  {
    name: 'Home-style Chicken Curry',
    description: 'Tender chicken pieces simmered in a robust, homestyle onion-tomato gravy infused with whole spices, ginger, garlic, and fresh herbs.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80',
    category: 'Dinner',
    cookingTime: 35,
    preparationTime: 15,
    difficulty: 'Medium',
    servings: 4,
    isVegetarian: false,
    ingredients: [
      { name: 'Chicken', quantity: 500, unit: 'g' },
      { name: 'Onion', quantity: 3, unit: 'finely chopped' },
      { name: 'Tomato', quantity: 2, unit: 'pureed' },
      { name: 'Ginger Garlic Paste', quantity: 2, unit: 'tbsp' },
      { name: 'Yogurt', quantity: 0.25, unit: 'cup' },
      { name: 'Coriander Powder', quantity: 1.5, unit: 'tbsp' },
      { name: 'Turmeric Powder', quantity: 0.5, unit: 'tsp' },
      { name: 'Red Chilli Powder', quantity: 1.5, unit: 'tsp' },
      { name: 'Garam Masala', quantity: 1, unit: 'tsp' },
      { name: 'Mustard Oil / Vegetable Oil', quantity: 3, unit: 'tbsp' },
      { name: 'Salt', quantity: 1.5, unit: 'tsp' }
    ],
    instructions: [
      'Marinate chicken pieces with yogurt, turmeric powder, 0.5 tsp red chilli powder, and salt for 20 minutes.',
      'Heat oil in a deep kadai. Add bay leaf, cinnamon stick, and chopped onions. Fry until deep golden brown.',
      'Add ginger-garlic paste and saute for 2 minutes until raw aroma vanishes.',
      'Add tomato puree, coriander powder, red chilli powder, and salt. Cook until oil starts oozing from masala.',
      'Add the marinated chicken pieces and bhunno (sear) on high heat for 6-8 minutes until chicken turns opaque.',
      'Add 1 cup warm water, cover with lid, and simmer on medium-low flame for 20 minutes until chicken is tender.',
      'Sprinkle garam masala and chopped coriander leaves. Serve hot with steamed rice or phulkas.'
    ]
  },
  {
    name: 'Delhi Style Butter Chicken',
    description: 'Iconic smoky charred tandoori chicken chunks simmered in a velvety, buttery tomato, cashew, and cream sauce with a touch of fenugreek.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1000&q=80',
    category: 'Dinner',
    cookingTime: 30,
    preparationTime: 20,
    difficulty: 'Medium',
    servings: 4,
    isVegetarian: false,
    ingredients: [
      { name: 'Boneless Chicken', quantity: 500, unit: 'g' },
      { name: 'Tomato Puree', quantity: 2, unit: 'cups' },
      { name: 'Butter', quantity: 4, unit: 'tbsp' },
      { name: 'Heavy Cream', quantity: 4, unit: 'tbsp' },
      { name: 'Cashew Paste', quantity: 2, unit: 'tbsp' },
      { name: 'Ginger Garlic Paste', quantity: 1.5, unit: 'tbsp' },
      { name: 'Kashmiri Chilli Powder', quantity: 2, unit: 'tsp' },
      { name: 'Kasuri Methi', quantity: 1, unit: 'tbsp' },
      { name: 'Garam Masala', quantity: 1, unit: 'tsp' },
      { name: 'Honey / Sugar', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Marinate chicken with yogurt, chilli powder, ginger-garlic paste, and salt. Pan-sear in 1 tbsp butter on high heat until lightly charred. Set aside.',
      'In a wide saucepan, melt 2 tbsp butter. Add ginger garlic paste, tomato puree, cashew paste, and Kashmiri chilli powder.',
      'Simmer the tomato gravy for 12 minutes until reduced and aromatic. Strain for a silkier texture if desired.',
      'Add the seared chicken pieces into the bubbling gravy and cook for 6 minutes.',
      'Stir in honey, garam masala, crushed kasuri methi, remaining butter, and heavy cream.',
      'Simmer for 2 minutes on low heat, then serve with warm butter garlic naan.'
    ]
  },
  {
    name: 'Punjabi Chana Masala',
    description: 'Robust and spicy North Indian chickpea curry simmered in a luscious onion-tomato gravy with pomegranate powder and fragrant spices.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    category: 'Lunch',
    cookingTime: 30,
    preparationTime: 15,
    difficulty: 'Easy',
    servings: 4,
    isVegetarian: true,
    ingredients: [
      { name: 'Chickpeas (Kabuli Chana)', quantity: 2, unit: 'cups boiled' },
      { name: 'Onion', quantity: 2, unit: 'finely chopped' },
      { name: 'Tomato', quantity: 2, unit: 'pureed' },
      { name: 'Ginger Garlic Paste', quantity: 1, unit: 'tbsp' },
      { name: 'Chana Masala Powder', quantity: 2, unit: 'tbsp' },
      { name: 'Cumin Seeds', quantity: 1, unit: 'tsp' },
      { name: 'Amchur / Anardana Powder', quantity: 1, unit: 'tsp' },
      { name: 'Oil', quantity: 2, unit: 'tbsp' },
      { name: 'Fresh Coriander', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Heat oil in a deep pan. Add cumin seeds and let them sizzle.',
      'Add chopped onions and saute on medium heat until golden brown.',
      'Add ginger-garlic paste and cook for 1 minute until fragrant.',
      'Stir in tomato puree, chana masala powder, amchur, and salt. Cook until oil separates from the gravy.',
      'Add boiled chickpeas along with 1 cup of chickpea water. Mash a few chickpeas with the back of a ladle to thicken the gravy.',
      'Cover and simmer on low heat for 12-15 minutes so the chickpeas absorb all the flavors.',
      'Garnish with ginger juliennes and fresh coriander. Serve piping hot with bhature or steamed rice.'
    ]
  },
  {
    name: 'Yellow Dal Tadka',
    description: 'Comforting yellow lentils cooked to creamy perfection, tempered with sizzling ghee, cumin, garlic, dried red chillies, and asafoetida.',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=1000&q=80',
    category: 'Dinner',
    cookingTime: 20,
    preparationTime: 10,
    difficulty: 'Easy',
    servings: 4,
    isVegetarian: true,
    ingredients: [
      { name: 'Toor Dal (Pigeon Peas)', quantity: 1, unit: 'cup' },
      { name: 'Tomato', quantity: 1, unit: 'chopped' },
      { name: 'Onion', quantity: 1, unit: 'chopped' },
      { name: 'Garlic', quantity: 6, unit: 'cloves minced' },
      { name: 'Cumin Seeds', quantity: 1, unit: 'tsp' },
      { name: 'Dry Red Chillies', quantity: 2, unit: 'whole' },
      { name: 'Turmeric Powder', quantity: 0.5, unit: 'tsp' },
      { name: 'Kashmiri Red Chilli Powder', quantity: 0.5, unit: 'tsp' },
      { name: 'Hing (Asafoetida)', quantity: 0.25, unit: 'tsp' },
      { name: 'Ghee', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Pressure cook rinsed toor dal with 3 cups water, turmeric powder, and salt for 3-4 whistles until completely tender. Whisk lightly.',
      'Heat 1 tbsp ghee in a pot, saute onions, green chillies, and tomatoes until soft. Pour cooked dal and bring to a simmer.',
      'For the iconic tadka, heat 1 tbsp ghee in a small pan until hot.',
      'Add cumin seeds, minced garlic, hing, and dried red chillies. Fry until garlic turns golden brown.',
      'Turn off the heat, add Kashmiri chilli powder for vibrant color, and immediately pour the sizzling tadka over the dal.',
      'Cover with a lid immediately to trap the aromas for 2 minutes before serving with jeera rice.'
    ]
  },
  {
    name: '2-Minute Chocolate Mug Cake',
    description: 'Decadent, moist, and fluffy single-serve chocolate sponge cake made effortlessly in a mug in just 2 minutes!',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    category: 'Desserts',
    cookingTime: 2,
    preparationTime: 5,
    difficulty: 'Easy',
    servings: 1,
    isVegetarian: true,
    ingredients: [
      { name: 'All-Purpose Flour (Maida)', quantity: 3, unit: 'tbsp' },
      { name: 'Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Cocoa Powder', quantity: 1.5, unit: 'tbsp' },
      { name: 'Baking Powder', quantity: 0.25, unit: 'tsp' },
      { name: 'Milk', quantity: 3, unit: 'tbsp' },
      { name: 'Melted Butter / Oil', quantity: 1.5, unit: 'tbsp' },
      { name: 'Vanilla Extract', quantity: 0.25, unit: 'tsp' },
      { name: 'Chocolate Chips', quantity: 1, unit: 'tbsp' }
    ],
    instructions: [
      'In a microwave-safe ceramic mug, whisk together flour, sugar, cocoa powder, and baking powder using a small fork.',
      'Add milk, melted butter, and vanilla extract. Stir until a smooth, lump-free batter forms.',
      'Drop chocolate chips into the center of the batter (they will melt into a gooey molten center).',
      'Microwave on high power for 70 to 80 seconds. Do not overcook to keep it moist and soft.',
      'Allow to rest for 1 minute, dust with icing sugar or top with vanilla ice cream, and enjoy warm!'
    ]
  },
  {
    name: 'Classic Penne Arrabiata',
    description: 'Al dente Italian penne pasta tossed in a fiery, garlicky tomato sauce with fresh basil, olive oil, and parmesan cheese.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810a9?auto=format&fit=crop&w=1000&q=80',
    category: 'Dinner',
    cookingTime: 18,
    preparationTime: 10,
    difficulty: 'Easy',
    servings: 2,
    isVegetarian: true,
    ingredients: [
      { name: 'Penne Pasta', quantity: 200, unit: 'g' },
      { name: 'Tomato', quantity: 4, unit: 'blanched & chopped' },
      { name: 'Garlic', quantity: 5, unit: 'cloves minced' },
      { name: 'Red Chilli Flakes', quantity: 1.5, unit: 'tsp' },
      { name: 'Extra Virgin Olive Oil', quantity: 3, unit: 'tbsp' },
      { name: 'Fresh Basil', quantity: 8, unit: 'leaves' },
      { name: 'Parmesan Cheese', quantity: 2, unit: 'tbsp grated' },
      { name: 'Salt', quantity: 1.5, unit: 'tsp' }
    ],
    instructions: [
      'Boil penne in generous salted boiling water until al dente (about 9-10 minutes). Reserve 1/2 cup pasta water and drain.',
      'Heat extra virgin olive oil in a wide skillet over medium heat. Add minced garlic and chilli flakes, cooking for 60 seconds until garlic is fragrant and pale golden.',
      'Add chopped tomatoes and salt. Cook down for 8-10 minutes until a rich, glossy sauce forms.',
      'Add reserved pasta water and simmer for 2 minutes to emulsify.',
      'Toss the drained penne directly into the sauce, coating every piece thoroughly.',
      'Tear in fresh basil leaves, turn off heat, and serve sprinkled with grated parmesan cheese.'
    ]
  },
  {
    name: 'Vegetable Fried Rice',
    description: 'Quick Indo-Chinese wok-tossed long grain rice loaded with crunchy colorful veggies, spring onions, soy sauce, and black pepper.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80',
    category: 'Lunch',
    cookingTime: 15,
    preparationTime: 10,
    difficulty: 'Easy',
    servings: 3,
    isVegetarian: true,
    ingredients: [
      { name: 'Cooked Rice (Chilled)', quantity: 3, unit: 'cups' },
      { name: 'Carrot', quantity: 1, unit: 'finely diced' },
      { name: 'French Beans', quantity: 0.5, unit: 'cup finely chopped' },
      { name: 'Capsicum (Bell Pepper)', quantity: 0.5, unit: 'cup diced' },
      { name: 'Spring Onion', quantity: 3, unit: 'stalks' },
      { name: 'Garlic', quantity: 4, unit: 'cloves minced' },
      { name: 'Soy Sauce', quantity: 1.5, unit: 'tbsp' },
      { name: 'Vinegar', quantity: 1, unit: 'tsp' },
      { name: 'Black Pepper Powder', quantity: 1, unit: 'tsp' },
      { name: 'Oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Heat oil in a wok on high heat until lightly smoking.',
      'Add minced garlic and white parts of spring onions; stir-fry vigorously for 30 seconds.',
      'Add carrots, beans, and capsicum. Toss on high heat for 2-3 minutes so the vegetables remain vibrant and crunchy.',
      'Add cold cooked rice, breaking up any clumps with a spatula.',
      'Drizzle soy sauce, vinegar, black pepper, and salt around the rim of the wok.',
      'Toss and stir continuously on high flame for 2 minutes until everything is evenly combined.',
      'Garnish with chopped spring onion greens and serve hot with Manchurian or chilli paneer.'
    ]
  },
  {
    name: 'Veg Hakka Noodles',
    description: 'Classic Indo-Chinese street-style stir-fried noodles with crisp cabbage, bell peppers, carrots, garlic, and savory sauces.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1000&q=80',
    category: 'Snacks',
    cookingTime: 15,
    preparationTime: 10,
    difficulty: 'Easy',
    servings: 2,
    isVegetarian: true,
    ingredients: [
      { name: 'Hakka Noodles', quantity: 150, unit: 'g' },
      { name: 'Cabbage', quantity: 1, unit: 'cup shredded' },
      { name: 'Carrot', quantity: 1, unit: 'julienned' },
      { name: 'Capsicum', quantity: 1, unit: 'thinly sliced' },
      { name: 'Onion', quantity: 1, unit: 'thinly sliced' },
      { name: 'Garlic', quantity: 4, unit: 'cloves minced' },
      { name: 'Soy Sauce', quantity: 1.5, unit: 'tbsp' },
      { name: 'Chilli Sauce', quantity: 1, unit: 'tbsp' },
      { name: 'Vinegar', quantity: 1, unit: 'tsp' },
      { name: 'Oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 0.75, unit: 'tsp' }
    ],
    instructions: [
      'Boil noodles according to package instructions until just cooked. Rinse with cold water, toss with 1 tsp oil, and set aside.',
      'Heat oil in a wok on high heat. Add minced garlic and sliced onions, stir-frying for 1 minute.',
      'Add shredded cabbage, carrots, and capsicum. Flash-fry on high flame for 2 minutes, keeping them crisp.',
      'Add the boiled noodles, soy sauce, chilli sauce, vinegar, and salt.',
      'Using two wooden spoons or tongs, toss the noodles vigorously on high heat for 2 minutes.',
      'Top with fresh spring onions and serve immediately.'
    ]
  },
  {
    name: 'Palak Paneer',
    description: 'Wholesome North Indian curry featuring tender golden paneer cubes immersed in a vibrant, spiced spinach gravy with cream and garlic.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    category: 'Dinner',
    cookingTime: 25,
    preparationTime: 15,
    difficulty: 'Medium',
    servings: 4,
    isVegetarian: true,
    ingredients: [
      { name: 'Paneer', quantity: 200, unit: 'g cubed' },
      { name: 'Spinach (Palak)', quantity: 300, unit: 'g fresh' },
      { name: 'Onion', quantity: 1, unit: 'finely chopped' },
      { name: 'Tomato', quantity: 1, unit: 'finely chopped' },
      { name: 'Ginger Garlic Paste', quantity: 1, unit: 'tbsp' },
      { name: 'Green Chilli', quantity: 2, unit: 'pieces' },
      { name: 'Garam Masala', quantity: 0.75, unit: 'tsp' },
      { name: 'Heavy Cream', quantity: 2, unit: 'tbsp' },
      { name: 'Butter / Ghee', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'Blanch washed spinach leaves and green chillies in boiling water for 2 minutes, then immediately transfer to an ice-cold water bath to preserve the emerald green color.',
      'Blend the cooled spinach into a smooth puree without adding excess water.',
      'Heat butter/ghee in a pan. Add cumin seeds, onions, and ginger-garlic paste. Saute until lightly browned.',
      'Add chopped tomatoes and salt. Cook until softened and mashable.',
      'Pour in the blended spinach puree, garam masala, and 1/4 cup water. Simmer gently for 5 minutes.',
      'Add cubed paneer pieces and simmer for 3 minutes.',
      'Swirl in fresh cream and serve hot with rotis or garlic naan.'
    ]
  },
  {
    name: 'Mumbai Special Pav Bhaji',
    description: 'Iconic spicy mashed vegetable curry simmered with heaps of butter and pav bhaji masala, served with buttery griddled pav rolls, lemon, and onions.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1000&q=80',
    category: 'Snacks',
    cookingTime: 30,
    preparationTime: 15,
    difficulty: 'Medium',
    servings: 4,
    isVegetarian: true,
    ingredients: [
      { name: 'Potato', quantity: 3, unit: 'boiled' },
      { name: 'Cauliflower', quantity: 1, unit: 'cup chopped boiled' },
      { name: 'Green Peas', quantity: 0.5, unit: 'cup boiled' },
      { name: 'Capsicum', quantity: 1, unit: 'finely diced' },
      { name: 'Tomato', quantity: 3, unit: 'finely chopped' },
      { name: 'Onion', quantity: 2, unit: 'finely chopped' },
      { name: 'Butter', quantity: 4, unit: 'tbsp' },
      { name: 'Pav Bhaji Masala', quantity: 2.5, unit: 'tbsp' },
      { name: 'Kashmiri Red Chilli Powder', quantity: 1.5, unit: 'tsp' },
      { name: 'Pav Bread Buns', quantity: 8, unit: 'buns' },
      { name: 'Salt', quantity: 1.5, unit: 'tsp' }
    ],
    instructions: [
      'Mash boiled potatoes, cauliflower, and green peas with a potato masher until semi-smooth.',
      'Melt 2 tbsp butter in a large flat pan or tawa. Saute onions and capsicum until soft.',
      'Add ginger garlic paste and tomatoes. Cook until tomatoes are mushy.',
      'Add pav bhaji masala, Kashmiri chilli powder, and salt. Mash vigorously on the pan.',
      'Add the mashed vegetable mix and 1 cup water. Simmer on medium flame, continuously mashing for 10 minutes until you reach a luscious, thick consistency.',
      'Finish bhaji with a generous dollop of butter, chopped coriander, and a squeeze of fresh lemon juice.',
      'Slice pav buns in half, toast generously with butter and a pinch of pav bhaji masala on the hot tawa. Serve hot together.'
    ]
  },
  {
    name: 'Authentic Masala Chai',
    description: 'Traditional Indian spiced milk tea brewed with strong black tea leaves, crushed fresh ginger, green cardamom, cloves, and whole milk.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
    category: 'Breakfast',
    cookingTime: 8,
    preparationTime: 2,
    difficulty: 'Easy',
    servings: 2,
    isVegetarian: true,
    ingredients: [
      { name: 'Water', quantity: 1.5, unit: 'cups' },
      { name: 'Whole Milk', quantity: 1, unit: 'cup' },
      { name: 'Black Tea Leaves (Chai Patti)', quantity: 2, unit: 'tsp' },
      { name: 'Fresh Ginger', quantity: 1, unit: 'inch crushed' },
      { name: 'Cardamom Pods', quantity: 3, unit: 'lightly crushed' },
      { name: 'Cloves', quantity: 2, unit: 'pieces' },
      { name: 'Sugar', quantity: 2, unit: 'tsp' }
    ],
    instructions: [
      'In a saucepan, bring water to a rolling boil.',
      'Add crushed ginger, cardamom pods, and cloves. Let them boil for 2 minutes to extract the deep spices.',
      'Add black tea leaves and simmer for 2 minutes until rich and amber-colored.',
      'Pour in whole milk and sugar. Bring the chai to a vigorous boil.',
      'Lower flame and let it rise again 2-3 times to achieve that deep creamy thickness.',
      'Strain through a fine mesh sieve into cups and enjoy hot with biscuits or samosas.'
    ]
  },
  {
    name: 'Thick Mango Lassi',
    description: 'Cooling, velvety sweet Indian yogurt drink blended with sweet ripe mangoes, a pinch of aromatic cardamom, and garnished with pistachios.',
    image: 'https://images.unsplash.com/photo-1570701564993-e00652af8aa7?auto=format&fit=crop&w=1000&q=80',
    category: 'Desserts',
    cookingTime: 5,
    preparationTime: 5,
    difficulty: 'Easy',
    servings: 2,
    isVegetarian: true,
    ingredients: [
      { name: 'Ripe Mango Pulp', quantity: 1.5, unit: 'cups' },
      { name: 'Thick Plain Yogurt (Curd)', quantity: 1.5, unit: 'cups' },
      { name: 'Cold Milk', quantity: 0.5, unit: 'cup' },
      { name: 'Sugar / Honey', quantity: 2, unit: 'tbsp' },
      { name: 'Cardamom Powder', quantity: 0.25, unit: 'tsp' },
      { name: 'Pistachios & Saffron', quantity: 1, unit: 'tbsp chopped' },
      { name: 'Ice Cubes', quantity: 4, unit: 'cubes' }
    ],
    instructions: [
      'In a blender jar, combine fresh mango pulp, chilled plain yogurt, cold milk, sugar, and cardamom powder.',
      'Add ice cubes and blend on high speed for 60 seconds until frothy, thick, and ultra creamy.',
      'Taste and adjust sweetness according to your mango variety.',
      'Pour into tall chilled glasses.',
      'Garnish with slivered pistachios and saffron strands. Serve cold.'
    ]
  },
  {
    name: 'Soft Gulab Jamun',
    description: 'Melt-in-mouth golden fried milk dough dumplings soaked in warm rose and cardamom-scented sugar syrup.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=80',
    category: 'Desserts',
    cookingTime: 25,
    preparationTime: 15,
    difficulty: 'Medium',
    servings: 6,
    isVegetarian: true,
    ingredients: [
      { name: 'Milk Powder / Khoya', quantity: 1, unit: 'cup' },
      { name: 'All-Purpose Flour (Maida)', quantity: 3, unit: 'tbsp' },
      { name: 'Ghee', quantity: 1, unit: 'tbsp' },
      { name: 'Baking Soda', quantity: 0.25, unit: 'tsp' },
      { name: 'Milk', quantity: 4, unit: 'tbsp' },
      { name: 'Sugar', quantity: 1.5, unit: 'cups' },
      { name: 'Water', quantity: 1.5, unit: 'cups' },
      { name: 'Cardamom Pods', quantity: 4, unit: 'crushed' },
      { name: 'Rose Water', quantity: 1, unit: 'tsp' },
      { name: 'Oil / Ghee for frying', quantity: 2, unit: 'cups' }
    ],
    instructions: [
      'For syrup: Boil sugar and water together with crushed cardamom for 6 minutes until sticky (half-string consistency). Stir in rose water and keep warm.',
      'In a bowl, gently combine milk powder, maida, baking soda, and ghee. Add milk tablespoon by tablespoon to form a soft, moist dough without kneading too hard.',
      'Roll into small, smooth, crack-free balls using oiled palms.',
      'Heat oil/ghee on low flame. Gently slide the jamuns in and fry patiently, rotating gently until uniform dark golden brown all over.',
      'Remove with a slotted spoon and immediately drop into the warm sugar syrup.',
      'Let them soak for at least 30 minutes until they plump up and double in size.'
    ]
  },
  {
    name: 'Spicy Egg Bhurji',
    description: 'Classic Indian street-style scrambled eggs sauteed with onions, juicy tomatoes, ginger, green chillies, and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
    category: 'Breakfast',
    cookingTime: 12,
    preparationTime: 5,
    difficulty: 'Easy',
    servings: 2,
    isVegetarian: false,
    ingredients: [
      { name: 'Eggs', quantity: 4, unit: 'large' },
      { name: 'Onion', quantity: 2, unit: 'finely chopped' },
      { name: 'Tomato', quantity: 2, unit: 'finely chopped' },
      { name: 'Green Chilli', quantity: 2, unit: 'minced' },
      { name: 'Ginger', quantity: 1, unit: 'tsp minced' },
      { name: 'Butter / Oil', quantity: 2, unit: 'tbsp' },
      { name: 'Turmeric Powder', quantity: 0.25, unit: 'tsp' },
      { name: 'Red Chilli Powder', quantity: 0.5, unit: 'tsp' },
      { name: 'Pav Bhaji Masala / Garam Masala', quantity: 0.5, unit: 'tsp' },
      { name: 'Fresh Coriander', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 0.75, unit: 'tsp' }
    ],
    instructions: [
      'In a bowl, crack eggs with a pinch of salt and whisk lightly with a fork.',
      'Heat butter or oil in a pan. Add minced ginger, green chillies, and chopped onions. Saute until onions turn soft and translucent.',
      'Add chopped tomatoes, turmeric, chilli powder, and pav bhaji masala. Cook for 3 minutes until tomatoes break down.',
      'Pour in the whisked eggs and reduce heat to medium-low.',
      'Scramble gently, moving the eggs from the edges inward until soft, pillowy curds form.',
      'Do not overcook; take off heat while still moist. Garnish with coriander and serve hot with toasted pav or roti.'
    ]
  },
  {
    name: 'Classic Margherita Pizza',
    description: 'Crispy artisanal thin-crust pizza topped with crushed San Marzano tomato sauce, fresh mozzarella cheese, and fragrant basil leaves.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=80',
    category: 'Dinner',
    cookingTime: 15,
    preparationTime: 15,
    difficulty: 'Easy',
    servings: 2,
    isVegetarian: true,
    ingredients: [
      { name: 'Pizza Base / Dough', quantity: 1, unit: 'large' },
      { name: 'Pizza / Tomato Sauce', quantity: 0.5, unit: 'cup' },
      { name: 'Mozzarella Cheese', quantity: 1.5, unit: 'cups shredded' },
      { name: 'Fresh Basil Leaves', quantity: 10, unit: 'leaves' },
      { name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
      { name: 'Oregano & Chilli Flakes', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Preheat your oven to 220°C (430°F) or heat a heavy tawa/pizza stone.',
      'Stretch or roll out the pizza dough onto a lightly floured baking tray.',
      'Spread the seasoned tomato sauce evenly across the base, leaving a 1/2-inch border around the edge.',
      'Scatter generous shredded mozzarella cheese over the sauce.',
      'Bake for 10-12 minutes until the crust is golden brown and cheese is bubbling with toasted spots.',
      'Remove from oven, top with fresh basil leaves, a light drizzle of extra virgin olive oil, and chilli flakes.'
    ]
  },
  {
    name: 'Crispy Onion Pakoras',
    description: 'Irresistible Indian tea-time fritters made with thinly sliced onions, gram flour (besan), carom seeds, and green chillies fried to crunchy perfection.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    category: 'Snacks',
    cookingTime: 12,
    preparationTime: 10,
    difficulty: 'Easy',
    servings: 3,
    isVegetarian: true,
    ingredients: [
      { name: 'Onion', quantity: 3, unit: 'large sliced thin' },
      { name: 'Gram Flour (Besan)', quantity: 1, unit: 'cup' },
      { name: 'Rice Flour', quantity: 2, unit: 'tbsp' },
      { name: 'Green Chilli', quantity: 2, unit: 'finely chopped' },
      { name: 'Ajwain (Carom Seeds)', quantity: 0.5, unit: 'tsp' },
      { name: 'Turmeric Powder', quantity: 0.25, unit: 'tsp' },
      { name: 'Red Chilli Powder', quantity: 0.75, unit: 'tsp' },
      { name: 'Fresh Coriander', quantity: 2, unit: 'tbsp' },
      { name: 'Oil for deep frying', quantity: 2, unit: 'cups' },
      { name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      'In a mixing bowl, toss sliced onions with salt, green chillies, ajwain, red chilli powder, turmeric, and chopped coriander.',
      'Squeeze the onions with your fingers and rest for 5 minutes; the onions will release natural moisture.',
      'Sprinkle besan and rice flour over the onions. Mix with your hands until a thick coating clings to the slices (avoid adding extra water for maximum crunchiness).',
      'Heat oil in a deep kadai over medium heat.',
      'Drop small clusters of onion batter into the hot oil.',
      'Fry on medium flame for 4-5 minutes, turning occasionally until golden brown and super crispy.',
      'Drain on paper towels and serve piping hot with green chutney and a hot cup of masala chai.'
    ]
  }
];

module.exports = sampleRecipes;

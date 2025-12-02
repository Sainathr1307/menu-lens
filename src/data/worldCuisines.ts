import { Dish } from "./mockData";

const defaultNutrition = {
    calories: 500,
    protein: "20g",
    carbs: "50g",
    fat: "20g",
    benefits: ["Fresh", "Tasty"]
};

const defaultReviews: any[] = [];

export const worldCuisines: Record<string, Dish[]> = {
    italian: [
        { id: "it-1", name: "Margherita Pizza", price: 14.00, description: "San Marzano tomato sauce, fresh mozzarella, basil, EVOO.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Pizza", nutrition: { ...defaultNutrition, calories: 800 }, reviews: defaultReviews },
        { id: "it-2", name: "Spaghetti Carbonara", price: 18.00, description: "Guanciale, pecorino romano, egg yolk, black pepper.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Pasta", nutrition: { ...defaultNutrition, calories: 950 }, reviews: defaultReviews },
        { id: "it-3", name: "Lasagna Bolognese", price: 20.00, description: "Layers of fresh pasta, beef ragu, bechamel, parmesan.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Pasta", nutrition: { ...defaultNutrition, calories: 1100 }, reviews: defaultReviews },
        { id: "it-4", name: "Chicken Parmigiana", price: 22.00, description: "Breaded chicken breast, marinara, melted mozzarella, spaghetti.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Main", nutrition: { ...defaultNutrition, calories: 1200 }, reviews: defaultReviews },
        { id: "it-5", name: "Tiramisu", price: 10.00, description: "Espresso-soaked ladyfingers, mascarpone cream, cocoa powder.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Dessert", nutrition: { ...defaultNutrition, calories: 450 }, reviews: defaultReviews },
        { id: "it-6", name: "Fettuccine Alfredo", price: 17.00, description: "Creamy parmesan sauce, fresh fettuccine.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Pasta", nutrition: { ...defaultNutrition, calories: 1000 }, reviews: defaultReviews },
        { id: "it-7", name: "Risotto ai Funghi", price: 19.00, description: "Arborio rice, porcini mushrooms, truffle oil, parmesan.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Main", nutrition: { ...defaultNutrition, calories: 700 }, reviews: defaultReviews },
        { id: "it-8", name: "Bruschetta", price: 12.00, description: "Toasted bread, tomatoes, garlic, basil, balsamic glaze.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Appetizer", nutrition: { ...defaultNutrition, calories: 300 }, reviews: defaultReviews },
    ],
    mexican: [
        { id: "mx-1", name: "Tacos Al Pastor", price: 12.00, description: "Marinated pork, pineapple, onion, cilantro, corn tortillas.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Tacos", nutrition: { ...defaultNutrition, calories: 600 }, reviews: defaultReviews },
        { id: "mx-2", name: "Guacamole & Chips", price: 10.00, description: "Fresh avocado, lime, cilantro, jalapeno, house-made chips.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Appetizer", nutrition: { ...defaultNutrition, calories: 500 }, reviews: defaultReviews },
        { id: "mx-3", name: "Carne Asada Burrito", price: 15.00, description: "Grilled steak, rice, beans, cheese, salsa, guacamole.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Burrito", nutrition: { ...defaultNutrition, calories: 900 }, reviews: defaultReviews },
        { id: "mx-4", name: "Chicken Enchiladas", price: 16.00, description: "Corn tortillas, shredded chicken, salsa verde, crema, queso fresco.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Main", nutrition: { ...defaultNutrition, calories: 800 }, reviews: defaultReviews },
        { id: "mx-5", name: "Churros", price: 8.00, description: "Fried dough pastry, cinnamon sugar, chocolate dipping sauce.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Dessert", nutrition: { ...defaultNutrition, calories: 400 }, reviews: defaultReviews },
        { id: "mx-6", name: "Quesadilla", price: 11.00, description: "Flour tortilla, melted cheese, choice of meat, sour cream.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Main", nutrition: { ...defaultNutrition, calories: 700 }, reviews: defaultReviews },
        { id: "mx-7", name: "Fajitas", price: 18.00, description: "Sizzling steak or chicken, peppers, onions, tortillas.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Main", nutrition: { ...defaultNutrition, calories: 850 }, reviews: defaultReviews },
        { id: "mx-8", name: "Elote", price: 6.00, description: "Grilled corn on the cob, mayo, cotija cheese, chili powder.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Side", nutrition: { ...defaultNutrition, calories: 250 }, reviews: defaultReviews },
    ],
    chinese: [
        { id: "cn-1", name: "Kung Pao Chicken", price: 14.00, description: "Spicy stir-fry with chicken, peanuts, vegetables, chili peppers.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Main", nutrition: { ...defaultNutrition, calories: 700 }, reviews: defaultReviews },
        { id: "cn-2", name: "Dim Sum Platter", price: 18.00, description: "Assortment of dumplings, buns, and rolls.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Appetizer", nutrition: { ...defaultNutrition, calories: 600 }, reviews: defaultReviews },
        { id: "cn-3", name: "Peking Duck", price: 35.00, description: "Roasted duck, crispy skin, pancakes, scallions, hoisin sauce.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Main", nutrition: { ...defaultNutrition, calories: 1200 }, reviews: defaultReviews },
        { id: "cn-4", name: "Sweet and Sour Pork", price: 15.00, description: "Battered pork, pineapple, bell peppers, sweet and sour sauce.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Main", nutrition: { ...defaultNutrition, calories: 800 }, reviews: defaultReviews },
        { id: "cn-5", name: "Mapo Tofu", price: 13.00, description: "Tofu, minced meat, spicy chili bean sauce, sichuan peppercorns.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Main", nutrition: { ...defaultNutrition, calories: 500 }, reviews: defaultReviews },
        { id: "cn-6", name: "Chow Mein", price: 12.00, description: "Stir-fried noodles, vegetables, choice of meat.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Noodles", nutrition: { ...defaultNutrition, calories: 600 }, reviews: defaultReviews },
        { id: "cn-7", name: "Spring Rolls", price: 8.00, description: "Crispy rolls filled with vegetables and meat.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Appetizer", nutrition: { ...defaultNutrition, calories: 300 }, reviews: defaultReviews },
        { id: "cn-8", name: "Wonton Soup", price: 10.00, description: "Pork and shrimp wontons, clear broth, bok choy.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Soup", nutrition: { ...defaultNutrition, calories: 200 }, reviews: defaultReviews },
    ],
    japanese: [
        { id: "jp-1", name: "Sushi Deluxe", price: 25.00, description: "Chef's choice of 10 nigiri pieces and a tuna roll.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Sushi", nutrition: { ...defaultNutrition, calories: 600 }, reviews: defaultReviews },
        { id: "jp-2", name: "Tonkotsu Ramen", price: 16.00, description: "Rich pork broth, chashu pork, egg, bamboo shoots, scallions.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Ramen", nutrition: { ...defaultNutrition, calories: 900 }, reviews: defaultReviews },
        { id: "jp-3", name: "Chicken Teriyaki", price: 18.00, description: "Grilled chicken, teriyaki glaze, rice, steamed vegetables.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Main", nutrition: { ...defaultNutrition, calories: 700 }, reviews: defaultReviews },
        { id: "jp-4", name: "Tempura Udon", price: 15.00, description: "Thick wheat noodles, dashi broth, shrimp and vegetable tempura.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Udon", nutrition: { ...defaultNutrition, calories: 800 }, reviews: defaultReviews },
        { id: "jp-5", name: "Matcha Ice Cream", price: 6.00, description: "Green tea flavored ice cream.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Dessert", nutrition: { ...defaultNutrition, calories: 200 }, reviews: defaultReviews },
        { id: "jp-6", name: "Gyoza", price: 8.00, description: "Pan-fried pork and vegetable dumplings.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Appetizer", nutrition: { ...defaultNutrition, calories: 300 }, reviews: defaultReviews },
        { id: "jp-7", name: "Sashimi Platter", price: 28.00, description: "Assortment of fresh raw fish slices.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Sushi", nutrition: { ...defaultNutrition, calories: 400 }, reviews: defaultReviews },
        { id: "jp-8", name: "Miso Soup", price: 4.00, description: "Soybean paste soup, tofu, seaweed, scallions.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Soup", nutrition: { ...defaultNutrition, calories: 50 }, reviews: defaultReviews },
    ],
    thai: [
        { id: "th-1", name: "Pad Thai", price: 14.00, description: "Stir-fried rice noodles, egg, peanuts, bean sprouts, tamarind sauce.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Noodles", nutrition: { ...defaultNutrition, calories: 700 }, reviews: defaultReviews },
        { id: "th-2", name: "Green Curry", price: 16.00, description: "Coconut milk, green curry paste, bamboo shoots, basil, chicken.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Curry", nutrition: { ...defaultNutrition, calories: 800 }, reviews: defaultReviews },
        { id: "th-3", name: "Tom Yum Goong", price: 15.00, description: "Spicy and sour shrimp soup, lemongrass, galangal, mushrooms.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Soup", nutrition: { ...defaultNutrition, calories: 300 }, reviews: defaultReviews },
        { id: "th-4", name: "Som Tum (Papaya Salad)", price: 12.00, description: "Green papaya, chili, lime, peanuts, dried shrimp.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Salad", nutrition: { ...defaultNutrition, calories: 200 }, reviews: defaultReviews },
        { id: "th-5", name: "Mango Sticky Rice", price: 10.00, description: "Sweet sticky rice, fresh mango, coconut cream.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Dessert", nutrition: { ...defaultNutrition, calories: 500 }, reviews: defaultReviews },
        { id: "th-6", name: "Massaman Curry", price: 17.00, description: "Rich curry with potatoes, peanuts, onions, beef.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Curry", nutrition: { ...defaultNutrition, calories: 900 }, reviews: defaultReviews },
        { id: "th-7", name: "Pad See Ew", price: 14.00, description: "Wide rice noodles, soy sauce, egg, chinese broccoli.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Noodles", nutrition: { ...defaultNutrition, calories: 750 }, reviews: defaultReviews },
        { id: "th-8", name: "Thai Iced Tea", price: 5.00, description: "Spiced black tea, condensed milk, ice.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Drink", nutrition: { ...defaultNutrition, calories: 250 }, reviews: defaultReviews },
    ],
    burger: [
        { id: "bg-1", name: "Classic Cheeseburger", price: 12.00, description: "Beef patty, cheddar, lettuce, tomato, onion, pickles, house sauce.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Burger", nutrition: { ...defaultNutrition, calories: 800 }, reviews: defaultReviews },
        { id: "bg-2", name: "Bacon BBQ Burger", price: 14.00, description: "Beef patty, bacon, cheddar, onion rings, BBQ sauce.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Burger", nutrition: { ...defaultNutrition, calories: 1000 }, reviews: defaultReviews },
        { id: "bg-3", name: "Mushroom Swiss Burger", price: 13.00, description: "Beef patty, sautéed mushrooms, swiss cheese, garlic aioli.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Burger", nutrition: { ...defaultNutrition, calories: 900 }, reviews: defaultReviews },
        { id: "bg-4", name: "Veggie Burger", price: 12.00, description: "Plant-based patty, avocado, sprouts, tomato, vegan mayo.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Burger", nutrition: { ...defaultNutrition, calories: 600 }, reviews: defaultReviews },
        { id: "bg-5", name: "Loaded Fries", price: 8.00, description: "French fries, cheese sauce, bacon bits, scallions.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Side", nutrition: { ...defaultNutrition, calories: 700 }, reviews: defaultReviews },
        { id: "bg-6", name: "Milkshake", price: 6.00, description: "Vanilla, chocolate, or strawberry hand-spun shake.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Drink", nutrition: { ...defaultNutrition, calories: 500 }, reviews: defaultReviews },
        { id: "bg-7", name: "Onion Rings", price: 7.00, description: "Beer-battered onion rings, ranch dip.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Side", nutrition: { ...defaultNutrition, calories: 600 }, reviews: defaultReviews },
        { id: "bg-8", name: "Chicken Sandwich", price: 11.00, description: "Fried chicken breast, pickles, mayo, brioche bun.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Burger", nutrition: { ...defaultNutrition, calories: 800 }, reviews: defaultReviews },
    ],
    indian: [
        { id: "in-1", name: "Butter Chicken", price: 16.00, description: "Tandoori chicken, creamy tomato sauce, fenugreek.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Curry", nutrition: { ...defaultNutrition, calories: 900 }, reviews: defaultReviews },
        { id: "in-2", name: "Chicken Tikka Masala", price: 16.00, description: "Grilled chicken chunks, spiced curry sauce.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Curry", nutrition: { ...defaultNutrition, calories: 850 }, reviews: defaultReviews },
        { id: "in-3", name: "Palak Paneer", price: 14.00, description: "Cottage cheese cubes, spinach gravy, spices.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Curry", nutrition: { ...defaultNutrition, calories: 700 }, reviews: defaultReviews },
        { id: "in-4", name: "Lamb Rogan Josh", price: 18.00, description: "Tender lamb, aromatic kashmiri spices, yogurt sauce.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Curry", nutrition: { ...defaultNutrition, calories: 950 }, reviews: defaultReviews },
        { id: "in-5", name: "Garlic Naan", price: 4.00, description: "Leavened flatbread, garlic, cilantro, butter.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Bread", nutrition: { ...defaultNutrition, calories: 300 }, reviews: defaultReviews },
        { id: "in-6", name: "Vegetable Biryani", price: 15.00, description: "Basmati rice, mixed vegetables, saffron, spices.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Rice", nutrition: { ...defaultNutrition, calories: 600 }, reviews: defaultReviews },
        { id: "in-7", name: "Samosa", price: 6.00, description: "Fried pastry, spiced potato and pea filling.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Appetizer", nutrition: { ...defaultNutrition, calories: 250 }, reviews: defaultReviews },
        { id: "in-8", name: "Mango Lassi", price: 5.00, description: "Yogurt drink, mango pulp, cardamom.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Drink", nutrition: { ...defaultNutrition, calories: 300 }, reviews: defaultReviews },
    ],
    generic: [
        { id: "gn-1", name: "Grilled Chicken Salad", price: 14.00, description: "Mixed greens, grilled chicken breast, cherry tomatoes, vinaigrette.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Salad", nutrition: { ...defaultNutrition, calories: 450 }, reviews: defaultReviews },
        { id: "gn-2", name: "Club Sandwich", price: 13.00, description: "Turkey, bacon, lettuce, tomato, mayo, toasted bread.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Sandwich", nutrition: { ...defaultNutrition, calories: 700 }, reviews: defaultReviews },
        { id: "gn-3", name: "Fish and Chips", price: 16.00, description: "Battered cod, french fries, tartar sauce, lemon.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Main", nutrition: { ...defaultNutrition, calories: 900 }, reviews: defaultReviews },
        { id: "gn-4", name: "Caesar Salad", price: 12.00, description: "Romaine lettuce, parmesan, croutons, caesar dressing.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Salad", nutrition: { ...defaultNutrition, calories: 500 }, reviews: defaultReviews },
        { id: "gn-5", name: "Soup of the Day", price: 8.00, description: "Freshly made soup, served with bread.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Soup", nutrition: { ...defaultNutrition, calories: 300 }, reviews: defaultReviews },
        { id: "gn-6", name: "Steak Frites", price: 24.00, description: "Grilled sirloin steak, herb butter, french fries.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Main", nutrition: { ...defaultNutrition, calories: 1100 }, reviews: defaultReviews },
        { id: "gn-7", name: "Chocolate Cake", price: 9.00, description: "Rich chocolate layer cake, ganache frosting.", chefImage: "/images/dish-placeholder.jpg", isFamous: true, category: "Dessert", nutrition: { ...defaultNutrition, calories: 600 }, reviews: defaultReviews },
        { id: "gn-8", name: "Coffee", price: 3.00, description: "Freshly brewed coffee.", chefImage: "/images/dish-placeholder.jpg", isFamous: false, category: "Drink", nutrition: { ...defaultNutrition, calories: 5 }, reviews: defaultReviews },
    ]
};

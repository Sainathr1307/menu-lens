export interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    image?: string;
    date: string;
}

export interface Nutrition {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    benefits: string[];
}

export interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    chefImage: string;
    isFamous: boolean;
    nutrition: Nutrition;
    reviews: Review[];
    category: string;
}

export interface Restaurant {
    id: string;
    name: string;
    location: string;
    image: string;
    rating: number;
    distance: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    menu: Dish[];
}

// Reusable Mock Menus
export const mockIndianMenu: Dish[] = [
    {
        id: "d1",
        name: "Butter Chicken (Murgh Makhani)",
        description: "Tender chicken pieces marinated in yogurt and spices, cooked in a rich, creamy tomato sauce. A classic North Indian delicacy.",
        price: 18.99,
        chefImage: "/images/butter-chicken-chef.jpg",
        isFamous: true,
        category: "Main Course",
        nutrition: {
            calories: 450,
            protein: "25g",
            carbs: "12g",
            fat: "30g",
            benefits: ["High Protein", "Rich in Calcium", "Comfort Food"],
        },
        reviews: [
            {
                id: "rev1",
                user: "Sarah J.",
                rating: 5,
                comment: "Absolutely divine! The sauce is so creamy and flavorful. Looks exactly like the chef's photo.",
                date: "2023-10-15",
                image: "/images/butter-chicken-user1.jpg",
            },
            {
                id: "rev2",
                user: "Mike T.",
                rating: 4,
                comment: "Great taste, but a bit heavy. Perfect for a cheat day.",
                date: "2023-11-02",
            },
        ],
    },
    {
        id: "d2",
        name: "Hyderabadi Chicken Biryani",
        description: "Aromatic basmati rice cooked with succulent chicken, saffron, and a blend of exotic spices. Served with raita and salan.",
        price: 16.50,
        chefImage: "/images/biryani-chef.jpg",
        isFamous: true,
        category: "Rice Specialties",
        nutrition: {
            calories: 600,
            protein: "30g",
            carbs: "70g",
            fat: "20g",
            benefits: ["Complete Meal", "Aromatic Spices", "Energy Boosting"],
        },
        reviews: [
            {
                id: "rev3",
                user: "Amit P.",
                rating: 5,
                comment: "Authentic taste! Reminds me of home.",
                date: "2023-09-20",
                image: "/images/biryani-user1.jpg",
            },
        ],
    },
    {
        id: "d3",
        name: "Palak Paneer",
        description: "Fresh cottage cheese cubes simmered in a smooth, spiced spinach gravy. A healthy and delicious vegetarian option.",
        price: 15.99,
        chefImage: "/images/palak-paneer-chef.jpg",
        isFamous: false,
        category: "Vegetarian",
        nutrition: {
            calories: 320,
            protein: "18g",
            carbs: "10g",
            fat: "22g",
            benefits: ["Iron Rich", "Vegetarian Protein", "Vitamin K"],
        },
        reviews: [],
    },
];

export const mockSouthIndianMenu: Dish[] = [
    {
        id: "d4",
        name: "Masala Dosa",
        description: "Crispy fermented rice and lentil crepe stuffed with spiced potato filling. Served with coconut chutney and sambar.",
        price: 12.99,
        chefImage: "/images/dosa-chef.jpg",
        isFamous: true,
        category: "South Indian",
        nutrition: {
            calories: 350,
            protein: "8g",
            carbs: "55g",
            fat: "10g",
            benefits: ["Fermented Goodness", "Light & Crispy", "Gluten Free"],
        },
        reviews: [],
    },
];

export const mockPizzaMenu: Dish[] = [
    {
        id: "p1",
        name: "Margherita Pizza",
        description: "Classic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella di bufala, basil, and extra virgin olive oil.",
        price: 14.50,
        chefImage: "/images/pizza-margherita.jpg",
        isFamous: true,
        category: "Pizza",
        nutrition: { calories: 800, protein: "35g", carbs: "90g", fat: "30g", benefits: ["Fresh Ingredients", "Vegetarian", "Classic Taste"] },
        reviews: [],
    },
    {
        id: "p2",
        name: "Pepperoni Feast",
        description: "Loaded with crispy pepperoni slices, mozzarella cheese, and our signature tomato sauce on a hand-tossed crust.",
        price: 16.99,
        chefImage: "/images/pizza-pepperoni.jpg",
        isFamous: false,
        category: "Pizza",
        nutrition: { calories: 950, protein: "40g", carbs: "85g", fat: "45g", benefits: ["Protein Packed", "Spicy Kick", "Crowd Pleaser"] },
        reviews: [],
    },
];

export const mockBurgerMenu: Dish[] = [
    {
        id: "b1",
        name: "Classic Cheeseburger",
        description: "Juicy beef patty topped with melted cheddar, lettuce, tomato, onion, and pickles on a toasted brioche bun.",
        price: 13.99,
        chefImage: "/images/burger-cheese.jpg",
        isFamous: true,
        category: "Burgers",
        nutrition: { calories: 700, protein: "30g", carbs: "45g", fat: "40g", benefits: ["100% Beef", "Fresh Veggies", "Comfort Food"] },
        reviews: [],
    },
    {
        id: "b2",
        name: "Truffle Mushroom Burger",
        description: "Beef patty with swiss cheese, sautéed mushrooms, caramelized onions, and truffle aioli.",
        price: 16.50,
        chefImage: "/images/burger-mushroom.jpg",
        isFamous: false,
        category: "Burgers",
        nutrition: { calories: 850, protein: "32g", carbs: "48g", fat: "50g", benefits: ["Gourmet Flavor", "Rich Taste", "Umami Bomb"] },
        reviews: [],
    },
];

export const mockSushiMenu: Dish[] = [
    {
        id: "s1",
        name: "Dragon Roll",
        description: "Shrimp tempura and cucumber topped with avocado, eel sauce, and sesame seeds.",
        price: 15.99,
        chefImage: "/images/sushi-dragon.jpg",
        isFamous: true,
        category: "Sushi",
        nutrition: { calories: 450, protein: "15g", carbs: "60g", fat: "18g", benefits: ["Omega-3", "Fresh Seafood", "Light Meal"] },
        reviews: [],
    },
    {
        id: "s2",
        name: "Spicy Tuna Roll",
        description: "Fresh tuna mixed with spicy mayo and cucumber, wrapped in seaweed and rice.",
        price: 11.50,
        chefImage: "/images/sushi-tuna.jpg",
        isFamous: false,
        category: "Sushi",
        nutrition: { calories: 350, protein: "20g", carbs: "40g", fat: "12g", benefits: ["High Protein", "Low Calorie", "Spicy Kick"] },
        reviews: [],
    },
];

export const mockMexicanMenu: Dish[] = [
    {
        id: "m1",
        name: "Carne Asada Tacos",
        description: "Three soft corn tortillas filled with grilled steak, onions, cilantro, and fresh lime salsa.",
        price: 12.99,
        chefImage: "/images/tacos-asada.jpg",
        isFamous: true,
        category: "Tacos",
        nutrition: { calories: 550, protein: "35g", carbs: "45g", fat: "25g", benefits: ["Gluten Free", "High Protein", "Fresh Flavors"] },
        reviews: [],
    },
];

export const mockChineseMenu: Dish[] = [
    {
        id: "c1",
        name: "Kung Pao Chicken",
        description: "Stir-fried chicken with peanuts, vegetables, and chili peppers in a savory and spicy sauce.",
        price: 14.99,
        chefImage: "/images/chinese-kungpao.jpg",
        isFamous: true,
        category: "Main Course",
        nutrition: { calories: 600, protein: "28g", carbs: "30g", fat: "35g", benefits: ["Spicy", "Nutty Flavor", "Protein Rich"] },
        reviews: [],
    },
];

// Keep existing export for backward compatibility until refactor is complete
export const restaurants: Restaurant[] = [
    {
        id: "r1",
        name: "Royal Tandoor",
        location: "123 Spice Avenue, Downtown",
        image: "/images/restaurant1.jpg",
        rating: 4.8,
        distance: "0.5 miles", // Fallback
        coordinates: {
            lat: 40.7128, // Example: New York
            lng: -74.0060,
        },
        menu: mockIndianMenu,
    },
    {
        id: "r2",
        name: "Spice Garden",
        location: "456 Curry Lane, Westside",
        image: "/images/restaurant2.jpg",
        rating: 4.5,
        distance: "1.2 miles", // Fallback
        coordinates: {
            lat: 40.730610, // Slightly different location
            lng: -73.935242,
        },
        menu: mockSouthIndianMenu,
    },
];

export const getAllDishes = (): Dish[] => {
    return [
        ...mockIndianMenu,
        ...mockSouthIndianMenu,
        ...mockPizzaMenu,
        ...mockBurgerMenu,
        ...mockSushiMenu,
        ...mockMexicanMenu,
        ...mockChineseMenu,
    ];
};

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

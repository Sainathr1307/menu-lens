import Link from "next/link";
import { Dish } from "@/data/mockData";
import { LensType } from "./LensFab";
import { motion } from "framer-motion";

interface DishCardProps {
    dish: Dish;
    restaurantId?: string;
    activeLens?: LensType;
}

export default function DishCard({ dish, restaurantId, activeLens = "none" }: DishCardProps) {
    const href = restaurantId ? `/dish/${dish.id}?restaurantId=${restaurantId}` : `/dish/${dish.id}`;

    // Lens Logic
    const isMatch = () => {
        if (activeLens === "none") return true;

        if (activeLens === "protein") {
            const protein = parseInt(dish.nutrition.protein);
            return !isNaN(protein) && protein >= 20;
        }

        if (activeLens === "vegan") {
            const isVeg = dish.category.toLowerCase().includes("vegetarian") ||
                dish.category.toLowerCase().includes("vegan") ||
                dish.nutrition.benefits.some(b => b.toLowerCase().includes("vegetarian") || b.toLowerCase().includes("vegan"));
            return isVeg;
        }

        if (activeLens === "spicy") {
            return dish.description.toLowerCase().includes("spicy") ||
                dish.nutrition.benefits.some(b => b.toLowerCase().includes("spicy"));
        }

        return false;
    };

    const match = isMatch();
    const isDimmed = activeLens !== "none" && !match;

    return (
        <Link href={href} className={`block group ${isDimmed ? "pointer-events-none" : ""}`}>
            <motion.div
                animate={{
                    opacity: isDimmed ? 0.3 : 1,
                    scale: isDimmed ? 0.95 : 1,
                    filter: isDimmed ? "grayscale(100%)" : "grayscale(0%)"
                }}
                transition={{ duration: 0.4 }}
                className={`bg-card rounded-xl overflow-hidden shadow-md border transition-all duration-300 relative
                    ${dish.isFamous ? 'ring-1 ring-primary/50' : 'border-white/5'}
                    ${activeLens !== "none" && match ? "ring-2 ring-offset-2 ring-offset-black ring-" + (activeLens === "protein" ? "blue-500" : activeLens === "vegan" ? "green-500" : "red-500") : ""}
                `}
            >
                <div className="flex">
                    <div className="w-1/3 relative bg-gray-800 h-32">
                        {/* Placeholder for Dish Image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-900 text-xs text-center p-1">
                            {dish.name}
                        </div>
                        {dish.isFamous && (
                            <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-br-lg">
                                FAMOUS
                            </div>
                        )}
                    </div>

                    <div className="w-2/3 p-3 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {dish.name}
                                </h3>
                                <span className="text-sm font-medium text-primary">${dish.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {dish.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                🔥 {dish.nutrition.calories} cal
                            </span>
                            {dish.reviews.length > 0 && (
                                <span className="flex items-center gap-1">
                                    ⭐ {dish.reviews.reduce((acc, r) => acc + r.rating, 0) / dish.reviews.length} ({dish.reviews.length})
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

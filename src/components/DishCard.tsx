"use client";

import Link from "next/link";
import { Dish } from "@/data/mockData";
import { LensType } from "./LensFab";
import { motion } from "framer-motion";
import { useState, MouseEvent } from "react";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface DishCardProps {
    dish: Dish;
    restaurantId?: string;
    activeLens?: LensType;
}

export default function DishCard({ dish, restaurantId, activeLens = "none" }: DishCardProps) {
    const href = restaurantId ? `/dish/${dish.id}?restaurantId=${restaurantId}` : `/dish/${dish.id}`;
    const [isLiked, setIsLiked] = useState(false);

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

    const handleLike = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const newState = !isLiked;
        setIsLiked(newState);

        if (newState) {
            // Haptic feedback
            if (navigator.vibrate) navigator.vibrate(50);

            // Confetti for famous dishes
            if (dish.isFamous) {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;

                confetti({
                    particleCount: 60,
                    spread: 70,
                    origin: { x, y },
                    colors: ['#FF0000', '#FFD700', '#FFA500'],
                    zIndex: 9999,
                });
            }
        }
    };

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
                            <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-br-lg z-10">
                                FAMOUS
                            </div>
                        )}

                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            className="absolute bottom-1 right-1 p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors z-20"
                        >
                            <Heart
                                size={14}
                                className={`transition-all duration-300 ${isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
                            />
                        </button>
                    </div>

                    <div className="w-2/3 p-3 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {dish.name}
                                </h3>
                                <span className="text-sm font-bold text-secondary">${dish.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {dish.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 text-orange-400">
                                🔥 {dish.nutrition.calories} cal
                            </span>
                            {dish.reviews.length > 0 && (
                                <span className="flex items-center gap-1 text-yellow-400">
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

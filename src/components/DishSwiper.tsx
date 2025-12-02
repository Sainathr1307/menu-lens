import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Dish, getAllDishes } from "@/data/mockData";
import { X, Heart, Utensils } from "lucide-react";

export default function DishSwiper({ onClose }: { onClose: () => void }) {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [likedDishes, setLikedDishes] = useState<Dish[]>([]);

    // Load random dishes on mount
    useEffect(() => {
        const all = getAllDishes();
        // Shuffle
        const shuffled = [...all].sort(() => 0.5 - Math.random());
        setDishes(shuffled.slice(0, 10)); // Take 10 random dishes
    }, []);

    const handleSwipe = (direction: "left" | "right", dish: Dish) => {
        if (direction === "right") {
            setLikedDishes([...likedDishes, dish]);
            if (navigator.vibrate) navigator.vibrate(50);
        }

        // Remove current dish
        setDishes((prev) => prev.slice(1));
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md flex justify-between items-center mb-6 px-4">
                <h2 className="text-2xl font-serif font-bold text-white">Discover</h2>
                <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-white">
                    <X size={24} />
                </button>
            </div>

            <div className="relative w-full max-w-sm aspect-[3/4]">
                <AnimatePresence>
                    {dishes.length > 0 ? (
                        dishes.map((dish, index) => {
                            // Only render top 2 cards for performance
                            if (index > 1) return null;
                            const isTop = index === 0;

                            return (
                                <SwipeCard
                                    key={dish.id}
                                    dish={dish}
                                    isTop={isTop}
                                    onSwipe={(dir) => handleSwipe(dir, dish)}
                                />
                            );
                        })
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                            <div className="text-6xl mb-4">🎉</div>
                            <h3 className="text-xl font-bold mb-2">You're all caught up!</h3>
                            <p className="text-gray-400 mb-6">You liked {likedDishes.length} dishes.</p>
                            <button
                                onClick={onClose}
                                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold"
                            >
                                See My Cravings
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {dishes.length > 0 && (
                <div className="flex gap-8 mt-8">
                    <button className="p-4 bg-gray-800 rounded-full text-red-500 shadow-lg border border-red-500/20">
                        <X size={32} />
                    </button>
                    <button className="p-4 bg-gray-800 rounded-full text-green-500 shadow-lg border border-green-500/20">
                        <Heart size={32} fill="currentColor" className="text-green-500/20" />
                    </button>
                </div>
            )}
        </div>
    );
}

function SwipeCard({ dish, isTop, onSwipe }: { dish: Dish; isTop: boolean; onSwipe: (dir: "left" | "right") => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Color overlays
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x > 100) {
            onSwipe("right");
        } else if (info.offset.x < -100) {
            onSwipe("left");
        }
    };

    return (
        <motion.div
            style={{
                x: isTop ? x : 0,
                rotate: isTop ? rotate : 0,
                zIndex: isTop ? 10 : 0,
                scale: isTop ? 1 : 0.95,
                y: isTop ? 0 : 10,
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isTop ? 1 : 0.95, opacity: 1, y: isTop ? 0 : 10 }}
            exit={{ x: x.get() < 0 ? -500 : 500, opacity: 0, transition: { duration: 0.2 } }}
            className="absolute inset-0 bg-card rounded-3xl overflow-hidden shadow-2xl border border-white/10 cursor-grab active:cursor-grabbing"
        >
            {/* Image Placeholder */}
            <div className="h-3/5 bg-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Utensils size={48} className="mb-2 opacity-50" />
                </div>
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Like/Nope Overlays */}
                <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-500 text-green-500 font-bold text-4xl px-4 py-2 rounded-lg -rotate-12">
                    YUM
                </motion.div>
                <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-red-500 text-red-500 font-bold text-4xl px-4 py-2 rounded-lg rotate-12">
                    NOPE
                </motion.div>
            </div>

            <div className="h-2/5 p-6 flex flex-col justify-between bg-card">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold font-serif text-foreground">{dish.name}</h3>
                        <span className="text-xl font-bold text-primary">${dish.price}</span>
                    </div>
                    <p className="text-muted-foreground line-clamp-3">{dish.description}</p>
                </div>

                <div className="flex gap-3 text-sm text-muted-foreground">
                    <span className="bg-white/5 px-3 py-1 rounded-full">{dish.nutrition.calories} cal</span>
                    <span className="bg-white/5 px-3 py-1 rounded-full">{dish.nutrition.protein} protein</span>
                </div>
            </div>
        </motion.div>
    );
}

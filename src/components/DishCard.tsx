import Link from "next/link";
import { Dish } from "@/data/mockData";

interface DishCardProps {
    dish: Dish;
}

export default function DishCard({ dish }: DishCardProps) {
    return (
        <Link href={`/dish/${dish.id}`} className="block group">
            <div className={`bg-card rounded-xl overflow-hidden shadow-md border border-white/5 transition-all duration-300 ${dish.isFamous ? 'ring-1 ring-primary/50' : ''}`}>
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
            </div>
        </Link>
    );
}

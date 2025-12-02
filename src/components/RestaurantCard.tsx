import Link from "next/link";
import { Restaurant } from "@/data/mockData";
import { motion } from "framer-motion";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/restaurant/${restaurant.id}`} className="block group">
                <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-48 w-full bg-gray-800">
                        {/* Placeholder for Restaurant Image - In real app, use next/image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-900">
                            <span className="text-lg font-serif italic">{restaurant.name} Image</span>
                        </div>
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                            <span className="text-primary font-bold">★ {restaurant.rating}</span>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold font-serif text-foreground group-hover:text-primary transition-colors">
                                {restaurant.name}
                            </h3>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                {restaurant.distance}
                            </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                            {restaurant.location}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-primary/80">
                            <span>Famous for:</span>
                            <span className="text-foreground font-medium">
                                {restaurant.menu.find(d => d.isFamous)?.name || "Delicious Food"}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

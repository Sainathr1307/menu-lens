import Link from "next/link";
import { Restaurant } from "@/data/mockData";
import { motion } from "framer-motion";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
        >
            <Link href={`/restaurant/${restaurant.id}`} className="group relative flex flex-col items-center w-full">
                {/* Circular Image Container */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/5 shadow-xl group-hover:border-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/20 bg-white">
                    {restaurant.logoUrl ? (
                        <img
                            src={restaurant.logoUrl}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-500">
                            <span className="text-xs font-serif italic opacity-50">{restaurant.name}</span>
                        </div>
                    )}

                    {/* Rating Badge - Top Right */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-xs">
                        <span className="text-primary font-bold">★ {restaurant.rating}</span>
                    </div>
                </div>

                {/* Text Content Below */}
                <div className="mt-4 text-center w-full px-2">
                    <h3 className="text-lg font-bold font-serif text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {restaurant.name}
                    </h3>

                    <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-xs text-black font-bold bg-accent px-2 py-0.5 rounded-full">
                            {restaurant.distance}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[100px]">
                            {restaurant.location.split(',')[0]}
                        </span>
                    </div>

                    <div className="mt-2 text-xs text-primary/80">
                        <span className="text-secondary font-medium">
                            {restaurant.menu.find(d => d.isFamous)?.name || "Delicious Food"}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

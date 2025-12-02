"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { restaurants, getAllDishes, Restaurant } from "@/data/mockData";
import NutritionInfo from "@/components/NutritionInfo";
import ReviewGallery from "@/components/ReviewGallery";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchRestaurantById } from "@/services/osmService";

export default function DishPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get("restaurantId");

    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loadingRestaurant, setLoadingRestaurant] = useState(!!restaurantId);

    // Find dish globally
    const allDishes = getAllDishes();
    const dish = allDishes.find(d => d.id === resolvedParams.id);

    useEffect(() => {
        if (restaurantId) {
            // Check static data first
            const staticRestaurant = restaurants.find(r => r.id === restaurantId);
            if (staticRestaurant) {
                setRestaurant(staticRestaurant);
                setLoadingRestaurant(false);
            } else if (restaurantId.startsWith("osm-")) {
                // Fetch OSM restaurant
                setLoadingRestaurant(true);
                fetchRestaurantById(restaurantId)
                    .then(r => setRestaurant(r))
                    .catch(e => console.error(e))
                    .finally(() => setLoadingRestaurant(false));
            } else {
                setLoadingRestaurant(false);
            }
        }
    }, [restaurantId]);

    if (!dish) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Dish Not Found</h1>
                    <Link href="/" className="text-primary hover:underline">Go Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen pb-20 max-w-md mx-auto md:max-w-2xl lg:max-w-4xl bg-background">
            {/* Hero Image - Chef's Real Photo */}
            <div className="relative h-72 w-full bg-gray-800">
                {/* Placeholder for Chef's Real Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-900">
                    <span className="text-2xl font-serif italic">Chef's Real Photo of {dish.name}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/70 transition-colors z-10"
                >
                    ← Back
                </button>

                {dish.isFamous && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        ✨ Famous Dish
                    </div>
                )}
            </div>

            <div className="px-4 -mt-10 relative z-10">
                <div className="bg-card border border-white/5 rounded-2xl p-6 shadow-xl mb-6">
                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-2xl font-serif font-bold text-foreground leading-tight">
                            {dish.name}
                        </h1>
                        <span className="text-xl font-bold text-primary">${dish.price}</span>
                    </div>

                    <p className="text-muted-foreground mb-4">
                        {dish.description}
                    </p>

                    {restaurant && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>from</span>
                            <Link href={`/restaurant/${restaurant.id}`} className="text-primary hover:underline font-medium">
                                {restaurant.name}
                            </Link>
                        </div>
                    )}
                </div>

                <NutritionInfo nutrition={dish.nutrition} />

                <ReviewGallery reviews={dish.reviews} />
            </div>
        </main>
    );
}

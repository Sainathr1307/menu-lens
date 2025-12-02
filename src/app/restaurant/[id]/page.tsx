"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { restaurants, Restaurant } from "@/data/mockData";
import DishCard from "@/components/DishCard";
import { useRouter } from "next/navigation";
import { fetchRestaurantById } from "@/services/osmService";
import LensFab, { LensType } from "@/components/LensFab";

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeLens, setActiveLens] = useState<LensType>("none");

    // Initialize with static data if available
    const [restaurant, setRestaurant] = useState<Restaurant | undefined>(
        restaurants.find(r => r.id === resolvedParams.id)
    );
    const [loading, setLoading] = useState(!restaurant);

    useEffect(() => {
        // If not found in static data and looks like an OSM ID, fetch it
        if (!restaurant && resolvedParams.id.startsWith("osm-")) {
            setLoading(true);
            fetchRestaurantById(resolvedParams.id)
                .then((data) => {
                    if (data) setRestaurant(data);
                })
                .catch(err => console.error("Failed to fetch restaurant", err))
                .finally(() => setLoading(false));
        } else if (!restaurant) {
            setLoading(false);
        }
    }, [resolvedParams.id, restaurant]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-4xl animate-bounce">🥘</div>
                    <p className="font-serif text-xl">Loading Menu...</p>
                </div>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Restaurant Not Found</h1>
                    <Link href="/" className="text-primary hover:underline">Go Home</Link>
                </div>
            </div>
        );
    }

    const filteredDishes = (restaurant?.menu || []).filter(dish =>
        dish?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish?.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const famousDishes = (restaurant?.menu || []).filter(d => d?.isFamous);

    return (
        <main className="min-h-screen pb-20 max-w-md mx-auto md:max-w-2xl lg:max-w-4xl bg-background">
            {/* Hero Section */}
            <div className="relative h-48 w-full bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-900">
                    <span className="text-2xl font-serif italic">{restaurant.name} Cover</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>

                <Link href="/" className="absolute top-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/70 transition-colors">
                    ← Back
                </Link>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-white mb-1">{restaurant.name}</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <span>★ {restaurant.rating}</span>
                                <span>•</span>
                                <span>{restaurant.location}</span>
                            </div>
                        </div>
                        {restaurant.websiteUrl && (
                            <a
                                href={restaurant.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors border border-white/10"
                            >
                                <span>🌐</span> View Website
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-4 py-6">
                {/* Search Bar */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search for a dish (e.g. Butter Chicken)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-muted/50 border border-white/10 rounded-xl py-3 px-4 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    <span className="absolute left-3 top-3.5 text-muted-foreground">🔍</span>
                </div>

                {/* Famous Dishes (only if not searching) */}
                {!searchQuery && famousDishes.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">✨</span> Most Famous
                        </h2>
                        <div className="grid gap-4">
                            {famousDishes.map(dish => (
                                <DishCard key={dish.id} dish={dish} restaurantId={restaurant.id} activeLens={activeLens} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Menu List */}
                <section>
                    <h2 className="text-lg font-bold mb-4">
                        {searchQuery ? "Search Results" : "Full Menu"}
                    </h2>

                    {filteredDishes.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No dishes found matching "{searchQuery}"</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredDishes.map(dish => (
                                <DishCard key={dish.id} dish={dish} restaurantId={restaurant.id} activeLens={activeLens} />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <LensFab activeLens={activeLens} onLensChange={setActiveLens} />
        </main>
    );
}

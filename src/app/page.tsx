"use client";

import { useState } from "react";
import { restaurants } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";

export default function Home() {
  const [isLocating, setIsLocating] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  const handleLocate = () => {
    setIsLocating(true);
    // Simulate location detection delay
    setTimeout(() => {
      setIsLocating(false);
      setLocationDetected(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen pb-20 px-4 pt-8 max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
      {/* Header */}
      <header className="mb-8 text-center animate-[fade-in_0.5s_ease-out]">
        <h1 className="text-4xl font-serif font-bold text-primary mb-2">MenuLens</h1>
        <p className="text-muted-foreground">See what you eat, before you order.</p>
      </header>

      {/* Location Section */}
      <section className="mb-10 animate-[slide-up_0.5s_ease-out_0.2s_both]">
        {!locationDetected ? (
          <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 text-center">
            <div className="mb-4 text-5xl">📍</div>
            <h2 className="text-xl font-bold mb-2">Where are you dining?</h2>
            <p className="text-muted-foreground text-sm mb-6">
              We need your location to show you the right menu.
            </p>
            <button
              onClick={handleLocate}
              disabled={isLocating}
              className="w-full py-3 px-6 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLocating ? "Locating..." : "Detect My Location"}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-muted/30 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-xs text-muted-foreground">Current Location</p>
                <p className="font-bold text-foreground">Downtown, Spice District</p>
              </div>
            </div>
            <button
              onClick={() => setLocationDetected(false)}
              className="text-xs text-primary hover:underline"
            >
              Change
            </button>
          </div>
        )}
      </section>

      {/* Restaurant List */}
      {locationDetected && (
        <section className="animate-[slide-up_0.5s_ease-out_0.1s_both]">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-serif font-bold">Nearby Restaurants</h2>
            <span className="text-xs text-muted-foreground">{restaurants.length} found</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { restaurants, Restaurant } from "@/data/mockData";
import RestaurantCard from "@/components/RestaurantCard";

export default function Home() {
  const [isLocating, setIsLocating] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sortedRestaurants, setSortedRestaurants] = useState<Restaurant[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Haversine formula to calculate distance in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleLocate = () => {
    setIsLocating(true);
    setErrorMsg(null);

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // Sort restaurants by distance
        const sorted = [...restaurants].map(r => {
          const dist = calculateDistance(latitude, longitude, r.coordinates.lat, r.coordinates.lng);
          return { ...r, distance: `${dist.toFixed(1)} miles` };
        }).sort((a, b) => parseFloat(a.distance as string) - parseFloat(b.distance as string));

        setSortedRestaurants(sorted);
        setLocationDetected(true);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        let msg = "Unable to retrieve your location.";
        if (error.code === 1) msg = "Location permission denied. Please allow access.";
        if (error.code === 2) msg = "Location unavailable. Check your GPS.";
        if (error.code === 3) msg = "Location request timed out.";

        setErrorMsg(msg);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds timeout
        maximumAge: 0
      }
    );
  };

  // Auto-detect location on mount
  useEffect(() => {
    handleLocate();
  }, []);

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
            <div className="mb-4 text-5xl animate-bounce">📍</div>
            <h2 className="text-xl font-bold mb-2">Locating you...</h2>
            <p className="text-muted-foreground text-sm mb-6">
              We need your location to show you the right menu.
            </p>

            {errorMsg && (
              <div className="mb-4">
                <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
                <p className="text-xs text-muted-foreground mb-4">
                  (Note: Location features require HTTPS on mobile. You may need to deploy the app to test this.)
                </p>
                <button
                  onClick={() => {
                    setSortedRestaurants(restaurants); // Show unsorted
                    setLocationDetected(true);
                  }}
                  className="text-sm text-primary underline"
                >
                  View Restaurants Anyway
                </button>
              </div>
            )}

            <button
              onClick={handleLocate}
              disabled={isLocating}
              className="w-full py-3 px-6 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLocating ? "Detecting Location..." : "Try Again"}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-muted/30 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-xs text-muted-foreground">Current Location</p>
                <p className="font-bold text-foreground">
                  {userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : "Unknown"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setLocationDetected(false);
                handleLocate();
              }}
              className="text-xs text-primary hover:underline"
            >
              Refresh
            </button>
          </div>
        )}
      </section>

      {/* Restaurant List */}
      {locationDetected && (
        <section className="animate-[slide-up_0.5s_ease-out_0.1s_both]">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-serif font-bold">Nearby Restaurants</h2>
            <span className="text-xs text-muted-foreground">{sortedRestaurants.length} found</span>
          </div>

          {/* Distance Warning */}
          {sortedRestaurants.length > 0 && parseFloat(sortedRestaurants[0].distance as string) > 50 && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 text-sm text-yellow-500">
              ⚠️ You seem to be far from our demo restaurants (New York). We've listed them anyway!
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {sortedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

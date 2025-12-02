import {
    Dish,
    Restaurant
} from "@/data/mockData";

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

interface OSMNode {
    id: number;
    type: "node" | "way";
    lat?: number;
    lon?: number;
    center?: {
        lat: number;
        lon: number;
    };
    tags: {
        name?: string;
        "addr:street"?: string;
        cuisine?: string;
        amenity?: string;
        website?: string;
    };
}

import { worldCuisines } from "@/data/worldCuisines";

const getMenuForCuisine = (tags: OSMNode["tags"]): Dish[] => {
    const cuisine = tags.cuisine?.toLowerCase() || "";
    const name = tags.name?.toLowerCase() || "";
    const combined = `${cuisine} ${name} `;

    // Helper to check keywords
    const has = (keywords: string[]) => keywords.some(k => combined.includes(k));

    if (has(["pizza", "italian", "pasta", "trattoria", "romano", "olive"])) return worldCuisines.italian;
    if (has(["mexican", "taco", "burrito", "cantina", "salsa", "chipotle"])) return worldCuisines.mexican;
    if (has(["chinese", "wok", "dim sum", "dumpling", "sichuan", "cantonese", "panda"])) return worldCuisines.chinese;
    if (has(["japanese", "sushi", "ramen", "teriyaki", "tempura", "izakaya", "tokyo"])) return worldCuisines.japanese;
    if (has(["thai", "siam", "bangkok", "pad thai", "curry", "lemongrass"])) return worldCuisines.thai;
    if (has(["burger", "grill", "bbq", "american", "diner", "steak", "pub"])) return worldCuisines.burger; // Using burger as generic american/bbq for now
    if (has(["indian", "curry", "tandoor", "masala", "spice", "delhi", "bombay"])) return worldCuisines.indian;

    // Fallbacks for other common types
    if (has(["cafe", "coffee", "bakery", "donut", "bagel", "breakfast", "brunch"])) return worldCuisines.generic; // Could add specific breakfast menu later
    if (has(["seafood", "fish", "crab", "lobster", "oyster"])) return worldCuisines.generic; // Could add seafood menu
    if (has(["bar", "pub", "brewery", "tavern"])) return worldCuisines.burger;

    // Default to a high-quality generic menu instead of just Indian
    return worldCuisines.generic;
};

export const fetchNearbyRestaurants = async (lat: number, lng: number, radius: number = 5000): Promise<Restaurant[]> => {
    // Query for restaurants within 'radius' meters (default 5km)
    // We fetch both nodes (points) and ways (buildings)
    const query = `
[out:json][timeout: 25];
(
    node["amenity" = "restaurant"](around: ${radius}, ${lat}, ${lng});
way["amenity" = "restaurant"](around: ${radius}, ${lat}, ${lng});
    );
    out center 20;
`;

    try {
        const response = await fetch(OVERPASS_API_URL, {
            method: "POST",
            body: query,
        });

        if (!response.ok) {
            throw new Error("Failed to fetch from OpenStreetMap");
        }

        const data = await response.json();
        const elements: OSMNode[] = data.elements;

        // Map OSM elements to our Restaurant interface
        return elements
            .filter((element) => element.tags && element.tags.name) // Only use restaurants with names
            .map((element, index) => {
                // Smart Menu Matching
                const menu = getMenuForCuisine(element.tags);

                // Generate a consistent random rating between 3.5 and 5.0
                const rating = 3.5 + (element.id % 15) / 10;

                // For 'way' elements, Overpass 'out center' provides 'center' object with lat/lon
                // For 'node' elements, it provides 'lat' and 'lon' directly
                const lat = element.lat || (element.center && element.center.lat) || 0;
                const lng = element.lon || (element.center && element.center.lon) || 0;

                // Logo Logic
                let logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(element.tags.name || "R")}&background=random&color=fff&size=128`;
                if (element.tags.website) {
                    // Use Google Favicon API if website is available
                    // Extract domain from website url
                    try {
                        const domain = new URL(element.tags.website.startsWith("http") ? element.tags.website : `http://${element.tags.website}`).hostname;
                        logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                    } catch (e) {
                        // Fallback to avatar if URL parsing fails
                    }
                }

                return {
                    id: `osm-${element.type}-${element.id}`, // Include type to be unique and queryable
                    name: element.tags.name || "Unknown Restaurant",
                    location: element.tags["addr:street"] || "Nearby",
                    // Use placeholder images cyclically
                    image: index % 2 === 0 ? "/images/restaurant1.jpg" : "/images/restaurant2.jpg",
                    logoUrl: logoUrl,
                    websiteUrl: element.tags.website, // Pass website URL
                    rating: parseFloat(rating.toFixed(1)),
                    distance: "Calculating...", // Will be updated by the UI
                    coordinates: {
                        lat: lat,
                        lng: lng,
                    },
                    menu: menu,
                };
            });
    } catch (error) {
        console.error("Error fetching OSM data:", error);
        return [];
    }
};

export const fetchRestaurantById = async (id: string): Promise<Restaurant | null> => {
    // Parse ID format: osm-{type}-{id}
    const parts = id.split("-");
    if (parts.length !== 3 || parts[0] !== "osm") return null;

    const type = parts[1]; // node or way
    const osmId = parts[2];

    const query = `
    [out:json][timeout:10];
    ${type}(${osmId});
    out center;
  `;

    try {
        const response = await fetch(OVERPASS_API_URL, {
            method: "POST",
            body: query,
        });

        if (!response.ok) return null;

        const data = await response.json();
        if (data.elements.length === 0) return null;

        const element = data.elements[0];

        // Smart Menu Matching for Detail Page
        const menu = getMenuForCuisine(element.tags);
        const rating = 3.5 + (parseInt(osmId) % 15) / 10;

        const lat = element.lat || (element.center && element.center.lat) || 0;
        const lng = element.lon || (element.center && element.center.lon) || 0;

        return {
            id: id,
            name: element.tags.name || "Unknown Restaurant",
            location: element.tags["addr:street"] || "Nearby",
            image: parseInt(osmId) % 2 === 0 ? "/images/restaurant1.jpg" : "/images/restaurant2.jpg",
            rating: parseFloat(rating.toFixed(1)),
            distance: "", // Not needed for detail page
            coordinates: { lat, lng },
            menu: menu,
            websiteUrl: element.tags.website, // Pass website URL
        };
    } catch (error) {
        console.error("Error fetching restaurant by ID:", error);
        return null;
    }
};

import {
    Restaurant,
    mockIndianMenu,
    mockSouthIndianMenu,
    mockPizzaMenu,
    mockBurgerMenu,
    mockSushiMenu,
    mockMexicanMenu,
    mockChineseMenu,
    Dish
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
    };
}

const getMenuForCuisine = (tags: OSMNode["tags"]): Dish[] => {
    const cuisine = tags.cuisine?.toLowerCase() || "";
    const name = tags.name?.toLowerCase() || "";

    // Check explicit cuisine tag first
    if (cuisine.includes("pizza") || cuisine.includes("italian")) return mockPizzaMenu;
    if (cuisine.includes("burger") || cuisine.includes("american")) return mockBurgerMenu;
    if (cuisine.includes("sushi") || cuisine.includes("japanese")) return mockSushiMenu;
    if (cuisine.includes("mexican") || cuisine.includes("taco")) return mockMexicanMenu;
    if (cuisine.includes("chinese") || cuisine.includes("asian")) return mockChineseMenu;
    if (cuisine.includes("indian")) return mockIndianMenu;

    // Fallback: Check name for keywords
    if (name.includes("pizza") || name.includes("pizzeria")) return mockPizzaMenu;
    if (name.includes("burger") || name.includes("grill")) return mockBurgerMenu;
    if (name.includes("sushi")) return mockSushiMenu;
    if (name.includes("taco") || name.includes("mexican")) return mockMexicanMenu;
    if (name.includes("chinese") || name.includes("wok")) return mockChineseMenu;
    if (name.includes("curry") || name.includes("tandoor")) return mockIndianMenu;
    if (name.includes("dosa")) return mockSouthIndianMenu;

    // Default to Indian if unknown (as per original theme) or rotate based on random logic if preferred
    return mockIndianMenu;
};

export const fetchNearbyRestaurants = async (lat: number, lng: number, radius: number = 5000): Promise<Restaurant[]> => {
    // Query for restaurants within 'radius' meters (default 5km)
    // We fetch both nodes (points) and ways (buildings)
    const query = `
    [out:json][timeout:25];
    (
      node["amenity"="restaurant"](around:${radius},${lat},${lng});
      way["amenity"="restaurant"](around:${radius},${lat},${lng});
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

                return {
                    id: `osm-${element.type}-${element.id}`, // Include type to be unique and queryable
                    name: element.tags.name || "Unknown Restaurant",
                    location: element.tags["addr:street"] || "Nearby",
                    // Use placeholder images cyclically
                    image: index % 2 === 0 ? "/images/restaurant1.jpg" : "/images/restaurant2.jpg",
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
        };
    } catch (error) {
        console.error("Error fetching restaurant by ID:", error);
        return null;
    }
};

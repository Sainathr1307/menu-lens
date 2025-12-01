import { Restaurant, mockIndianMenu, mockSouthIndianMenu } from "@/data/mockData";

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

interface OSMNode {
    id: number;
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
                // Assign a random menu for demo purposes
                const isSouthIndian = index % 2 !== 0;
                const menu = isSouthIndian ? mockSouthIndianMenu : mockIndianMenu;

                // Generate a consistent random rating between 3.5 and 5.0
                const rating = 3.5 + (element.id % 15) / 10;

                // For 'way' elements, Overpass 'out center' provides 'center' object with lat/lon
                // For 'node' elements, it provides 'lat' and 'lon' directly
                const lat = element.lat || (element.center && element.center.lat) || 0;
                const lng = element.lon || (element.center && element.center.lon) || 0;

                return {
                    id: `osm-${element.id}`,
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

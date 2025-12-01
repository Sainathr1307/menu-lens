import { Restaurant, mockIndianMenu, mockSouthIndianMenu } from "@/data/mockData";

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

interface OSMNode {
    id: number;
    lat: number;
    lon: number;
    tags: {
        name?: string;
        "addr:street"?: string;
        cuisine?: string;
        amenity?: string;
    };
}

export const fetchNearbyRestaurants = async (lat: number, lng: number, radius: number = 2000): Promise<Restaurant[]> => {
    // Query for restaurants within 'radius' meters
    const query = `
    [out:json][timeout:25];
    node["amenity"="restaurant"](around:${radius},${lat},${lng});
    out body 10;
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
        const nodes: OSMNode[] = data.elements;

        // Map OSM nodes to our Restaurant interface
        return nodes
            .filter((node) => node.tags.name) // Only use restaurants with names
            .map((node, index) => {
                // Assign a random menu for demo purposes
                const isSouthIndian = index % 2 !== 0;
                const menu = isSouthIndian ? mockSouthIndianMenu : mockIndianMenu;

                // Generate a consistent random rating between 3.5 and 5.0
                const rating = 3.5 + (node.id % 15) / 10;

                return {
                    id: `osm-${node.id}`,
                    name: node.tags.name || "Unknown Restaurant",
                    location: node.tags["addr:street"] || "Nearby",
                    // Use placeholder images cyclically
                    image: index % 2 === 0 ? "/images/restaurant1.jpg" : "/images/restaurant2.jpg",
                    rating: parseFloat(rating.toFixed(1)),
                    distance: "Calculating...", // Will be updated by the UI
                    coordinates: {
                        lat: node.lat,
                        lng: node.lon,
                    },
                    menu: menu,
                };
            });
    } catch (error) {
        console.error("Error fetching OSM data:", error);
        return [];
    }
};

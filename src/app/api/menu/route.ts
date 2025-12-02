import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        // Add protocol if missing
        const targetUrl = url.startsWith('http') ? url : `https://${url}`;

        // Fetch the website content
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch website: ${response.statusText}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const menuItems: any[] = [];
        const seenNames = new Set();

        // Heuristic: Look for elements that might contain menu items
        // Strategy 1: Look for price patterns like $12.99, 12.99, etc.
        // and try to find the associated dish name.

        $('body').find('*').each((i, el) => {
            // Skip script, style, and hidden elements
            if (['script', 'style', 'noscript', 'iframe', 'svg', 'path'].includes(el.tagName)) return;

            const text = $(el).text().trim();
            if (!text) return;

            // Regex for price: $10, $10.99, 10.99 (at end of string or standalone)
            // This is a simple heuristic and won't be perfect.
            const priceMatch = text.match(/(\$?\d{1,3}(\.\d{2})?)/);

            if (priceMatch) {
                // If this element contains a price, look at its siblings or parent for the name
                // This is tricky. Let's try a simpler approach:
                // Look for list items or divs that contain both text and a price.
            }
        });

        // Strategy 2: Iterate over common container tags (li, div, tr, p, span, h3, h4, h5, article)
        $('li, div, tr, article, p, span, h3, h4, h5').each((i, el) => {
            const $el = $(el);
            // Get direct text only to avoid duplicating parent/child text
            const text = $el.text().replace(/\s+/g, ' ').trim();

            // Check if text length is reasonable for a menu item (e.g. "Burger $10")
            // Relaxed constraints: min 4 chars, max 150 chars
            if (text.length < 4 || text.length > 150) return;

            // Regex to find price at the end or beginning
            // Matches: "Burger $12.99", "$12.99 Burger", "Burger ... 12.99"
            // Improved regex to handle more formats
            const priceRegex = /(\$|£|€)?\s*(\d{1,3}(\.\d{2})?)\b/;
            const match = text.match(priceRegex);

            if (match) {
                const price = match[0];
                // Remove price from text to get name
                let name = text.replace(price, '').trim();

                // Clean up name: remove leading/trailing non-word chars, but keep internal punctuation
                name = name.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9)]+$/g, '').trim();

                // Check if name is valid
                if (name.length > 3 && name.length < 60 && !seenNames.has(name)) {
                    // Filter out common non-food words
                    const stopWords = ['total', 'subtotal', 'tax', 'shipping', 'cart', 'checkout', 'view', 'add', 'item', 'price', 'quantity', 'menu', 'order', 'home', 'contact'];
                    if (stopWords.some(word => name.toLowerCase() === word || name.toLowerCase().startsWith(word + ' '))) return;

                    // Filter out very long numbers (phone numbers)
                    if (name.match(/\d{5,}/)) return;

                    menuItems.push({
                        id: `scraped-${i}`,
                        name: name,
                        price: price,
                        description: "Imported from website",
                        image: "/images/dish-placeholder.jpg", // Fallback
                        calories: "N/A",
                        isFamous: false
                    });
                    seenNames.add(name);
                }
            }
        });

        // Limit results - Increased to 100
        const limitedMenu = menuItems.slice(0, 100);

        return NextResponse.json({
            success: true,
            source: targetUrl,
            items: limitedMenu
        });

    } catch (error: any) {
        console.error('Scraping error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

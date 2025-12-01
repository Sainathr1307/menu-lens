import { Review } from "@/data/mockData";

interface ReviewGalleryProps {
    reviews: Review[];
}

export default function ReviewGallery({ reviews }: ReviewGalleryProps) {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-8 bg-muted/20 rounded-xl border border-dashed border-white/10">
                <p className="text-muted-foreground">No reviews yet. Be the first to try it!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-yellow-500">⭐</span> Customer Reviews ({reviews.length})
            </h3>

            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x">
                {reviews.map((review) => (
                    <div key={review.id} className="snap-center shrink-0 w-64 bg-card border border-white/5 rounded-xl p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm">{review.user}</span>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>

                        <div className="flex text-yellow-500 text-xs mb-2">
                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-grow">
                            "{review.comment}"
                        </p>

                        {review.image && (
                            <div className="relative h-32 w-full bg-gray-800 rounded-lg overflow-hidden mt-auto">
                                {/* Placeholder for User Review Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-900 text-xs">
                                    User Photo
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

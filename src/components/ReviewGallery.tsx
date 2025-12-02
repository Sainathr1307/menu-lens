"use client";

import { Review } from "@/data/mockData";
import { useState, useRef } from "react";
import { Camera, Upload } from "lucide-react";

interface ReviewGalleryProps {
    reviews: Review[];
}

export default function ReviewGallery({ reviews: initialReviews }: ReviewGalleryProps) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const newReview: Review = {
                id: `new-${Date.now()}`,
                user: "You",
                rating: 5,
                comment: "Just uploaded a photo!",
                date: new Date().toISOString().split('T')[0],
                image: e.target?.result as string,
            };
            setReviews([newReview, ...reviews]);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span> Customer Reviews ({reviews.length})
                </h3>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-bold hover:bg-primary/20 transition-colors"
                >
                    <Camera size={16} />
                    Add Photo
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            {reviews.length === 0 ? (
                <div className="text-center py-8 bg-muted/20 rounded-xl border border-dashed border-white/10">
                    <p className="text-muted-foreground">No reviews yet. Be the first to upload one!</p>
                </div>
            ) : (
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
                                    <img
                                        src={review.image}
                                        alt="User Review"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

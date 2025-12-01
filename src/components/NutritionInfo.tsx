import { Nutrition } from "@/data/mockData";

interface NutritionInfoProps {
    nutrition: Nutrition;
}

export default function NutritionInfo({ nutrition }: NutritionInfoProps) {
    return (
        <div className="bg-card/50 border border-white/5 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-green-500">🌱</span> Nutrition Facts
            </h3>

            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-lg font-bold text-primary">{nutrition.calories}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Calories</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-lg font-bold">{nutrition.protein}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Protein</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-lg font-bold">{nutrition.carbs}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Carbs</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-lg font-bold">{nutrition.fat}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Fat</div>
                </div>
            </div>

            <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Benefits</h4>
                <div className="flex flex-wrap gap-2">
                    {nutrition.benefits.map((benefit, index) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                            {benefit}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

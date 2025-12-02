import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanEye, Leaf, Flame, Dumbbell, X } from "lucide-react";

export type LensType = "none" | "protein" | "vegan" | "spicy";

interface LensFabProps {
    activeLens: LensType;
    onLensChange: (lens: LensType) => void;
}

export default function LensFab({ activeLens, onLensChange }: LensFabProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSelect = (lens: LensType) => {
        onLensChange(lens === activeLens ? "none" : lens);
        setIsOpen(false);
    };

    const menuItems = [
        { id: "protein", label: "High Protein", icon: Dumbbell, color: "bg-blue-500" },
        { id: "vegan", label: "Vegan / Veg", icon: Leaf, color: "bg-green-500" },
        { id: "spicy", label: "Spicy", icon: Flame, color: "bg-red-500" },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-3 items-end"
                    >
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item.id as LensType)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-white/10 text-white font-medium transition-transform active:scale-95 ${activeLens === item.id ? item.color : "bg-black/80"
                                    }`}
                            >
                                <span className="text-sm">{item.label}</span>
                                <item.icon size={18} />
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleOpen}
                className={`p-4 rounded-full shadow-2xl text-white flex items-center justify-center transition-colors ${activeLens !== "none" ? "bg-accent text-black" : "bg-primary text-black border border-white/20"
                    }`}
            >
                {isOpen ? <X size={24} /> : <ScanEye size={24} />}
            </motion.button>

            {activeLens !== "none" && !isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-16 top-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
                >
                    Lens Active
                </motion.div>
            )}
        </div>
    );
}

import {
    Dish,
    mockIndianMenu,
    mockSouthIndianMenu,
    mockPizzaMenu,
    mockBurgerMenu,
    mockSushiMenu,
    mockMexicanMenu,
    mockChineseMenu
} from "@/data/mockData";
import { worldCuisines } from "@/data/worldCuisines";

export const getAllDishes = (): Dish[] => {
    const staticDishes = [
        ...mockIndianMenu,
        ...mockSouthIndianMenu,
        ...mockPizzaMenu,
        ...mockBurgerMenu,
        ...mockSushiMenu,
        ...mockMexicanMenu,
        ...mockChineseMenu,
    ];

    const worldDishes = Object.values(worldCuisines).flat();

    return [...staticDishes, ...worldDishes];
};

export const getDishById = (id: string): Dish | undefined => {
    return getAllDishes().find(d => d.id === id);
};

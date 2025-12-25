export interface Product {
    id: number;
    name: string;
    price: number;
    category: number;
    image: string;
    description?: string;
}

export interface Category {
    id: number;
    name: string; // Translation key e.g. 'menu.categoryItems.firstMeals'
    iconType: 'Soup' | 'Pizza' | 'GlassWater' | 'IceCream' | 'Coffee';
}

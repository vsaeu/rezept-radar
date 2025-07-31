export interface Recipe {
    id: number;
    name: string;
    ingredients: Map<Ingredient, number>; // Map of ingredient to amount
    instructions: string;
    imageUrl?: string; // Optional image URL
    portionSize?: number; // Default portion size
    preparationTime?: number; // Preparation time in minutes
    cookingTime?: number; // Cooking time in minutes    
    totalTime?: number; // Total time in minutes

    nutritionalInfo?: {
        calories?: number;
        protein?: number;
        carbs?: number;
        fats?: number;
    }; // Optional nutritional information

    dietTypes?: DietType[]; // Optional diet type(s)
    cuisineType?: CuisineType; // Optional cuisine type
    mealType?: MealType; // Optional meal type

    rating?: number; // Optional rating (1-5 stars)
}

// list of possible ingredients
export enum Ingredient {
    Spaghetti = 'Spaghetti',
    GroundBeef = 'Ground Beef',
    TomatoSauce = 'Tomato Sauce',
    Onion = 'Onion',
    Garlic = 'Garlic',
    Flour = 'Flour',
    Milk = 'Milk',
    Egg = 'Egg',
    Sugar = 'Sugar',
    BakingPowder = 'Baking Powder',
    // Add more ingredients as needed
}

// list of possible diet types
export enum DietType {
    None = 'None',
    Vegetarian = 'Vegetarian',
    Vegan = 'Vegan',
    GlutenFree = 'Gluten Free',
    DairyFree = 'Dairy Free',
    LowCarb = 'Low Carb',
    HighProtein = 'High Protein',
    Other = 'Other'
}

// list of possible meal types
export enum MealType {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Snack = 'Snack',
    Dessert = 'Dessert',
    Beverage = 'Beverage'
}

// list of possible cuisines
export enum CuisineType {
    Italian = 'Italian',
    American = 'American',
    Asian = 'Asian',
    Chinese = 'Chinese',
    Indian = 'Indian',
    Mexican = 'Mexican',
    French = 'French',
    Japanese = 'Japanese',
    Mediterranean = 'Mediterranean',
    Thai = 'Thai',
    Spanish = 'Spanish',
    Other = 'Other'
}
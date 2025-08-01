import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CuisineType, DietType, Ingredient, MealType, Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish with a rich meat sauce.',
      imageUrl:
        'https://images.unsplash.com/photo-1713561058969-793049b01712?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ingredients: new Map([
        [Ingredient.Spaghetti, 200],
        [Ingredient.GroundBeef, 300],
        [Ingredient.TomatoSauce, 150],
        [Ingredient.Onion, 1],
        [Ingredient.Garlic, 2],
      ]),
      instructions: 'Cook spaghetti. Brown ground beef with onion and garlic. Add tomato sauce. Combine.',
      portionSize: 2,
      preparationTime: 10,
      cookingTime: 20,
      totalTime: 30,
      nutritionalInfo: {
        calories: 600,
        protein: 30,
        carbs: 70,
        fats: 20,
      },
      dietTypes: [DietType.None],
      cuisineType: CuisineType.Italian,
      mealType: MealType.Dinner,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Vegetable Stir Fry',
      ingredients: new Map([
        [Ingredient.Onion, 1],
        [Ingredient.Garlic, 2],
        [Ingredient.Flour, 50],
        [Ingredient.Milk, 100],
      ]),
      instructions: 'Stir fry vegetables with onion and garlic. Serve with a sauce made from flour and milk.',
      portionSize: 2,
      preparationTime: 15,
      cookingTime: 10,
      totalTime: 25,
      nutritionalInfo: {
        calories: 300,
        protein: 10,
        carbs: 40,
        fats: 15,
      },
      dietTypes: [DietType.Vegetarian],
      cuisineType: CuisineType.Asian,
      mealType: MealType.Lunch,
      rating: 4.0,
    },
  ];

  constructor() {}

  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  getRecipeById(id: number): Observable<Recipe | undefined> {
    if (isNaN(id) || id < 1) {
      console.error('Invalid recipe ID:', id);
      return of(undefined);
    }
    return of(this.recipes.find((recipe) => recipe.id === id));
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    recipe.id = Math.max(...this.recipes.map((recipe) => recipe.id)) + 1;
    this.recipes.push(recipe);
    return of(recipe);
  }

  updateRecipe(updatedRecipe: Recipe): Observable<Recipe | undefined> {
    const index = this.recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
    if (index !== -1) {
      this.recipes[index] = updatedRecipe;
      return of(updatedRecipe);
    }
    return of(undefined);
  }

  deleteRecipe(id: number): Observable<boolean> {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index !== -1) {
      this.recipes.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Methods for searching, filtering, and sorting recipes can be added here
}

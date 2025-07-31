import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { DietType, CuisineType, MealType, Ingredient, Recipe } from '../models/recipe.model';

describe('RecipeService', () => {
    let service: RecipeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RecipeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return all recipes', (done) => {
        service.getRecipes().subscribe(recipes => {
            expect(recipes.length).toBeGreaterThan(0);
            expect(recipes[0].name).toBeDefined();
            done();
        });
    });

    it('should return a recipe by id', (done) => {
        service.getRecipeById(1).subscribe(recipe => {
            expect(recipe).toBeDefined();
            expect(recipe?.id).toBe(1);
            done();
        });
    });

    it('should return undefined for non-existing recipe id', (done) => {
        service.getRecipeById(999).subscribe(recipe => {
            expect(recipe).toBeUndefined();
            done();
        });
    });

    it('should add a new recipe', (done) => {
        const newRecipe: Recipe = {
            id: 0,
            name: 'Test Recipe',
            ingredients: new Map([[Ingredient.Onion, 1]]),
            instructions: 'Test instructions',
            imageUrl: '',
            portionSize: 1,
            preparationTime: 5,
            cookingTime: 10,
            totalTime: 15,
            nutritionalInfo: { calories: 100, protein: 2, carbs: 10, fats: 1 },
            dietTypes: [DietType.None],
            cuisineType: CuisineType.Italian,
            mealType: MealType.Breakfast,
            rating: 3
        };
        service.addRecipe(newRecipe).subscribe(added => {
            expect(added.id).toBeGreaterThan(0);
            service.getRecipes().subscribe(recipes => {
                expect(recipes.find(r => r.id === added.id)).toBeTruthy();
                done();
            });
        });
    });

    it('should update an existing recipe', (done) => {
        service.getRecipeById(1).subscribe(recipe => {
            if (recipe) {
                const updated = { ...recipe, name: 'Updated Name' };
                service.updateRecipe(updated).subscribe(result => {
                    expect(result).toBeDefined();
                    expect(result?.name).toBe('Updated Name');
                    done();
                });
            }
        });
    });

    it('should return undefined when updating non-existing recipe', (done) => {
        const fakeRecipe: Recipe = {
            id: 999,
            name: 'Fake',
            ingredients: new Map(),
            instructions: '',
            imageUrl: '',
            portionSize: 1,
            preparationTime: 1,
            cookingTime: 1,
            totalTime: 2,
            nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fats: 0 },
            dietTypes: [DietType.None],
            cuisineType: CuisineType.Italian,
            mealType: MealType.Breakfast,
            rating: 0
        };
        service.updateRecipe(fakeRecipe).subscribe(result => {
            expect(result).toBeUndefined();
            done();
        });
    });

    it('should delete a recipe by id', (done) => {
        service.addRecipe({
            id: 0,
            name: 'To Delete',
            ingredients: new Map(),
            instructions: '',
            imageUrl: '',
            portionSize: 1,
            preparationTime: 1,
            cookingTime: 1,
            totalTime: 2,
            nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fats: 0 },
            dietTypes: [DietType.None],
            cuisineType: CuisineType.Italian,
            mealType: MealType.Breakfast,
            rating: 0
        }).subscribe(added => {
            service.deleteRecipe(added.id).subscribe(result => {
                expect(result).toBeTrue();
                service.getRecipeById(added.id).subscribe(recipe => {
                    expect(recipe).toBeUndefined();
                    done();
                });
            });
        });
    });

    it('should return false when deleting non-existing recipe', (done) => {
        service.deleteRecipe(999).subscribe(result => {
            expect(result).toBeFalse();
            done();
        });
    });
});
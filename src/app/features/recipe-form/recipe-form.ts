import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CuisineType, DietType, Ingredient, MealType, Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css',
})
export class RecipeForm implements OnInit {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  public recipe = input<Recipe>();
  public recipeId?: number;

  public form: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      instructions: ['', Validators.required],
      imageUrl: [''],
      portionSize: [1],
      preparationTime: [0],
      cookingTime: [0],
      nutritionalInfo: this.fb.group({
        calories: [null],
        protein: [null],
        carbs: [null],
        fats: [null],
      }),
      dietTypes: [[]],
      cuisineType: [''],
      mealType: [''],
      rating: [null],
      ingredients: this.fb.array([]),
    });

    if (this.recipe()) {
      this.patchForm(this.recipe()!);
      this.recipeId = this.recipe()!.id;
    }
  }

  patchForm(recipe: Recipe) {
    this.form.patchValue({
      ...recipe,
      ingredients: [], // wird manuell gemacht
    });

    const ingredientsArray = this.form.get('ingredients') as FormArray;
    ingredientsArray.clear();
    recipe.ingredients.forEach((amount, name) => {
      ingredientsArray.push(
        this.fb.group({
          name: [name, Validators.required],
          amount: [amount, [Validators.required, Validators.min(1)]],
        })
      );
    });
  }

  readonly ingredientsArray = computed(() => this.form.get('ingredients') as FormArray<FormGroup>);

  readonly ingredientsList = Object.values(Ingredient);
  readonly dietTypes = Object.values(DietType);
  readonly mealTypes = Object.values(MealType);
  readonly cuisineTypes = Object.values(CuisineType);

  addIngredient() {
    this.ingredientsArray().push(
      this.fb.group({
        name: [this.ingredientsList[0], Validators.required],
        amount: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeIngredient(index: number) {
    this.ingredientsArray().removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    const ingredientsMap = new Map<Ingredient, number>();
    for (const ing of raw.ingredients) {
      ingredientsMap.set(ing.name, ing.amount);
    }

    const recipe = {
      ...raw,
      ingredients: ingredientsMap,
      totalTime: (raw.preparationTime ?? 0) + (raw.cookingTime ?? 0),
    };

    if (this.recipe()) {
      this.updateRecipe(recipe);
    } else {
      this.addRecipe(recipe);
    }
  }

  logRecipes() {
    setTimeout(() => {
      this.recipeService.getRecipes().subscribe({
        next: (allRecipes) => {
          console.log('Recipes:', allRecipes);
        },
      });
    }, 1000);
  }

  addRecipe(recipe: Recipe): void {
    this.recipeService.addRecipe(recipe).subscribe({
      next: (newRecipe) => {
        this.form.reset();
        this.router.navigate(['/recipes', newRecipe.id]);
      },
      error: (err) => {
        console.error('Error saving recipe:', err);
      },
    });
  }

  updateRecipe(updatedRecipe: Recipe) {
    console.log('updatedRecipe: ', updatedRecipe);
    updatedRecipe.id = this.recipeId!;
    this.recipeService.updateRecipe(updatedRecipe).subscribe(() => {
      this.router.navigate(['/recipes', updatedRecipe.id]);
    });
  }

  onDelete() {
    if (this.recipe()) {
      this.recipeService.deleteRecipe(this.recipe()!.id).subscribe(() => {
        this.router.navigate(['/recipes']);
      });
    }
  }
}

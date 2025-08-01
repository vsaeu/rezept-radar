import { Component, computed, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  CuisineType,
  DietType,
  Ingredient,
  MealType,
} from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-create.html',
  styleUrl: './recipe-create.css',
})
export class RecipeCreate {
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  public form: any;
  constructor(private fb: FormBuilder) {
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
  }

  readonly ingredientsArray = computed(
    () => this.form.get('ingredients') as FormArray<FormGroup>
  );

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

    this.recipeService.addRecipe(recipe).subscribe({
      next: (newRecipe) => {
        console.log('🎉 Recipe saved:', newRecipe);
        this.form.reset();
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.error('Error saving recipe:', err);
      },
    });

    // for testing
    this.recipeService.getRecipes().subscribe({
      next: (allRecipes) => {
        console.log('Recipes:', allRecipes);
      },
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  public recipes: Recipe[] = [];

  private recipeService = inject(RecipeService);
  private router = inject(Router);

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  onView(recipe: Recipe) {
    // Navigate to recipe detail page with recipe ID
    this.router.navigate(['/recipes', recipe.id]);
  }

  onEdit(recipe: Recipe) {
    // Navigate to edit page with recipe ID
    this.router.navigate(['/recipes', recipe.id, 'edit']);
  }

  onDelete(recipe: Recipe) {
    // Call delete method from service
    this.recipeService.deleteRecipe(recipe.id).subscribe({
      next: () => {
        // Remove recipe from list after deletion
        this.recipes = this.recipes.filter((r) => r.id !== recipe.id);
      },
      error: (error) => {
        console.error('Error deleting recipe:', error);
      },
    });
  }

  onCreate() {
    // Navigate to create recipe page
    this.router.navigate(['/recipes', 'new']);
  }
}

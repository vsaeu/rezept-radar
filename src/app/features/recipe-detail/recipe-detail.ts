import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  public recipe: Recipe | undefined = undefined;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  ngOnInit(): void {
    // get id from route params
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getRecipe(parseInt(id));
    });
  }

  // get recipe from service using id
  private getRecipe(id: number) {
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
      },
      error: (error) => {
        console.error('Error fetching recipe:', error);
      },
    });
  }

  onEdit() {
    if (this.recipe) {
      // Navigate to edit page with recipe ID
      this.router.navigate(['/recipes', this.recipe.id, 'edit']);
    }
  }

  onDelete() {
    if (this.recipe) {
      // Call delete method from service
      this.recipeService.deleteRecipe(this.recipe.id).subscribe({
        next: () => {
          // Navigate back to recipe list after deletion
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          console.error('Error deleting recipe:', error);
        },
      });
    }
  }
}

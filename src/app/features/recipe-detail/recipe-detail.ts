import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  public recipe: Recipe | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

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
}

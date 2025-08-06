import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeForm } from '../recipe-form/recipe-form';

@Component({
  selector: 'app-recipe-edit',
  imports: [RecipeForm],
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.css',
})
export class RecipeEdit {
  recipeId: number = 0;
  recipe?: Recipe;

  route = inject(ActivatedRoute);
  recipeService = inject(RecipeService);

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id')!;
    this.recipeId = parseInt(recipeId);
    this.recipeService.getRecipeById(this.recipeId).subscribe((data) => {
      this.recipe = data;
    });
  }
}

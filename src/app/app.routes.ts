import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { RecipeDetail } from './features/recipe-detail/recipe-detail';
import { RecipeEdit } from './features/recipe-edit/recipe-edit';
import { RecipeForm } from './features/recipe-form/recipe-form';
import { RecipeList } from './features/recipe-list/recipe-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'recipes', component: RecipeList },
  { path: 'recipes/new', component: RecipeForm },
  { path: 'recipes/:id', component: RecipeDetail },
  { path: 'recipes/:id/edit', component: RecipeEdit },
  { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { RecipeCreate } from './features/recipe-create/recipe-create';
import { RecipeDetail } from './features/recipe-detail/recipe-detail';
import { RecipeEdit } from './features/recipe-edit/recipe-edit';
import { RecipeList } from './features/recipe-list/recipe-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'recipes', component: RecipeList },
  { path: 'recipes/new', component: RecipeCreate },
  { path: 'recipes/:id', component: RecipeDetail },
  { path: 'recipes/:id/edit', component: RecipeEdit },
  { path: '**', redirectTo: '' }
];

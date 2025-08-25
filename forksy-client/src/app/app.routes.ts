import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../app/pages/home/home.component').then(m => m.HomeComponent)

  },
  {
    path:'message',
    loadComponent: () => import('../app/pages/message/message.component').then(m => m.MessageComponent)
  },
  {
    path:'profile',
    loadComponent: () => import('../app/pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path:'my-recipe',
    loadComponent: () => import('../app/pages/my-recipe/my-recipe.component').then(m => m.MyRecipeComponent)

  },
  {
    path:'my-favorite-recipe',
    loadComponent: () => import('../app/pages/my-favourite-recipe/my-favourite-recipe.component').then(m => m.MyFavouriteRecipeComponent)

  },
  {
    path:'recipe-detail/:id',
    loadComponent: () => import('../app/pages/my-recipe/my-recipe.component').then(m => m.MyRecipeComponent)
  },
  {
    path:'search-recipe',
    loadComponent: () => import('../app/pages/search-recipe/search-recipe.component').then(m => m.SearchRecipeComponent)
  },
  {
    path:'create-recipe',
    loadComponent: () => import('../app/pages/create-recipe/create-recipe.component').then(m => m.CreateRecipeComponent),
  },
  {
    path:'update-recipe/:id',
    loadComponent: () => import('../app/pages/update-recipe/update-recipe.component').then(m => m.UpdateRecipeComponent),
  },
  {
    path:'about',
    loadComponent: () => import('../app/pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path:'**',
    redirectTo: ''
  }


];

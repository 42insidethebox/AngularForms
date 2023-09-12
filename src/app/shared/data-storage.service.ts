import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) {}
    storeRecipes() {
        const recipes =
            this.recipeService.getRecipes();
        console.log(recipes);
        this.http
            .put(
                'https://ng-recipe-book-project-7dc17-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                recipes
            )
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(
                        'this is the error',
                        error
                    );
                }
            );
    }

    fetchRecipes() {
        this.http
            .get<Recipe[]>(
                'https://ng-recipe-book-project-7dc17-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
            )
            .subscribe((recipes) => {
                this.recipeService.setRecipes(
                    recipes
                );
            });
    }
}

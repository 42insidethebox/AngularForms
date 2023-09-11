import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent
    implements OnInit, OnDestroy
{
    @Output() recipeWasSelected =
        new EventEmitter<Recipe>();
    recipes: Recipe[] = [
        new Recipe(
            'A test Recipe',
            'This is a simple test',
            'https://img.taste.com.au/mOx3fOxf/w720-h480-cfill-q80/taste/2022/09/garlic-chilli-prawn-pasta-181440-1.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient(
                    'French Fries',
                    20
                ),
            ]
        ),
        new Recipe(
            'Another test Recipe',
            'This is a simpler test',
            'https://images.kitchenstories.io/wagtailOriginalImages/R2568-photo-final-_0.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
            ]
        ),
    ];
    subscription: Subscription;
    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscription =
            this.recipeService.recipesChanged.subscribe(
                (recipes: Recipe[]) => {
                    this.recipes = recipes;
                }
            );
        this.recipes =
            this.recipeService.getRecipes();
    }

    // onRecipeSelected(recipe: Recipe) {
    //     this.recipeWasSelected.emit(recipe);
    // }
    onRecipeSelected(recipe: Recipe) {
        this.recipeService.setSelectedRecipe(
            recipe
        );
    }
    onNewRecipe() {
        this.router.navigate(['new'], {
            relativeTo: this.route,
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

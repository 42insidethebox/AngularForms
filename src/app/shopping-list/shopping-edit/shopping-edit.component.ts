import { formatCurrency } from '@angular/common';
import {
    Component,
    // ElementRef,
    // ViewChild,
    OnInit,
    OnDestroy,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent
    implements OnInit
{
    // @ViewChild('nameInput')
    // nameInputRef: ElementRef;
    // @ViewChild('amountInput')
    // amountInputRef: ElementRef;

    @ViewChild('f') slForm: NgForm;

    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;
    @Output() ingredientAdded =
        new EventEmitter<Ingredient>();
    constructor(
        private slService: ShoppingListService
    ) {}

    ngOnInit(): void {
        this.subscription =
            this.slService.startedEditing.subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                    this.editedItem =
                        this.slService.getIngredient(
                            index
                        );
                    this.slForm.setValue({
                        name: this.editedItem
                            .name,
                        amount: this.editedItem
                            .amount,
                    });
                }
            );
    }

    onSubmitItem(form: NgForm) {
        // const ingName =
        //     this.nameInputRef.nativeElement.value;
        // const ingAmount =
        //     this.amountInputRef.nativeElement
        //         .value;
        // const newIngredient = new Ingredient(
        //     ingName,
        //     ingAmount
        // );
        // this.ingredientAdded.emit(newIngredient);
        console.log('submitted');
        const value = form.value;
        console.log(value);
        const newIngredient = new Ingredient(
            value.name,
            value.amount
        );
        if (this.editMode) {
            this.slService.updateIngredient(
                this.editedItemIndex,
                newIngredient
            );
        } else {
            this.slService.addIngredient(
                newIngredient
            );
        }
        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.onClear();
        this.slService.deleteIngredient(
            this.editedItemIndex
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

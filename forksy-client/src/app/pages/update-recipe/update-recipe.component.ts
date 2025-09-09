import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

interface Step {
  id: string;
  description: string;
  image?: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  originCountry: string;
  difficulty: string;
  note: string;
  servings: number;
  cookingTime: string;
  ingredients: Ingredient[];
  steps: Step[];
  mainImage?: string;
  stepImages?: { [key: string]: string };
  createdAt: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.scss',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class UpdateRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  mainImage: string | null = null;
  stepImages: { [key: string]: string } = {};
  servings = 2;
  cookingTime = '';
  timeOptions: string[] = [];
  recipeId: string | null = null;
  currentRecipe: Recipe | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.recipeForm = this.fb.group({
      title: ["", Validators.required],
      description: [''],
      originCountry: [''],
      difficulty: ['medium'],
      note: [''],
      servings: [, Validators.required],
      cookingTime: ['1h 30m', Validators.required],
      ingredients: this.fb.array([]),
      steps: this.fb.array([])
    });
  }

  ngOnInit() {
    this.timeOptions = this.generateTimeOptions(15, 300); // 15m steps up to 5h
    
    // Get recipe ID from route parameters
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      if (this.recipeId) {
        this.loadRecipe(this.recipeId);
      }
    });
  }

  private generateTimeOptions(stepMinutes: number, maxMinutes: number): string[] {
    const options: string[] = [];
    for (let m = stepMinutes; m <= maxMinutes; m += stepMinutes) {
      const hours = Math.floor(m / 60);
      const mins = m % 60;
      const label = hours > 0 ? `${hours}h ${mins > 0 ? mins + 'm' : ''}`.trim() : `${mins}m`;
      options.push(label);
    }
    return options;
  }

  loadRecipe(recipeId: string) {
    // TODO: Replace with actual API call
    // For now, we'll simulate loading a recipe
    const mockRecipe: Recipe = {
      id: recipeId,
      title: "Phở Bò",
      description: "Traditional Vietnamese beef noodle soup",
      originCountry: "Vietnam",
      difficulty: "medium",
      note: "Best served hot with fresh herbs",
      servings: 4,
      cookingTime: "2h 30m",
      ingredients: [
        { id: "1", name: "500g beef bones", amount: "500g" },
        { id: "2", name: "300g rice noodles", amount: "300g" },
        { id: "3", name: "200g beef brisket", amount: "200g" },
        { id: "4", name: "1 onion", amount: "1 piece" }
      ],
      steps: [
        { id: "1", description: "Boil beef bones for 2 hours to make broth" },
        { id: "2", description: "Slice beef brisket thinly" },
        { id: "3", description: "Cook rice noodles according to package instructions" },
        { id: "4", description: "Assemble bowl with noodles, beef, and hot broth" }
      ],
      mainImage: "https://via.placeholder.com/400x300?text=Phở+Bò",
      stepImages: {
        "0": "https://via.placeholder.com/200x150?text=Step+1",
        "1": "https://via.placeholder.com/200x150?text=Step+2"
      },
      createdAt: new Date().toISOString()
    };

    this.currentRecipe = mockRecipe;
    this.bindRecipeToForm(mockRecipe);
  }

  bindRecipeToForm(recipe: Recipe) {
    // Set basic form values
    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
      originCountry: recipe.originCountry,
      difficulty: recipe.difficulty,
      note: recipe.note,
      servings: recipe.servings,
      cookingTime: recipe.cookingTime
    });

    // Set servings
    this.servings = recipe.servings;

    // Set main image
    this.mainImage = recipe.mainImage || null;

    // Set step images
    this.stepImages = recipe.stepImages || {};

    // Clear existing form arrays
    this.clearFormArrays();

    // Add ingredients
    recipe.ingredients.forEach(ingredient => {
      this.addIngredient(ingredient.name, ingredient.amount);
    });

    // Add steps
    recipe.steps.forEach(step => {
      this.addStep(step.description);
    });
  }

  clearFormArrays() {
    // Clear ingredients array
    while (this.ingredients.length !== 0) {
      this.ingredients.removeAt(0);
    }

    // Clear steps array
    while (this.steps.length !== 0) {
      this.steps.removeAt(0);
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient(name: string = '', amount: string = '') {
    const ingredient = this.fb.group({
      name: [name, Validators.required],
      amount: [amount, Validators.required]
    });
    this.ingredients.push(ingredient);
  }

  addStep(description: string = '') {
    const step = this.fb.group({
      description: [description, Validators.required]
    });
    this.steps.push(step);
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  onMainImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        this.snackBar.open('File size must be less than 10MB', 'Close', { duration: 3000 });
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.snackBar.open('Please select a valid image file', 'Close', { duration: 3000 });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mainImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerImageUpload() {
    const fileInput = document.getElementById('mainImageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  triggerStepImageUpload(stepIndex: number) {
    const fileInput = document.getElementById(`stepImageInput${stepIndex}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onStepImageUpload(event: any, stepIndex: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.stepImages[stepIndex] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteRecipe() {
    if (confirm('Are you sure you want to delete this recipe?')) {
      // TODO: Implement actual delete API call
      this.snackBar.open('Recipe deleted.', 'Close', { duration: 3000 });
      this.router.navigate(['/my-recipe']);
    }
  }

  updateRecipe() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.getRawValue();

      const payload = {
        id: this.recipeId,
        title: formValue.title,
        description: formValue.description,
        originCountry: formValue.originCountry,
        difficulty: formValue.difficulty,
        note: formValue.note,
        servings: this.servings,
        cookingTime: formValue.cookingTime,
        ingredients: formValue.ingredients,
        steps: formValue.steps,
        mainImage: this.mainImage || null,
        stepImages: this.stepImages,
        updatedAt: new Date().toISOString()
      };

      // TODO: Implement actual update API call
      console.log('Updated recipe:', payload);

      this.snackBar.open('Recipe updated successfully!', 'Close', { duration: 3000 });
      this.router.navigate(['/my-recipe']);
    } else {
      this.snackBar.open('Please complete all required information.', 'Close', { duration: 3000 });
    }
  }

  updateServings(value: number) {
    this.servings = Math.max(1, this.servings + value);
    this.recipeForm.patchValue({ servings: this.servings });
  }

  updateCookingTime(value: number) {
    // Not used with dropdown; kept for compatibility
    this.cookingTime = '1h 30m';
  }
}

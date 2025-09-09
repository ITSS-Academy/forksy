import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-create-recipe',
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
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class CreateRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  mainImage: string | null = null;
  stepImages: { [key: string]: string } = {};
  servings = 2;
  cookingTime = '';
  timeOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
      ingredients: this.fb.array([
        this.fb.group({
          name: ['', Validators.required]

        })
      ]),
      steps: this.fb.array([
        this.fb.group({
          description: ['', Validators.required]
        })
      ])
    });
  }

  ngOnInit() {
    this.timeOptions = this.generateTimeOptions(15, 300); // 15m steps up to 5h
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

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    const ingredient = this.fb.group({
      name: [''],
      amount: ['']
    });
    this.ingredients.push(ingredient);
  }

  addStep() {
    const step = this.fb.group({
      description: ['']
    });
    this.steps.push(step);
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
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

  clearRecipe() {
    if (confirm('Are you sure you want to clear all recipe information?')) {
      // Reset form to initial state
      this.recipeForm.reset();
      this.recipeForm.patchValue({
        difficulty: 'medium',
        servings: 2,
        cookingTime: '1h 30m'
      });
      
      // Clear images
      this.mainImage = null;
      this.stepImages = {};
      
      // Reset servings counter
      this.servings = 2;
      
      // Clear form arrays and add default items
      this.clearFormArrays();
      this.addIngredient();
      this.addStep();
      
      this.snackBar.open('Recipe cleared successfully!', 'Close', { duration: 3000 });
    }
  }

  publishRecipe() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.getRawValue();

      const payload = {
        title: formValue.title,
        description: formValue.description,
        originCountry: formValue.originCountry,
        difficulty: formValue.difficulty,
        servings: this.servings,
        cookingTime: formValue.cookingTime,
        ingredients: formValue.ingredients,
        steps: formValue.steps,
        mainImage: this.mainImage || null,
        stepImages: this.stepImages,
        createdAt: new Date().toISOString()
      };

      // Build ONE unified object to return/log (flat shape)
      const unified = {
        id: 'rcp_' + Date.now().toString(36),
        status: 'published',
        publishedAt: new Date().toISOString(),
        ...payload
      };

      // Single console line for easy copy/check
      // eslint-disable-next-line no-console
      console.log('Unified recipe object:', unified);

      // Additionally log arrays in Java-like and TS-like formats for easy reuse
      const ingredientNames = (payload.ingredients || []).map((i: any) => (i?.name ?? '').replace(/"/g, '\\"'));
      const stepTexts = (payload.steps || []).map((s: any) => (s?.description ?? '').replace(/"/g, '\\"'));

      const javaLike = `String[] ingredients = {${ingredientNames.map((n: string) => `\"${n}\"`).join(',')}}; String[] steps = {${stepTexts.map((t: string) => `\"${t}\"`).join(',')}};`;
      const tsLike = `const ingredients = [${ingredientNames.map((n: string) => `\"${n}\"`).join(', ')}]; const steps = [${stepTexts.map((t: string) => `\"${t}\"`).join(', ')}];`;
      // eslint-disable-next-line no-console
      console.log('Java-like arrays:', javaLike);
      // eslint-disable-next-line no-console
      console.log('TS-like arrays:', tsLike);

      this.snackBar.open('Recipe published successfully!', 'Close', { duration: 3000 });
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

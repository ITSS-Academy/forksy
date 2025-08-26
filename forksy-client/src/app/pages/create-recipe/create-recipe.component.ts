import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  mainImagePreview: string | null = null;
  stepImages: (string | null)[][] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.recipeForm = this.fb.group({
      title: ['Thịt chả rang nước mắm', Validators.required],
      ingredients: this.fb.array([
        this.fb.group({
          name: ['400 g thịt vai heo', Validators.required]
        }),
        this.fb.group({
          name: ['200 g chả chiên', Validators.required]
        }),
        this.fb.group({
          name: ['1 mc hành tím băm', Validators.required]
        }),
        this.fb.group({
          name: ['Gia vị', Validators.required]
        })
      ]),
      steps: this.fb.array([
        this.fb.group({
          description: ['Mô tả bước 1', Validators.required],
          images: this.fb.array([null, null, null])
        }),
        this.fb.group({
          description: ['Mô tả bước 2', Validators.required],
          images: this.fb.array([null, null, null])
        })
      ])
    });
  }

  ngOnInit(): void {
    this.stepImages = new Array(this.steps.length).fill(null).map(() => new Array(3).fill(null));
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  onMainImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mainImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onStepImageSelected(event: any, stepIndex: number, imgIndex: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.stepImages[stepIndex][imgIndex] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getStepImage(stepIndex: number, imgIndex: number): string | null {
    return this.stepImages[stepIndex]?.[imgIndex] || null;
  }

  addIngredient(): void {
    const ingredient = this.fb.group({
      name: ['', Validators.required]
    });
    this.ingredients.push(ingredient);
  }

  addStep(): void {
    const step = this.fb.group({
      description: ['', Validators.required],
      images: this.fb.array([null, null, null])
    });
    this.steps.push(step);
    this.stepImages.push(new Array(3).fill(null));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
    this.stepImages.splice(index, 1);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      console.log('Recipe form submitted:', this.recipeForm.value);
      this.snackBar.open('Công thức đã được tạo thành công!', 'Đóng', {
        duration: 3000
      });
    } else {
      this.snackBar.open('Vui lòng điền đầy đủ thông tin bắt buộc!', 'Đóng', {
        duration: 3000
      });
    }
  }
}

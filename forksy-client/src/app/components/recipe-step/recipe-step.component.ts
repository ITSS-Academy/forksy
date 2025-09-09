import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RecipeStep {
  description: string;
  image?: string;
}

@Component({
  selector: 'app-recipe-step',
  templateUrl: './recipe-step.component.html',
  styleUrls: ['./recipe-step.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class RecipeStepComponent {
  @Input() steps: RecipeStep[] = [];
  @Input() timeToCook: string = '';
  @Output() addStep = new EventEmitter<void>();
  @Output() removeStep = new EventEmitter<number>();

  onAddStep() {
    this.addStep.emit();
  }

  onRemoveStep(index: number) {
    this.removeStep.emit(index);
  }

  onImageChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.steps[index].image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

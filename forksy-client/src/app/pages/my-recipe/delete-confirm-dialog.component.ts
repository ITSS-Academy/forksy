import { Component } from '@angular/core';
import { MatDialogContent } from "@angular/material/dialog";
import { MaterialModule } from "../../shared/material.module";

@Component({
  selector: 'app-delete-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Delete Recipe</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this recipe?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Yes, Delete</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogContent, MaterialModule]
})
export class DeleteConfirmDialogComponent {}
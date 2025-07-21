import { Component, Inject, inject, NgModule} from '@angular/core';
import { MetaDataService } from '../meta-data.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { 
  MatDialogContent, 
  MatDialogTitle,
  MatDialogModule, 
  MAT_DIALOG_DATA,
  MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-save-data-locally-modal',
  imports: [MatDialogContent, MatDialogTitle, MatDialogModule, MatButtonModule, MatInputModule, FormsModule],
  // template: `
  //   <h2 mat-dialog-title>Saving data locally</h2>
  //   <mat-dialog-content>
  //       <form [FormGroup]="dialogForm">
  //         <mat-form-field>
  //             <mat-label>File Path</mat-label>
  //             <input matInput formControlName="newFilePath" type="string" />
  //         </mat-form-field>
  //         <mat-form-field>
  //             <mat-label>File Name</mat-label>
  //             <input matInput formControlName="newFileName" type="string"/>
  //         </mat-form-field>
  //       </form>
  //   </mat-dialog-content>
  //   <mat-dialog-actions>
  //     <button mat-button (click)="onCancel()">Cancel</button>
  //     <button mat-raised-button (click)="onSubmit()">Ok</button>
  //   </mat-dialog-actions>`,
  templateUrl: './save-data-locally-modal.component.html',
  styleUrl: './save-data-locally-modal.component.css'
})
export class SaveDataLocallyModalComponent {
  protected filePath: string = '';
  protected fileName: string = '';
  private dialogRef = inject(MatDialogRef);
  // private MetaDataService = inject(MetaDataService);

  constructor() {
    console.log('Here we are');
  }

  onSubmit(): void {

  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without data
  }

  // updateFilePath(newFilePath: string) { this.MetaDataService.updateFilePath(newFilePath); }
  // updateFileName(newFileName: string) { this.MetaDataService.updateFileName(newFileName); }

}

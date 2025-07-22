import { Component, Inject, inject, NgModule, NgZone } from '@angular/core';
import { MetaDataService } from '../meta-data.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import {
  MatDialogContent,
  MatDialogTitle,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ChangeDetectorRef } from '@angular/core';

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

  constructor(private cdr: ChangeDetectorRef) { }

  onFolderPicked(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const f = input.files?.[0]; // first file in selected folder 
    if (!f) return;
    if (window.electronAPI) {
      const fullPath = window.electronAPI.getAbsolutePath(f);
      this.filePath = fullPath.split(/[\\/]/).slice(0, -1).join('/');
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without data
  }

  // updateFilePath(newFilePath: string) { this.MetaDataService.updateFilePath(newFilePath); }
  // updateFileName(newFileName: string) { this.MetaDataService.updateFileName(newFileName); }

}

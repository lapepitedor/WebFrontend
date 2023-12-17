import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-profil',
  templateUrl: './delete-profil.component.html',
  styleUrls: ['./delete-profil.component.css'],
})
export class DeleteProfilComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.id);
  }
}

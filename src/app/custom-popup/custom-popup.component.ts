import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPopupComponent {
  @Input()
  capital!: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      data: {capital: this.capital},
      panelClass: 'dialog-right-side',
      position: { top: '40px', right: '24px' }
    });
  }
}

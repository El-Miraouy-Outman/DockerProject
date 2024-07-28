import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-valid',
  templateUrl: './button-valid.component.html',
  styleUrl: './button-valid.component.scss'
})
export class ButtonValidComponent {
  @Input() title = 'Valider';
}

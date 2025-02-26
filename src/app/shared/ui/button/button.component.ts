import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  variant = input('primary');
  type = input('submit');
  iconName = input('');
  label = input.required();
  isLoading = input(false);
  isDisabled = input(false);
}

import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  variant = input('primary');
  type = input('button');
  iconName = input('');
  label = input.required();
  isLoading = input(false);
  isDisabled = input(false);

  clickFn = output<Event>();

  handleClick(event: Event) {
    this.clickFn.emit(event);
  }
}

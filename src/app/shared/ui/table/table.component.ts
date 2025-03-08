import { Component, inject, input, output } from '@angular/core';
import { ColDef, TableActionEvent } from '@app/shared/ui/table/table';
import { ClipboardService } from '@app/shared/data-access/clipboard.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    CurrencyPipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  private clipboardService = inject(ClipboardService);

  data = input.required<Record<string, any>[]>();
  columnDefs = input.required<ColDef[]>();

  cellClickEvent = output<TableActionEvent>();

  getSuppressedValue(value: string) {
    if (value.length > 8) {
      return value.substring(0, 8);
    }

    return value;
  }

  copyValue(value: string, colDef: ColDef) {
    if (colDef.suppressConfig?.copy) {
      this.clipboardService.copy(value);
    }
  }

  handleClick(eventName: string, item: Record<string, any>): void {
    this.cellClickEvent.emit({ eventName, item });
  }
}

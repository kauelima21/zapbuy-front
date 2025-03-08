import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  copy(value: string): void {
    navigator.clipboard.writeText(value)
      .then(() => console.log("Texto copiado com sucesso!"))
      .catch(err => console.error("Erro ao copiar: ", err));
  }
}

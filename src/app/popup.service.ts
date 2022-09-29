import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  makeCapitalPopup(data: any): string {
    return `` +
      `<h3>RUBIX</h3>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>`
  }
}

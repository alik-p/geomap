import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { take } from 'rxjs';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/europe-capitals.geo.json';

  constructor(
    private httpClient: HttpClient,
    private popupService: PopupService,
  ) { }

  makeCapitalMarkers(map: L.Map): void {
    this.httpClient.get(this.capitals)
      .pipe(take(1))
      .subscribe((res: any) => {
        for (const c of res.features) {
          const lon = c.geometry.coordinates[0];
          const lat = c.geometry.coordinates[1];
          const marker = L.marker([lat, lon]);
          marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));
          marker.addTo(map);
        }
      });
  }
}

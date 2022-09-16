import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeoJsonObject } from 'geojson';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(private httpClient: HttpClient) { }

  getStateShapes(): Observable<GeoJsonObject> {
    // Europe:
    return this.httpClient.get('/assets/data/europe.medium.geo.json').pipe(
      map(res => res as GeoJsonObject)
    );
  }
}

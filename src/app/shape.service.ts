import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection } from 'geojson';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(private httpClient: HttpClient) { }

  getCountryShapes(): Observable<FeatureCollection> {
    // Europe:
    return this.httpClient.get('assets/data/europe.medium.geo.json').pipe(
      map(res => res as FeatureCollection)
    );
  }
}

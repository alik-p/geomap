import { AfterViewInit, Component, Renderer2, ViewContainerRef } from '@angular/core';
import { GeoJsonObject } from 'geojson';
import * as L from 'leaflet';
import { circle, latLng, LeafletMouseEvent, marker, polygon, tileLayer } from 'leaflet';
import { CustomPopupComponent } from './custom-popup/custom-popup.component';
import { MarkerService } from './marker.service';
import { ShapeService } from './shape.service';

const iconRetinaUrl = 'assets/img/map-pin.png';
const iconUrl = 'assets/img/map-pin.svg';
const shadowUrl = ''; // 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  // shadowUrl: '',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    zoomSnap: 0.5,
    zoom: 4.5,
    minZoom: 4.5,
    maxZoom: 4.5,
    maxBounds: L.latLngBounds([70, -10], [30, 30]),
    center: latLng(54, 27),
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    // preferCanvas: true,
  };

  layers = [
    circle([46.95, -122], { radius: 5000 }),
    polygon([[46.8, -121.85], [46.92, -121.92], [46.87, -121.8]]),
    marker([46.879966, -121.726909])
  ];

  #map!: L.Map;

  #selectedLayer: any | null = null;

  #states!: GeoJsonObject;

  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngAfterViewInit(): void {
    this.markerService.makeCapitalMarkers(this.#map, this.makeCapitalPopup());
    this.shapeService.getStateShapes().subscribe(states => {
      this.#states = states;
      this.initCountriesLayer();
    });
  }

  onMapReady(map: L.Map): void {
    this.#map = map;
  }

  private initCountriesLayer() {
    const stateLayer = L.geoJSON(this.#states, {
      style: (feature) => ({
        weight: 1,
        opacity: 0.5,
        color: '#051E50',
        fillOpacity: 0.5,
        fillColor: '#78849E',
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          click: (e) => (this.selectFeature(e)),
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });
    this.#map.addLayer(stateLayer);
  }

  private highlightFeature(e: LeafletMouseEvent) {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      opacity: 1.0,
      color: '#4A90E2',
      fillOpacity: 0.8,
      // fillColor: '#051E50'
    });
  }

  private makeCapitalPopup(): HTMLDivElement {
    const popupElement: HTMLDivElement = this.renderer.createElement('div');
    const componentRef = this.viewContainerRef.createComponent(CustomPopupComponent);
    popupElement.appendChild(componentRef.location.nativeElement);
    return popupElement;
  }

  private resetFeature(e: LeafletMouseEvent) {
    const layer = e.target;
    // TODO improve:
    if (layer === this.#selectedLayer) {
      return;
    }
    layer.setStyle({
      weight: 1,
      opacity: 0.5,
      color: '#051E50',
      fillOpacity: 0.5,
      fillColor: '#78849E',
    });
  }

  private selectFeature(e: LeafletMouseEvent) {
    const layer = e.target;
    this.#selectedLayer = layer;
    layer.setStyle({
      weight: 5,
      opacity: 1.0,
      color: '#4A90E2',
      fillOpacity: 1.0,
      fillColor: '#051E50',
    });
  }
}

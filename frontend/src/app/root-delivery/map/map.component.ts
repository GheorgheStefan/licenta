import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {icon, latLng, MapOptions, marker, tileLayer} from "leaflet";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  map: any;
  options!: MapOptions;
  @Input({transform: numberAttribute})latitude: number = 0;
  @Input({transform: numberAttribute})longitude: number = 0;

  constructor() {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data © OpenStreetMap contributors'
        })
      ],
      zoom: 12,
      center: latLng(this.latitude, this.longitude)
    };
  }

  onMapReady(map: any) {
    this.map = map;
    const customIcon = icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    const customMarker = marker([this.latitude, this.longitude], { icon: customIcon });
    customMarker.addTo(this.map);
  }

}

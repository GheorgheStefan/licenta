package com.licenta.backend.service.utils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.licenta.backend.dto.MapPositionResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NominatimService {
    private final RestTemplate restTemplate;

    @Value("${nominatim.url}")
    private String nominatimUrl;
    //"https://nominatim.openstreetmap.org/search?street=Strada Sergent Dorobantu Constantin&city=Slatina&county=Olt&postalcode=230020&format=json"


    public MapPositionResponseDto geocodeAddress(String street, String city, String county, String postalcode) {
        StringBuilder urlBuilder = new StringBuilder(nominatimUrl);
        urlBuilder.append("/search?");
        if (street != null) urlBuilder.append("&street=").append(street);
        if (city != null) urlBuilder.append("&city=").append(city);
        if (county != null) urlBuilder.append("&county=").append(county);
        if (postalcode != null) urlBuilder.append("&postalcode=").append(postalcode);
        urlBuilder.append("&format=json");
        ResponseEntity<String> response = restTemplate.getForEntity(urlBuilder.toString(), String.class);

        Gson gson = new Gson();
        JsonObject[] jsonArray = gson.fromJson(response.getBody(), JsonObject[].class);
        MapPositionResponseDto mapPositionResponseDto = new MapPositionResponseDto();
        if (jsonArray.length > 0) {
            JsonObject jsonObject = jsonArray[0];
            mapPositionResponseDto.setLatitude(jsonObject.get("lat").getAsString());
            mapPositionResponseDto.setLongitude(jsonObject.get("lon").getAsString());
            mapPositionResponseDto.setDisplayName(jsonObject.get("display_name").getAsString());
        }

        return mapPositionResponseDto;
    }

    //// Sortează lista de obiecte MapPositionResponseDto în funcție de distanța față de primul obiect folosi formula Haversine
    ///https://community.esri.com/t5/coordinate-reference-systems-blog/distance-on-a-sphere-the-haversine-formula/ba-p/902128

    public void sortByDistance(List<MapPositionResponseDto> list) {
        // Sortați lista bazată pe distanță față de primul obiect
        Collections.sort(list, (o1, o2) -> {
            double distance1 = calculateDistance(list.get(0), o1);
            double distance2 = calculateDistance(list.get(0), o2);
            return Double.compare(distance1, distance2);
        });

        // În continuare, sortați lista bazată pe distanța față de fiecare obiect în listă
        for (int i = 1; i < list.size(); i++) {
            final int index = i; // Variabila finală index
            Collections.sort(list.subList(i, list.size()), (o1, o2) -> {
                double distance1 = calculateDistance(list.get(index - 1), o1);
                double distance2 = calculateDistance(list.get(index - 1), o2);
                return Double.compare(distance1, distance2);
            });
        }
    }

    private double calculateDistance(MapPositionResponseDto p1, MapPositionResponseDto p2) {
        double lat1 = Double.parseDouble(p1.getLatitude());
        double lon1 = Double.parseDouble(p1.getLongitude());
        double lat2 = Double.parseDouble(p2.getLatitude());
        double lon2 = Double.parseDouble(p2.getLongitude());

        // Raza Pământului în kilometri
        final int R = 6371;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c;

        return distance;
    }
    //// Sortează lista de obiecte MapPositionResponseDto în funcție de distanța față de primul obiect folosi formula Haversine
}
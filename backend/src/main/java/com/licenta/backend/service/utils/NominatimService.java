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

@Slf4j
@Service
@RequiredArgsConstructor
public class NominatimService {
    private final RestTemplate restTemplate;

    @Value("${nominatim.url}")
    private String nominatimUrl;


    public MapPositionResponseDto geocodeAddress(String street, String city, String county, String postalcode) {
        StringBuilder urlBuilder = new StringBuilder(nominatimUrl);
        urlBuilder.append("/search?");

        if (street != null) urlBuilder.append("&street=").append(street);
        if (city != null) urlBuilder.append("&city=").append(city);
        if (county != null) urlBuilder.append("&county=").append(county);
        if (postalcode != null) urlBuilder.append("&postalcode=").append(postalcode);

        // Append format=json
        urlBuilder.append("&format=json");
        //"https://nominatim.openstreetmap.org/search?street=Strada Sergent Dorobantu Constantin&city=Slatina&county=Olt&postalcode=230020&format=json"

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
}
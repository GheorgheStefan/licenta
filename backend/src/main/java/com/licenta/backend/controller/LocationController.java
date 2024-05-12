package com.licenta.backend.controller;

import com.licenta.backend.dto.MapPositionResponseDto;
import com.licenta.backend.service.utils.NominatimService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequestMapping("/location")
    @RequiredArgsConstructor
    public class LocationController {

        private final NominatimService nominatimService;


        @GetMapping("/geocode")
        public MapPositionResponseDto geocode(@RequestParam(value = "street", required = false) String street,
                                                @RequestParam(value = "city", required = false) String city,
                                                @RequestParam(value = "county", required = false) String county,
                                                @RequestParam(value = "postalcode", required = false) String postalcode) {
            return nominatimService.geocodeAddress(street, city, county, postalcode);
        }

        }

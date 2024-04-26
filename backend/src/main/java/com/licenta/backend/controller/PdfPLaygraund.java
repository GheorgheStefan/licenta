package com.licenta.backend.controller;

import com.licenta.backend.service.utils.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pdf")
@RequiredArgsConstructor

public class PdfPLaygraund {

    private final PdfService pdfService;
    @GetMapping("/activation")
    public void activationAccountPdf() {
        System.out.println("PDF created successfully");
        byte[] pdfBytes = pdfService.createEmptyPdf();
        pdfService.savePdfLocallyOnDesktop(pdfBytes, "pula.pdf");
        //http://localhost:8080/pdf/activation
    }


}

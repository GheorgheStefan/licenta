package com.licenta.backend.service.utils;

import com.licenta.backend.entity.Order;
import com.licenta.backend.entity.OrderProduct;
import com.licenta.backend.entity.Product;
import com.licenta.backend.repository.OrderProductRepository;
import com.licenta.backend.repository.OrderRepository;
import com.licenta.backend.service.OrderProductService;
import com.licenta.backend.service.OrderService;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PdfService {

    private final OrderProductService orderProductService;
    private final OrderRepository orderRepository;

    public byte[] createInvoicePdf(Long orderId) { // 8 produse maxim
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        List<OrderProduct> orderProducts = orderProductService.getAllOrderProductsByOrderId(orderId);
        try (PDDocument document = new PDDocument(); ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            //Font, marime, si tot asa
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd");
            LocalDate orderDate = order.getOrderDate();

            //document, page
            PDPage page = new PDPage();
            document.addPage(page);

            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            //coordonate foaie
            float yCordinate = page.getCropBox().getUpperRightY() - 30;
            float startX = page.getCropBox().getLowerLeftX() + 30 + 30;
            float endX = page.getCropBox().getUpperRightX();

            /// Scriem Logo (numele firmei(putem baga si o photo da mai vedem daca mai bagam daca e))
            PDFont font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            float fontSize = 20;
            contentStream.setFont(font, fontSize);

            contentStream.beginText();
            contentStream.newLineAtOffset(startX, yCordinate);
            contentStream.showText("Logo");
            contentStream.endText();
            yCordinate -= 30;  //spatiu pe vertical

            // Scriem Shipping si Billing address (da doar titlurile)
            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            fontSize = 12;
            contentStream.setFont(font, fontSize);

            contentStream.beginText();
            contentStream.newLineAtOffset(startX, yCordinate);
            contentStream.showText("Customer Billing Address");
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 276, yCordinate);
            contentStream.showText("Customer Shipping Address");
            contentStream.endText();

            yCordinate -= 12; //lasam spatiu

            //scriem datele de shipping si billing
            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            fontSize = 9;
            contentStream.setFont(font, fontSize);

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("Name: " + order.getUser().getFirstname() + " " + order.getUser().getLastname());
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4 + 276, yCordinate);
            contentStream.showText("Name: " + order.getUser().getFirstname() + " " + order.getUser().getLastname());
            contentStream.endText();

            yCordinate -= 10;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("Address: " + order.getBillingAddress());
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4 + 276, yCordinate);
            contentStream.showText("Address: " + order.getDeliveryAddress());
            contentStream.endText();

            yCordinate -= 10;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("Country and region: " + order.getBillingCountry() + ", " + order.getBillingRegion());
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4 + 276, yCordinate);
            contentStream.showText("Country and region: " + order.getDeliveryCountry() + ", " + order.getDeliveryRegion());
            contentStream.endText();

            yCordinate -= 10;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("City and postal: " + order.getBillingCity() + ", " + order.getBillingPostalCode());
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4 + 276, yCordinate);
            contentStream.showText("City and postal: " + order.getDeliveryCity() + ", " + order.getDeliveryPostalCode());
            contentStream.endText();

            yCordinate -= 10;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("Phone number: " + order.getBillingPhoneNumber());
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4 + 276, yCordinate);
            contentStream.showText("Phone number: " + order.getDeliveryPhoneNumber());
            contentStream.endText();

            yCordinate -= 30;

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            fontSize = 12;
            contentStream.setFont(font, fontSize);

            contentStream.beginText();
            contentStream.newLineAtOffset(startX, yCordinate);
            contentStream.showText("Dispatcher");
            contentStream.endText();

            yCordinate -= 12;

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            fontSize = 9;
            contentStream.setFont(font, fontSize);

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("Provider Address: Sg.Maj.Dorobantu Constantin");
            contentStream.endText();

            yCordinate -= 10;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("Provider City: Slatina Olt, Romania");
            contentStream.endText();

            yCordinate -= 10;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("Provider postal-code: 230020");
            contentStream.endText();

            yCordinate -= 10;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4, yCordinate);
            contentStream.showText("Provider contact: Email: stefan.gha9@gmail.com");
            contentStream.endText();

            yCordinate -= 10;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 4 + 70, yCordinate);
            contentStream.showText("Phone number: 0723 123 456");
            contentStream.endText();

            yCordinate -= 10;

            contentStream.moveTo(startX - 30, yCordinate);
            contentStream.lineTo(endX - 30, yCordinate);
            contentStream.stroke();

            yCordinate -= 20;

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            fontSize = 12;
            contentStream.setFont(font, fontSize);
            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 276, yCordinate + 75);
            contentStream.showText("Order Identification Number: ");
            contentStream.endText();

            //+ order.getId()
            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            fontSize = 9;
            contentStream.setFont(font, fontSize);
            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 276 + 4, yCordinate + 65);
            contentStream.showText("" + order.getId());
            contentStream.endText();

            yCordinate -= 5;

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            fontSize = 12;
            contentStream.setFont(font, fontSize);
            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 276, yCordinate + 55);
            contentStream.showText("Order Date: ");
            contentStream.endText();

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            fontSize = 9;
            contentStream.setFont(font, fontSize);
            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 276 + 4, yCordinate + 45);
            contentStream.showText("" + order.getOrderDate());
            contentStream.endText();

            //////////////////////////////////////

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD_OBLIQUE);
            fontSize = 14;
            contentStream.setFont(font, fontSize);
            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 190, yCordinate);
            contentStream.showText("Ordered Items");
            contentStream.endText();

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            fontSize = 10;
            contentStream.setFont(font, fontSize);

            yCordinate -= 20;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX - 20, yCordinate);
            contentStream.showText("Product Name");
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 120, yCordinate);
            contentStream.showText("Product Id");
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 120 + 200, yCordinate);
            contentStream.showText("Quantity");
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 120 + 200 + 110, yCordinate);
            contentStream.showText("Price per product");
            contentStream.endText();

            yCordinate -= 10;

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            fontSize = 9;
            contentStream.setFont(font, fontSize);

            for (OrderProduct orderProduct : orderProducts) {
                Product product = orderProduct.getProduct();

                contentStream.moveTo(startX - 30, yCordinate);
                contentStream.lineTo(endX - 30, yCordinate);
                contentStream.stroke();

                yCordinate -= 15;

                contentStream.beginText();
                contentStream.newLineAtOffset(startX - 17, yCordinate);
                contentStream.showText("Brand: " + product.getBrand());
                contentStream.endText();

                yCordinate -= 10;

                contentStream.beginText();
                contentStream.newLineAtOffset(startX - 17, yCordinate);
                contentStream.showText("" + product.getName());
                contentStream.endText();

                contentStream.beginText();
                contentStream.newLineAtOffset(startX - 17 + 157, yCordinate);
                contentStream.showText("" + orderProduct.getId());
                contentStream.endText();

                contentStream.beginText();
                contentStream.newLineAtOffset(startX - 17 + 157 + 197, yCordinate);
                contentStream.showText("" + orderProduct.getAmount());
                contentStream.endText();

                contentStream.beginText();
                contentStream.newLineAtOffset(startX - 17 + 157 + 197 + 110, yCordinate);
                contentStream.showText("" + product.getPrice() + " RON");
                contentStream.endText();

                yCordinate -= 10;

                contentStream.beginText();
                contentStream.newLineAtOffset(startX - 17, yCordinate);
                contentStream.showText("" + orderProduct.getSize());
                contentStream.endText();

                yCordinate -= 10;

            }

            contentStream.moveTo(startX - 30, yCordinate);
            contentStream.lineTo(endX - 30, yCordinate);
            contentStream.stroke();

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            fontSize = 10;
            contentStream.setFont(font, fontSize);

            yCordinate -= 20;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 337, yCordinate);
            contentStream.showText("Products price: ");
            contentStream.endText();

            yCordinate -= 30;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 337 , yCordinate);
            contentStream.showText("Products price: ");
            contentStream.endText();

            yCordinate -= 15;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 337 , yCordinate);
            contentStream.showText("--------------------------------------------------------");
            contentStream.endText();

            yCordinate -= 15;

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 337 , yCordinate);
            contentStream.showText("Total: ");
            contentStream.endText();

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            fontSize = 9;
            contentStream.setFont(font, fontSize);

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 447, yCordinate + 60);
            contentStream.showText("" + order.getProductsPrice() + " RON");
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 447, yCordinate + 30);
            contentStream.showText("" + order.getShippingPrice() + " RON");
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(startX + 447, yCordinate);
            contentStream.showText("" + (order.getShippingPrice() + order.getProductsPrice()) + " RON");
            contentStream.endText();

            font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            fontSize = 9;
            contentStream.setFont(font, fontSize);

            contentStream.beginText();
            contentStream.newLineAtOffset(20, 10);
            contentStream.showText("All rights reserved to the provider Logo 2024. Any unauthorized use of this document is strictly prohibited.");
            contentStream.endText();

            contentStream.close();

            document.save(byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error creating empty PDF", e);
        }
    }




    public void savePdfLocallyOnDesktop(byte[] pdfBytes, String fileName) {
        String desktopPath = System.getProperty("user.home") + "/Desktop/";
        String filePath = desktopPath + fileName;

        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(pdfBytes);
            System.out.println("PDF saved successfully to: " + filePath);
        } catch (IOException e) {
            throw new RuntimeException("Error saving PDF", e);
        }
    }


    public void sendMail(){
        Email from = new Email("stefan.gha9@gmail.com");
        String subject = "Sending with SendGrid is Fun";
        Email to = new Email("steveomigi@gmail.com");
        Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(System.getenv("API_KEY"));
        var a = System.getenv("API_KEY");
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

}

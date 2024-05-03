package com.licenta.backend.service.utils;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Attachments;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class EmailService {
    private String fromEmail = "stefan.gha9@gmail.com";
    private final QrService qrService;
    private final PdfService pdfService;


    public void sendVerifyEmail(String toEmail, String link) {
        Email from = new Email(fromEmail);

        final String welcomeTemplateId = "d-465ac8f0169b4ba8b90892ffbfa290cc";
        Email to = new Email(toEmail);

        Personalization personalization = new Personalization();
        personalization.addDynamicTemplateData("link", link);
        personalization.addDynamicTemplateData("qrCode", qrService.generateQRCode(link));

        personalization.addTo(to);

        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setTemplateId(welcomeTemplateId);
        mail.addPersonalization(personalization);
        send(mail);
    }

    public void sendInvoiceMail(String toEmail, Long orderId){

        Email from = new Email(fromEmail);

        final String welcomeTemplateId = "d-53b1e9be0d3a45888f480b75808e17b6";
        Email to = new Email(toEmail);

        byte[] pdfBytes = pdfService.createInvoicePdf(orderId);

        Attachments attachments = new Attachments();
        attachments.setContent(Base64.getEncoder().encodeToString(pdfBytes));
        attachments.setType("application/pdf");
        attachments.setFilename("Invoide no." + orderId + ".pdf");

        Personalization personalization = new Personalization();
        personalization.addTo(to);

        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setTemplateId(welcomeTemplateId);
        mail.addPersonalization(personalization);
        mail.addAttachments(attachments);
        send(mail);

    }


    public void sendResetPasswordEmail(String toEmail, String link, String firstName, String lastName) {
        Email from = new Email(fromEmail);

        final String welcomeTemplateId = "d-58fa552040ee4cc881c40246db9e84fb";
        Email to = new Email(toEmail);

        Personalization personalization = new Personalization();
        personalization.addDynamicTemplateData("link", link);
        personalization.addDynamicTemplateData("firstName", firstName);
        personalization.addDynamicTemplateData("lastName", lastName);

        personalization.addTo(to);

        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setTemplateId(welcomeTemplateId);
        mail.addPersonalization(personalization);
        send(mail);
    }

    private void send(Mail mail) {
        SendGrid sg = new SendGrid(System.getenv("API_KEY"));
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

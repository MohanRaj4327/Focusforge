package com.focusforge.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String resetUrl = "https://focusforge-chi-seven.vercel.app/reset-password?token=" + resetToken;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@focusforge.com");
        message.setTo(toEmail);
        message.setSubject("FocusForge - Password Reset Request");
        message.setText("Hello,\n\n" +
                "You requested to reset your password. Please click the link below to set a new password:\n\n" +
                resetUrl + "\n\n" +
                "This link will expire in 15 minutes.\n\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "Thanks,\nThe FocusForge Team");

        mailSender.send(message);
    }
}

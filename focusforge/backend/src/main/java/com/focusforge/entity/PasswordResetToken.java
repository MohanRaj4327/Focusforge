package com.focusforge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "expiry_date", nullable = false)
    private LocalDateTime expiryDate;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public PasswordResetToken() {}

    public PasswordResetToken(Long id, String token, User user, LocalDateTime expiryDate, LocalDateTime createdAt) {
        this.id = id;
        this.token = token;
        this.user = user;
        this.expiryDate = expiryDate;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static PasswordResetTokenBuilder builder() { return new PasswordResetTokenBuilder(); }

    public static class PasswordResetTokenBuilder {
        private Long id;
        private String token;
        private User user;
        private LocalDateTime expiryDate;
        private LocalDateTime createdAt;

        public PasswordResetTokenBuilder id(Long id) { this.id = id; return this; }
        public PasswordResetTokenBuilder token(String token) { this.token = token; return this; }
        public PasswordResetTokenBuilder user(User user) { this.user = user; return this; }
        public PasswordResetTokenBuilder expiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; return this; }
        public PasswordResetTokenBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public PasswordResetToken build() {
            return new PasswordResetToken(id, token, user, expiryDate, createdAt);
        }
    }
}

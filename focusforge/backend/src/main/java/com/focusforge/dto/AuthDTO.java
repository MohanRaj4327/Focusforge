package com.focusforge.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDTO {

    public static class LoginRequest {
        @NotBlank(message = "Username or Email is required")
        private String usernameOrEmail;

        @NotBlank(message = "Password is required")
        private String password;

        public LoginRequest() {}

        public LoginRequest(String usernameOrEmail, String password) {
            this.usernameOrEmail = usernameOrEmail;
            this.password = password;
        }

        public String getUsernameOrEmail() { return usernameOrEmail; }
        public void setUsernameOrEmail(String usernameOrEmail) { this.usernameOrEmail = usernameOrEmail; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        private String username;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        private String fullName;
        private String targetCompany;

        public RegisterRequest() {}

        public RegisterRequest(String username, String email, String password, String fullName, String targetCompany) {
            this.username = username;
            this.email = email;
            this.password = password;
            this.fullName = fullName;
            this.targetCompany = targetCompany;
        }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getTargetCompany() { return targetCompany; }
        public void setTargetCompany(String targetCompany) { this.targetCompany = targetCompany; }
    }

    public static class AuthResponse {
        private String token;
        private String tokenType = "Bearer";
        private UserDTO user;

        public AuthResponse() {}

        public AuthResponse(String token, String tokenType, UserDTO user) {
            this.token = token;
            this.tokenType = tokenType != null ? tokenType : "Bearer";
            this.user = user;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public String getTokenType() { return tokenType; }
        public void setTokenType(String tokenType) { this.tokenType = tokenType; }
        public UserDTO getUser() { return user; }
        public void setUser(UserDTO user) { this.user = user; }

        public static AuthResponseBuilder builder() { return new AuthResponseBuilder(); }

        public static class AuthResponseBuilder {
            private String token;
            private String tokenType = "Bearer";
            private UserDTO user;

            public AuthResponseBuilder token(String token) { this.token = token; return this; }
            public AuthResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
            public AuthResponseBuilder user(UserDTO user) { this.user = user; return this; }

            public AuthResponse build() {
                return new AuthResponse(token, tokenType, user);
            }
        }
    }

    public static class UserDTO {
        private Long id;
        private String username;
        private String email;
        private String fullName;
        private String targetCompany;
        private int dailyFocusGoalMinutes;
        private int targetDsaPerDay;

        public UserDTO() {}

        public UserDTO(Long id, String username, String email, String fullName, String targetCompany, int dailyFocusGoalMinutes, int targetDsaPerDay) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.fullName = fullName;
            this.targetCompany = targetCompany;
            this.dailyFocusGoalMinutes = dailyFocusGoalMinutes;
            this.targetDsaPerDay = targetDsaPerDay;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getTargetCompany() { return targetCompany; }
        public void setTargetCompany(String targetCompany) { this.targetCompany = targetCompany; }
        public int getDailyFocusGoalMinutes() { return dailyFocusGoalMinutes; }
        public void setDailyFocusGoalMinutes(int dailyFocusGoalMinutes) { this.dailyFocusGoalMinutes = dailyFocusGoalMinutes; }
        public int getTargetDsaPerDay() { return targetDsaPerDay; }
        public void setTargetDsaPerDay(int targetDsaPerDay) { this.targetDsaPerDay = targetDsaPerDay; }

        public static UserDTOBuilder builder() { return new UserDTOBuilder(); }

        public static class UserDTOBuilder {
            private Long id;
            private String username;
            private String email;
            private String fullName;
            private String targetCompany;
            private int dailyFocusGoalMinutes;
            private int targetDsaPerDay;

            public UserDTOBuilder id(Long id) { this.id = id; return this; }
            public UserDTOBuilder username(String username) { this.username = username; return this; }
            public UserDTOBuilder email(String email) { this.email = email; return this; }
            public UserDTOBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public UserDTOBuilder targetCompany(String targetCompany) { this.targetCompany = targetCompany; return this; }
            public UserDTOBuilder dailyFocusGoalMinutes(int dailyFocusGoalMinutes) { this.dailyFocusGoalMinutes = dailyFocusGoalMinutes; return this; }
            public UserDTOBuilder targetDsaPerDay(int targetDsaPerDay) { this.targetDsaPerDay = targetDsaPerDay; return this; }

            public UserDTO build() {
                return new UserDTO(id, username, email, fullName, targetCompany, dailyFocusGoalMinutes, targetDsaPerDay);
            }
        }
    }
}

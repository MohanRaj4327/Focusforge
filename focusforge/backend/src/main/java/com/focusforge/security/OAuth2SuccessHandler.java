package com.focusforge.security;

import com.focusforge.entity.Profile;
import com.focusforge.entity.User;
import com.focusforge.repository.ProfileRepository;
import com.focusforge.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public OAuth2SuccessHandler(JwtTokenProvider tokenProvider, UserRepository userRepository, ProfileRepository profileRepository) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        
        if (email == null) {
            // Fallback for github if email is private
            email = oAuth2User.getAttribute("login") + "@github.com";
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Account Linking: Update provider if they previously used LOCAL
            if ("LOCAL".equals(user.getAuthProvider())) {
                user.setAuthProvider("OAUTH2");
                userRepository.save(user);
            }
        } else {
            // Register new user
            user = User.builder()
                    .username(email.split("@")[0])
                    .email(email)
                    .authProvider("OAUTH2")
                    .role("ROLE_USER")
                    .build();
            user = userRepository.save(user);

            Profile profile = Profile.builder()
                    .user(user)
                    .fullName(name != null ? name : user.getUsername())
                    .targetCompany("Zoho")
                    .dailyFocusGoalMinutes(240)
                    .targetDsaPerDay(3)
                    .build();
            profileRepository.save(profile);
        }

        UserPrincipal userPrincipal = UserPrincipal.create(user);
        String token = tokenProvider.generateTokenFromPrincipal(userPrincipal);
        
        // Redirect back to frontend with the token in URL
        String targetUrl = "https://focusforge-chi-seven.vercel.app/oauth2/redirect?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}

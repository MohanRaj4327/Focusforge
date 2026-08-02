package com.focusforge.service;

import com.focusforge.dto.AuthDTO;
import com.focusforge.entity.Profile;
import com.focusforge.entity.User;
import com.focusforge.exception.BadRequestException;
import com.focusforge.repository.ProfileRepository;
import com.focusforge.repository.UserRepository;
import com.focusforge.security.JwtTokenProvider;
import com.focusforge.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository, ProfileRepository profileRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthDTO.AuthResponse registerUser(AuthDTO.RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new BadRequestException("Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email is already registered!");
        }

        User user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        Profile profile = Profile.builder()
                .user(user)
                .fullName(registerRequest.getFullName() != null ? registerRequest.getFullName() : registerRequest.getUsername())
                .targetCompany(registerRequest.getTargetCompany() != null ? registerRequest.getTargetCompany() : "Zoho")
                .dailyFocusGoalMinutes(240)
                .targetDsaPerDay(3)
                .build();

        profileRepository.save(profile);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(registerRequest.getUsername(), registerRequest.getPassword())
        );

        String jwt = tokenProvider.generateToken(authentication);

        return AuthDTO.AuthResponse.builder()
                .token(jwt)
                .user(mapToUserDTO(user, profile))
                .build();
    }

    public AuthDTO.AuthResponse loginUser(AuthDTO.LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        String jwt = tokenProvider.generateToken(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));
        Profile profile = profileRepository.findByUserId(user.getId()).orElse(null);

        return AuthDTO.AuthResponse.builder()
                .token(jwt)
                .user(mapToUserDTO(user, profile))
                .build();
    }

    public AuthDTO.UserDTO getCurrentUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User not found"));
        Profile profile = profileRepository.findByUserId(userId).orElse(null);

        return mapToUserDTO(user, profile);
    }

    private AuthDTO.UserDTO mapToUserDTO(User user, Profile profile) {
        return AuthDTO.UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(profile != null ? profile.getFullName() : user.getUsername())
                .targetCompany(profile != null ? profile.getTargetCompany() : "Zoho")
                .dailyFocusGoalMinutes(profile != null ? profile.getDailyFocusGoalMinutes() : 240)
                .targetDsaPerDay(profile != null ? profile.getTargetDsaPerDay() : 3)
                .build();
    }
}

package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.UserRole;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static javax.persistence.EnumType.*;
import static javax.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "user_name", nullable = false)
    private String name;

    @Column(nullable = false)
    private String nickname;
    
    @Column(name = "user_image")
    private String image;

    @Column(name="user_description")
    private String description;

    @Enumerated(STRING)
    @Column(nullable = false)
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<UserRole> roles = new ArrayList<>();

    @Column(nullable = false)
    private Boolean profileOpen;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private LocalDate joinDate;

    @Column(nullable = false)
    private Boolean contactAgree;

    private LocalDate contactAgreeDate;

    @Enumerated(STRING)
    private AuthProvider authProvider;

    private String refreshToken;

    public void insertRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(UserRole::getValue)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

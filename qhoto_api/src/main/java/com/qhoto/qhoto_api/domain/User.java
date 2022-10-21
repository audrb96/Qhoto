package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.UserRole;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "user_name", nullable = false)
    private String name;

    @Column(nullable = false)
    private String nickname;

    @Column(name = "user_image")
    private String image;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(nullable = false)
    private Boolean profileOpen;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private LocalDate joinDate;

    @Column(nullable = false)
    private Boolean ContactAgree;

    @Column(nullable = false)
    private LocalDate ContactAgreeDate;

}

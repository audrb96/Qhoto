package com.qhoto.qhoto_api.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class QuestType {

    @Id
    @Column(name = "type_code")
    private String code;

    @Column(name = "type_name",nullable = false)
    private String name;

}

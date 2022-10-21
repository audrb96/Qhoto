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
    private String typeCode;

    @Column(nullable = false)
    private String typeName;

}

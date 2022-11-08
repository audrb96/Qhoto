package com.qhoto.qhoto_api.domain.type.converter;

import com.qhoto.qhoto_api.domain.type.CommentStatus;

public class CommentStatusConverter extends AbstractLegacyEnumAttributeConverter<CommentStatus>{
    private static final String ENUM_NAME = "댓글 상태";

    public CommentStatusConverter() {
        super(CommentStatus.class,false, ENUM_NAME);
    }
}

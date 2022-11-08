package com.qhoto.qhoto_api.domain.type.converter;

import com.qhoto.qhoto_api.domain.type.LegacyCommonType;
import com.qhoto.qhoto_api.util.LegacyEnumValueConvertUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.StringUtils;
import javax.persistence.AttributeConverter;

@Getter
@AllArgsConstructor
public class AbstractLegacyEnumAttributeConverter<E extends Enum<E> & LegacyCommonType> implements AttributeConverter<E,String> {

    private Class<E> targetEnumClass;
    private boolean nullable;
    private String enumName;


    @Override
    public String convertToDatabaseColumn(E attribute) {
        if(!nullable && attribute == null) {
            throw new IllegalArgumentException(String.format("%s(은)는 NULL로 저장할 수 없습니다.", enumName));
        }
        return LegacyEnumValueConvertUtils.toLegacyCode(attribute);
    }

    @Override
    public E convertToEntityAttribute(String dbData) {
        if(!nullable && !StringUtils.hasText(dbData)) {
            throw new IllegalArgumentException(String.format("%s(이)가 DB에 NULL 혹은 Empty로(%s) 저장되어 있습니다.", enumName, dbData));
        }
        return LegacyEnumValueConvertUtils.ofLegacyCode(targetEnumClass,dbData);
    }
}

package com.qhoto.qhoto_api.util;

import com.qhoto.qhoto_api.domain.type.LegacyCommonType;
import com.qhoto.qhoto_api.exception.LegacyEnumValueConvertException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.EnumSet;

import static org.springframework.util.StringUtils.hasText;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LegacyEnumValueConvertUtils {
    public static <T extends Enum<T> & LegacyCommonType> T ofLegacyCode(Class<T> enumClass, String legacyCode) {
        if(!StringUtils.hasText(legacyCode)) {
            return null;
        }

        return EnumSet.allOf(enumClass).stream()
                .filter(v-> v.getLegacyCode().equals(legacyCode))
                .findAny()
                .orElseThrow(() -> new LegacyEnumValueConvertException(String.format("enum =[%s], legacyCode=[%s]가 존재하지 않습니다.",enumClass.getName(), legacyCode)));
    }

    public static <T extends Enum<T> & LegacyCommonType> String toLegacyCode(T enumValue) {
        if(enumValue == null) {
            return "";
        }
        return enumValue.getLegacyCode();
    }
}

package com.qhoto.qhoto_api.util;

import com.qhoto.qhoto_api.domain.type.LegacyCommonType;
import com.qhoto.qhoto_api.exception.LegacyEnumValueConvertException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.EnumSet;

import static org.springframework.util.StringUtils.hasText;
//Enum Legacy code convert util
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LegacyEnumValueConvertUtils {

    /**
     * legacy code에 맞는 enum return
     * @param enumClass
     * @param legacyCode
     * @return {@link T}
     * @param enumClass,legacyCode
     */
    public static <T extends Enum<T> & LegacyCommonType> T ofLegacyCode(Class<T> enumClass, String legacyCode) {
        if(!StringUtils.hasText(legacyCode)) {
            return null;
        }

        return EnumSet.allOf(enumClass).stream()
                .filter(v-> v.getLegacyCode().equals(legacyCode))
                .findAny()
                .orElseThrow(() -> new LegacyEnumValueConvertException(String.format("enum =[%s], legacyCode=[%s]가 존재하지 않습니다.",enumClass.getName(), legacyCode)));
    }

    /**
     * enum에서 Legacy code를 return 하는 메소드
     * @param enumValue
     * @return {@link T}
     * @param <T>
     */
    public static <T extends Enum<T> & LegacyCommonType> String toLegacyCode(T enumValue) {
        if(enumValue == null) {
            return "";
        }
        return enumValue.getLegacyCode();
    }
}

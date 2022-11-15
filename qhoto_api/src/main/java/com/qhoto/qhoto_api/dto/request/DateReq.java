package com.qhoto.qhoto_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
public class DateReq {

    @Pattern(regexp = "\\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])",message = "날짜 형식이 다릅니다.")
    private final String date;
}



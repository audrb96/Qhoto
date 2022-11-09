package com.qhoto.qhoto_api.filter;

import com.qhoto.qhoto_api.dto.response.ErrorResponse;
import com.qhoto.qhoto_api.exception.InvalidAccessTokenException;
import com.qhoto.qhoto_api.exception.type.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//JWT 토큰 검증 실패 filter
@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request,response);
        } catch (InvalidAccessTokenException ex) {
            log.error("InvalidAccessTokenException filter");
            setErrorResponse(response,ErrorCode.INVALID_ACCESS_TOKEN);
        }

    }

    /**
     * ErrorResponse 설정 method
     * @param response
     * @param errorCode
     */
    public void setErrorResponse(HttpServletResponse response,ErrorCode errorCode){
        response.setStatus(errorCode.getStatus());
        response.setContentType("application/json");
        ErrorResponse errorResponse = new ErrorResponse(errorCode);
        try{
            String json = errorResponse.convertToJson();
            response.getWriter().write(json);
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}

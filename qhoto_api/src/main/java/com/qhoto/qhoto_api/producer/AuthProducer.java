package com.qhoto.qhoto_api.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthProducer {

    private final RabbitTemplate rabbitTemplate;

    public void reissueSendTo(String message) {
        MessageConverter messageConverter = rabbitTemplate.getMessageConverter();
        this.rabbitTemplate.convertAndSend("AUTH_REISSUE", message);
    }

}

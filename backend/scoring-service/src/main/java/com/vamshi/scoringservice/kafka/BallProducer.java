package com.vamshi.scoringservice.kafka;

import com.vamshi.scoringservice.dto.BallEvent;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Component
public class BallProducer {

    private final StreamBridge streamBridge;

    public BallProducer(StreamBridge streamBridge) {
        this.streamBridge = streamBridge;
    }

    public void publish(BallEvent event) {
        Message<BallEvent> message = MessageBuilder
                .withPayload(event)
                .setHeader("partitionKey", String.valueOf(event.getMatchId()))
                .build();

        // "ball-out" matches spring.cloud.stream.bindings.ball-out in application.yml
        streamBridge.send("ball-out", message);
    }
}

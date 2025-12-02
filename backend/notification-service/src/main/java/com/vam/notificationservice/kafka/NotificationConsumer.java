package com.vam.notificationservice.kafka;

import com.vam.notificationservice.dto.BallEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class NotificationConsumer {

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Bean
    public Consumer<BallEvent> ballIn() {
        return event -> {
            if (event == null || event.getMatchId() == null) return;

            String destination = "/topic/match/" + event.getMatchId();
            messagingTemplate.convertAndSend(destination, event);

            System.out.println("🔔 Live update sent → " + destination + " : Event=" + event.getEventId());
        };
    }
}

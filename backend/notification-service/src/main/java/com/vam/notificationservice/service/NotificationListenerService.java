package com.vam.notificationservice.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationListenerService {

    @KafkaListener(topics = "ball-scored", groupId = "notification-consumers")
    public void consume(String message) {
        System.out.println("📢 Notification Received: " + message);
        // 🔔 Send Email / WebSocket Notification / SMS etc.
    }
}

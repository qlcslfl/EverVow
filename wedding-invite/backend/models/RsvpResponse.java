package com.example.evervow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "rsvp_responses")
public class RsvpResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invitation_id", nullable = false)
    private Invitation invitation;

    @Column(name = "guest_name", nullable = false, length = 100)
    private String guestName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AttendanceType attendance;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(length = 20)
    private String contact;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Enum for attendance
    public enum AttendanceType {
        참석, 불참석
    }

    // Constructors
    public RsvpResponse() {}

    public RsvpResponse(Invitation invitation, String guestName, AttendanceType attendance, String message) {
        this.invitation = invitation;
        this.guestName = guestName;
        this.attendance = attendance;
        this.message = message;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Invitation getInvitation() { return invitation; }
    public void setInvitation(Invitation invitation) { this.invitation = invitation; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public AttendanceType getAttendance() { return attendance; }
    public void setAttendance(AttendanceType attendance) { this.attendance = attendance; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

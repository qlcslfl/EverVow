package com.example.evervow.dto;

import java.util.UUID;

public class RsvpCreateDto {

    private UUID invitationId;
    private String guestName;
    private String attendance; // "참석" 또는 "불참석"
    private String message;
    private String contact;

    // Constructors
    public RsvpCreateDto() {}

    // Getters and Setters
    public UUID getInvitationId() { return invitationId; }
    public void setInvitationId(UUID invitationId) { this.invitationId = invitationId; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getAttendance() { return attendance; }
    public void setAttendance(String attendance) { this.attendance = attendance; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
}

// RSVP 통계 DTO
class RsvpStatsDto {

    private long attendingCount;
    private long notAttendingCount;
    private long totalResponses;

    // Constructors
    public RsvpStatsDto() {}

    // Getters and Setters
    public long getAttendingCount() { return attendingCount; }
    public void setAttendingCount(long attendingCount) { this.attendingCount = attendingCount; }

    public long getNotAttendingCount() { return notAttendingCount; }
    public void setNotAttendingCount(long notAttendingCount) { this.notAttendingCount = notAttendingCount; }

    public long getTotalResponses() { return totalResponses; }
    public void setTotalResponses(long totalResponses) { this.totalResponses = totalResponses; }
}

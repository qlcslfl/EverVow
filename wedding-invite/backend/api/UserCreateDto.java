package com.example.evervow.dto;

public class UserCreateDto {

    private String name;
    private String email;
    private String phone;

    // Constructors
    public UserCreateDto() {}

    public UserCreateDto(String name, String email, String phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}

// RSVP 통계 DTO (별도 파일로 분리해야 함)
package com.example.evervow.dto;

public class RsvpStatsDto {

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

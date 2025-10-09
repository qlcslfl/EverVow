package com.example.evervow.dto;

import jakarta.validation.constraints.NotBlank;

public class InvitationDto {
    private Long id;

    @NotBlank(message = "게스트 이름은 필수입니다.")
    private String guestName;

    @NotBlank(message = "메시지는 필수입니다.")
    private String message;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}


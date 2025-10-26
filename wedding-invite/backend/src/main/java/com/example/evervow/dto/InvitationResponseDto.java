package com.example.evervow.dto;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public class InvitationResponseDto {
    private UUID id;
    private String groomKorName;
    private String groomEngName;
    private String brideKorName;
    private String brideEngName;
    private LocalDate weddingDate;
    private LocalTime weddingTime;
    private String venue;
    private String venueAddress;
    private String message;
    private String shareUrl;
    private String status;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private Long designId;
    private String designName;
    private Object designTheme;

    // getters/setters omitted for brevity; include as needed

    public void setId(UUID id) { this.id = id; }
    public void setGroomKorName(String n) { this.groomKorName = n; }
    public void setGroomEngName(String n) { this.groomEngName = n; }
    public void setBrideKorName(String n) { this.brideKorName = n; }
    public void setBrideEngName(String n) { this.brideEngName = n; }
    public void setWeddingDate(LocalDate d) { this.weddingDate = d; }
    public void setWeddingTime(LocalTime t) { this.weddingTime = t; }
    public void setVenue(String v) { this.venue = v; }
    public void setVenueAddress(String a) { this.venueAddress = a; }
    public void setMessage(String m) { this.message = m; }
    public void setShareUrl(String s) { this.shareUrl = s; }
    public void setStatus(String s) { this.status = s; }
    public void setViewCount(Integer c) { this.viewCount = c; }
    public void setCreatedAt(LocalDateTime t) { this.createdAt = t; }
    public void setDesignId(Long id) { this.designId = id; }
    public void setDesignName(String n) { this.designName = n; }
    public void setDesignTheme(Object t) { this.designTheme = t; }
}


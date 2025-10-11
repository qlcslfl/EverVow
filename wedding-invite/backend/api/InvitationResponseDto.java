package com.example.evervow.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

public class InvitationResponseDto {

    private UUID id;

    // 커플 정보
    private String groomKorName;
    private String groomEngName;
    private String brideKorName;
    private String brideEngName;

    // 예식 정보
    private LocalDate weddingDate;
    private LocalTime weddingTime;
    private String venue;
    private String venueAddress;

    // 인사말
    private String message;

    // 가족 정보
    private String groomFatherName;
    private String groomMotherName;
    private String brideFatherName;
    private String brideMotherName;

    // 디자인 정보
    private Long designId;
    private String designName;
    private Map<String, Object> designTheme;

    // 메타 정보
    private String shareUrl;
    private String status;
    private Integer viewCount;
    private LocalDateTime createdAt;

    // Constructors
    public InvitationResponseDto() {}

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getGroomKorName() { return groomKorName; }
    public void setGroomKorName(String groomKorName) { this.groomKorName = groomKorName; }

    public String getGroomEngName() { return groomEngName; }
    public void setGroomEngName(String groomEngName) { this.groomEngName = groomEngName; }

    public String getBrideKorName() { return brideKorName; }
    public void setBrideKorName(String brideKorName) { this.brideKorName = brideKorName; }

    public String getBrideEngName() { return brideEngName; }
    public void setBrideEngName(String brideEngName) { this.brideEngName = brideEngName; }

    public LocalDate getWeddingDate() { return weddingDate; }
    public void setWeddingDate(LocalDate weddingDate) { this.weddingDate = weddingDate; }

    public LocalTime getWeddingTime() { return weddingTime; }
    public void setWeddingTime(LocalTime weddingTime) { this.weddingTime = weddingTime; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }

    public String getVenueAddress() { return venueAddress; }
    public void setVenueAddress(String venueAddress) { this.venueAddress = venueAddress; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getGroomFatherName() { return groomFatherName; }
    public void setGroomFatherName(String groomFatherName) { this.groomFatherName = groomFatherName; }

    public String getGroomMotherName() { return groomMotherName; }
    public void setGroomMotherName(String groomMotherName) { this.groomMotherName = groomMotherName; }

    public String getBrideFatherName() { return brideFatherName; }
    public void setBrideFatherName(String brideFatherName) { this.brideFatherName = brideFatherName; }

    public String getBrideMotherName() { return brideMotherName; }
    public void setBrideMotherName(String brideMotherName) { this.brideMotherName = brideMotherName; }

    public Long getDesignId() { return designId; }
    public void setDesignId(Long designId) { this.designId = designId; }

    public String getDesignName() { return designName; }
    public void setDesignName(String designName) { this.designName = designName; }

    public Map<String, Object> getDesignTheme() { return designTheme; }
    public void setDesignTheme(Map<String, Object> designTheme) { this.designTheme = designTheme; }

    public String getShareUrl() { return shareUrl; }
    public void setShareUrl(String shareUrl) { this.shareUrl = shareUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getViewCount() { return viewCount; }
    public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

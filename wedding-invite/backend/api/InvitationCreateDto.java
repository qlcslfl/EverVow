package com.example.evervow.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class InvitationCreateDto {

    private UUID userId;
    private Long designId;

    // 커플 정보
    private String groomKorName;
    private String groomEngName;
    private String brideKorName;
    private String brideEngName;
    private String groomPhone;
    private String bridePhone;

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

    // 계좌 정보
    private Map<String, Object> accountInfo;

    // 갤러리
    private List<String> galleryImages;

    // Constructors
    public InvitationCreateDto() {}

    // Getters and Setters
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public Long getDesignId() { return designId; }
    public void setDesignId(Long designId) { this.designId = designId; }

    public String getGroomKorName() { return groomKorName; }
    public void setGroomKorName(String groomKorName) { this.groomKorName = groomKorName; }

    public String getGroomEngName() { return groomEngName; }
    public void setGroomEngName(String groomEngName) { this.groomEngName = groomEngName; }

    public String getBrideKorName() { return brideKorName; }
    public void setBrideKorName(String brideKorName) { this.brideKorName = brideKorName; }

    public String getBrideEngName() { return brideEngName; }
    public void setBrideEngName(String brideEngName) { this.brideEngName = brideEngName; }

    public String getGroomPhone() { return groomPhone; }
    public void setGroomPhone(String groomPhone) { this.groomPhone = groomPhone; }

    public String getBridePhone() { return bridePhone; }
    public void setBridePhone(String bridePhone) { this.bridePhone = bridePhone; }

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

    public Map<String, Object> getAccountInfo() { return accountInfo; }
    public void setAccountInfo(Map<String, Object> accountInfo) { this.accountInfo = accountInfo; }

    public List<String> getGalleryImages() { return galleryImages; }
    public void setGalleryImages(List<String> galleryImages) { this.galleryImages = galleryImages; }
}

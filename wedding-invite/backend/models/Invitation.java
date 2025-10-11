package com.example.evervow.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "invitations")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "design_id")
    private Design design;

    // 커플 정보
    @Column(name = "groom_kor_name", nullable = false, length = 50)
    private String groomKorName;

    @Column(name = "groom_eng_name", length = 100)
    private String groomEngName;

    @Column(name = "bride_kor_name", nullable = false, length = 50)
    private String brideKorName;

    @Column(name = "bride_eng_name", length = 100)
    private String brideEngName;

    @Column(name = "groom_phone", length = 20)
    private String groomPhone;

    @Column(name = "bride_phone", length = 20)
    private String bridePhone;

    // 예식 정보
    @Column(name = "wedding_date", nullable = false)
    private LocalDate weddingDate;

    @Column(name = "wedding_time", nullable = false)
    private LocalTime weddingTime;

    @Column(nullable = false, length = 200)
    private String venue;

    @Column(name = "venue_address", nullable = false, columnDefinition = "TEXT")
    private String venueAddress;

    // 인사말
    @Column(columnDefinition = "TEXT")
    private String message;

    // 가족 정보
    @Column(name = "groom_father_name", length = 50)
    private String groomFatherName;

    @Column(name = "groom_mother_name", length = 50)
    private String groomMotherName;

    @Column(name = "bride_father_name", length = 50)
    private String brideFatherName;

    @Column(name = "bride_mother_name", length = 50)
    private String brideMotherName;

    // 계좌 정보 (JSON)
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "account_info", columnDefinition = "jsonb")
    private Map<String, Object> accountInfo;

    // 갤러리 이미지들 (JSON)
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "gallery_images", columnDefinition = "jsonb")
    private List<String> galleryImages;

    // 상태 관리
    @Enumerated(EnumType.STRING)
    private InvitationStatus status = InvitationStatus.DRAFT;

    @Column(name = "is_public")
    private Boolean isPublic = true;

    @Column(name = "view_count")
    private Integer viewCount = 0;

    // 공유 링크
    @Column(name = "share_url", unique = true, length = 100)
    private String shareUrl;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Enum for status
    public enum InvitationStatus {
        DRAFT, PUBLISHED, ARCHIVED
    }

    // Constructors
    public Invitation() {}

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Design getDesign() { return design; }
    public void setDesign(Design design) { this.design = design; }

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

    public InvitationStatus getStatus() { return status; }
    public void setStatus(InvitationStatus status) { this.status = status; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public Integer getViewCount() { return viewCount; }
    public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }

    public String getShareUrl() { return shareUrl; }
    public void setShareUrl(String shareUrl) { this.shareUrl = shareUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

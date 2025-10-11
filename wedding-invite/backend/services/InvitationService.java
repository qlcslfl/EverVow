package com.example.evervow.service;

import com.example.evervow.entity.Invitation;
import com.example.evervow.entity.Design;
import com.example.evervow.entity.User;
import com.example.evervow.repository.InvitationRepository;
import com.example.evervow.repository.DesignRepository;
import com.example.evervow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.security.SecureRandom;

@Service
@Transactional
public class InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private DesignRepository designRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String SHARE_URL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int SHARE_URL_LENGTH = 8;

    // 청첩장 생성
    public Invitation createInvitation(Invitation invitation, Long designId, UUID userId) {
        // 사용자 확인
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // 디자인 확인
        Design design = designRepository.findById(designId)
            .orElseThrow(() -> new RuntimeException("Design not found"));

        invitation.setUser(user);
        invitation.setDesign(design);
        invitation.setShareUrl(generateShareUrl());
        invitation.setStatus(Invitation.InvitationStatus.DRAFT);

        return invitationRepository.save(invitation);
    }

    // 청첩장 수정
    public Invitation updateInvitation(UUID id, Invitation updatedInvitation) {
        Invitation existing = invitationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Invitation not found"));

        // 필드 업데이트
        existing.setGroomKorName(updatedInvitation.getGroomKorName());
        existing.setGroomEngName(updatedInvitation.getGroomEngName());
        existing.setBrideKorName(updatedInvitation.getBrideKorName());
        existing.setBrideEngName(updatedInvitation.getBrideEngName());
        existing.setWeddingDate(updatedInvitation.getWeddingDate());
        existing.setWeddingTime(updatedInvitation.getWeddingTime());
        existing.setVenue(updatedInvitation.getVenue());
        existing.setVenueAddress(updatedInvitation.getVenueAddress());
        existing.setMessage(updatedInvitation.getMessage());
        existing.setGroomFatherName(updatedInvitation.getGroomFatherName());
        existing.setGroomMotherName(updatedInvitation.getGroomMotherName());
        existing.setBrideFatherName(updatedInvitation.getBrideFatherName());
        existing.setBrideMotherName(updatedInvitation.getBrideMotherName());
        existing.setAccountInfo(updatedInvitation.getAccountInfo());

        return invitationRepository.save(existing);
    }

    // 청첩장 조회 (ID로)
    public Optional<Invitation> getInvitationById(UUID id) {
        return invitationRepository.findById(id);
    }

    // 청첩장 조회 (공유 URL로)
    public Optional<Invitation> getInvitationByShareUrl(String shareUrl) {
        Optional<Invitation> invitation = invitationRepository.findByShareUrl(shareUrl);
        // 조회수 증가
        invitation.ifPresent(inv -> {
            inv.setViewCount(inv.getViewCount() + 1);
            invitationRepository.save(inv);
        });
        return invitation;
    }

    // 사용자별 청첩장 목록
    public List<Invitation> getInvitationsByUser(UUID userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return invitationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    // 청첩장 발행
    public Invitation publishInvitation(UUID id) {
        Invitation invitation = invitationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Invitation not found"));

        invitation.setStatus(Invitation.InvitationStatus.PUBLISHED);
        return invitationRepository.save(invitation);
    }

    // 청첩장 삭제
    public void deleteInvitation(UUID id) {
        invitationRepository.deleteById(id);
    }

    // 공유 URL 생성
    private String generateShareUrl() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(SHARE_URL_LENGTH);

        for (int i = 0; i < SHARE_URL_LENGTH; i++) {
            sb.append(SHARE_URL_CHARS.charAt(random.nextInt(SHARE_URL_CHARS.length())));
        }

        // 중복 체크
        String shareUrl = sb.toString();
        if (invitationRepository.findByShareUrl(shareUrl).isPresent()) {
            return generateShareUrl(); // 재귀 호출로 중복 해결
        }

        return shareUrl;
    }
}

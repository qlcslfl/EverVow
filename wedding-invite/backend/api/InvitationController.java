package com.example.evervow.controller;

import com.example.evervow.entity.Invitation;
import com.example.evervow.service.InvitationService;
import com.example.evervow.dto.InvitationCreateDto;
import com.example.evervow.dto.InvitationResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/invitations")
@CrossOrigin(origins = {"http://localhost:3000", "https://evervow.vercel.app"})
public class InvitationController {

    @Autowired
    private InvitationService invitationService;

    // 청첩장 생성
    @PostMapping
    public ResponseEntity<InvitationResponseDto> createInvitation(@RequestBody InvitationCreateDto createDto) {
        try {
            Invitation invitation = convertToEntity(createDto);
            Invitation created = invitationService.createInvitation(invitation, createDto.getDesignId(), createDto.getUserId());
            return ResponseEntity.ok(convertToDto(created));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 청첩장 조회 (ID로)
    @GetMapping("/{id}")
    public ResponseEntity<InvitationResponseDto> getInvitation(@PathVariable UUID id) {
        return invitationService.getInvitationById(id)
            .map(invitation -> ResponseEntity.ok(convertToDto(invitation)))
            .orElse(ResponseEntity.notFound().build());
    }

    // 청첩장 조회 (공유 URL로)
    @GetMapping("/share/{shareUrl}")
    public ResponseEntity<InvitationResponseDto> getInvitationByShareUrl(@PathVariable String shareUrl) {
        return invitationService.getInvitationByShareUrl(shareUrl)
            .map(invitation -> ResponseEntity.ok(convertToDto(invitation)))
            .orElse(ResponseEntity.notFound().build());
    }

    // 청첩장 수정
    @PutMapping("/{id}")
    public ResponseEntity<InvitationResponseDto> updateInvitation(
            @PathVariable UUID id,
            @RequestBody InvitationCreateDto updateDto) {
        try {
            Invitation invitation = convertToEntity(updateDto);
            Invitation updated = invitationService.updateInvitation(id, invitation);
            return ResponseEntity.ok(convertToDto(updated));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 청첩장 발행
    @PostMapping("/{id}/publish")
    public ResponseEntity<InvitationResponseDto> publishInvitation(@PathVariable UUID id) {
        try {
            Invitation published = invitationService.publishInvitation(id);
            return ResponseEntity.ok(convertToDto(published));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 사용자별 청첩장 목록
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InvitationResponseDto>> getUserInvitations(@PathVariable UUID userId) {
        List<Invitation> invitations = invitationService.getInvitationsByUser(userId);
        List<InvitationResponseDto> dtos = invitations.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // 공개 청첩장 목록 (홈에서 사용)
    @GetMapping
    public ResponseEntity<List<InvitationResponseDto>> getPublicInvitations() {
        List<Invitation> invitations = invitationService.getPublicInvitations();
        List<InvitationResponseDto> dtos = invitations.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // 청첩장 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvitation(@PathVariable UUID id) {
        try {
            invitationService.deleteInvitation(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // Entity to DTO 변환
    private InvitationResponseDto convertToDto(Invitation invitation) {
        InvitationResponseDto dto = new InvitationResponseDto();
        dto.setId(invitation.getId());
        dto.setGroomKorName(invitation.getGroomKorName());
        dto.setGroomEngName(invitation.getGroomEngName());
        dto.setBrideKorName(invitation.getBrideKorName());
        dto.setBrideEngName(invitation.getBrideEngName());
        dto.setWeddingDate(invitation.getWeddingDate());
        dto.setWeddingTime(invitation.getWeddingTime());
        dto.setVenue(invitation.getVenue());
        dto.setVenueAddress(invitation.getVenueAddress());
        dto.setMessage(invitation.getMessage());
        dto.setShareUrl(invitation.getShareUrl());
        dto.setStatus(invitation.getStatus().toString());
        dto.setViewCount(invitation.getViewCount());
        dto.setCreatedAt(invitation.getCreatedAt());

        if (invitation.getDesign() != null) {
            dto.setDesignId(invitation.getDesign().getId());
            dto.setDesignName(invitation.getDesign().getName());
            dto.setDesignTheme(invitation.getDesign().getCssTheme());
        }

        return dto;
    }

    // DTO to Entity 변환
    private Invitation convertToEntity(InvitationCreateDto dto) {
        Invitation invitation = new Invitation();
        invitation.setGroomKorName(dto.getGroomKorName());
        invitation.setGroomEngName(dto.getGroomEngName());
        invitation.setBrideKorName(dto.getBrideKorName());
        invitation.setBrideEngName(dto.getBrideEngName());
        invitation.setGroomPhone(dto.getGroomPhone());
        invitation.setBridePhone(dto.getBridePhone());
        invitation.setWeddingDate(dto.getWeddingDate());
        invitation.setWeddingTime(dto.getWeddingTime());
        invitation.setVenue(dto.getVenue());
        invitation.setVenueAddress(dto.getVenueAddress());
        invitation.setMessage(dto.getMessage());
        invitation.setGroomFatherName(dto.getGroomFatherName());
        invitation.setGroomMotherName(dto.getGroomMotherName());
        invitation.setBrideFatherName(dto.getBrideFatherName());
        invitation.setBrideMotherName(dto.getBrideMotherName());
        invitation.setAccountInfo(dto.getAccountInfo());
        invitation.setGalleryImages(dto.getGalleryImages());
        return invitation;
    }
}

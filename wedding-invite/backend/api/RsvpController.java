package com.example.evervow.controller;

import com.example.evervow.entity.RsvpResponse;
import com.example.evervow.entity.Invitation;
import com.example.evervow.repository.RsvpResponseRepository;
import com.example.evervow.repository.InvitationRepository;
import com.example.evervow.dto.RsvpCreateDto;
import com.example.evervow.dto.RsvpStatsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/rsvp")
@CrossOrigin(origins = {"http://localhost:3000", "https://evervow.vercel.app"})
public class RsvpController {

    @Autowired
    private RsvpResponseRepository rsvpRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    // RSVP 응답 제출
    @PostMapping
    public ResponseEntity<RsvpResponse> submitRsvp(@RequestBody RsvpCreateDto rsvpDto) {
        try {
            Invitation invitation = invitationRepository.findById(rsvpDto.getInvitationId())
                .orElseThrow(() -> new RuntimeException("Invitation not found"));

            RsvpResponse rsvp = new RsvpResponse();
            rsvp.setInvitation(invitation);
            rsvp.setGuestName(rsvpDto.getGuestName());
            rsvp.setAttendance(RsvpResponse.AttendanceType.valueOf(rsvpDto.getAttendance()));
            rsvp.setMessage(rsvpDto.getMessage());
            rsvp.setContact(rsvpDto.getContact());

            RsvpResponse saved = rsvpRepository.save(rsvp);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 청첩장별 RSVP 응답 조회
    @GetMapping("/invitation/{invitationId}")
    public ResponseEntity<List<RsvpResponse>> getRsvpsByInvitation(@PathVariable UUID invitationId) {
        Invitation invitation = invitationRepository.findById(invitationId)
            .orElseThrow(() -> new RuntimeException("Invitation not found"));

        List<RsvpResponse> responses = rsvpRepository.findByInvitationOrderByCreatedAtDesc(invitation);
        return ResponseEntity.ok(responses);
    }

    // RSVP 통계 조회
    @GetMapping("/stats/{invitationId}")
    public ResponseEntity<RsvpStatsDto> getRsvpStats(@PathVariable UUID invitationId) {
        Invitation invitation = invitationRepository.findById(invitationId)
            .orElseThrow(() -> new RuntimeException("Invitation not found"));

        long attendingCount = rsvpRepository.countAttendingByInvitation(invitation);
        long notAttendingCount = rsvpRepository.countNotAttendingByInvitation(invitation);
        long totalResponses = attendingCount + notAttendingCount;

        RsvpStatsDto stats = new RsvpStatsDto();
        stats.setAttendingCount(attendingCount);
        stats.setNotAttendingCount(notAttendingCount);
        stats.setTotalResponses(totalResponses);

        return ResponseEntity.ok(stats);
    }
}

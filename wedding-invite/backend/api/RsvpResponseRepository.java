package com.example.evervow.repository;

import com.example.evervow.entity.RsvpResponse;
import com.example.evervow.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RsvpResponseRepository extends JpaRepository<RsvpResponse, UUID> {
    List<RsvpResponse> findByInvitation(Invitation invitation);
    List<RsvpResponse> findByInvitationOrderByCreatedAtDesc(Invitation invitation);

    @Query("SELECT COUNT(r) FROM RsvpResponse r WHERE r.invitation = ?1 AND r.attendance = '참석'")
    long countAttendingByInvitation(Invitation invitation);

    @Query("SELECT COUNT(r) FROM RsvpResponse r WHERE r.invitation = ?1 AND r.attendance = '불참석'")
    long countNotAttendingByInvitation(Invitation invitation);
}

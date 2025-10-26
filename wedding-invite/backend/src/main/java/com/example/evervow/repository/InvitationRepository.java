package com.example.evervow.repository;

import com.example.evervow.entity.Invitation;
import com.example.evervow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
    List<Invitation> findByUser(User user);
    List<Invitation> findByUserOrderByCreatedAtDesc(User user);
    Optional<Invitation> findByShareUrl(String shareUrl);

    @Query("SELECT i FROM Invitation i WHERE i.isPublic = true AND i.status = 'PUBLISHED'")
    List<Invitation> findPublicInvitations();

    long countByUser(User user);
}


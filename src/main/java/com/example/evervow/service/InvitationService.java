package com.example.evervow.service;

import com.example.evervow.dto.InvitationDto;
import com.example.evervow.entity.Invitation;
import com.example.evervow.repository.InvitationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class InvitationService {
    private final InvitationRepository invitationRepository;

    public InvitationService(InvitationRepository invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    @Transactional
    public InvitationDto create(InvitationDto dto) {
        Invitation invitation = new Invitation();
        invitation.setGuestName(dto.getGuestName());
        invitation.setMessage(dto.getMessage());
        Invitation saved = invitationRepository.save(invitation);
        dto.setId(saved.getId());
        return dto;
    }

    @Transactional(readOnly = true)
    public Optional<InvitationDto> get(Long id) {
        return invitationRepository.findById(id)
                .map(inv -> {
                    InvitationDto dto = new InvitationDto();
                    dto.setId(inv.getId());
                    dto.setGuestName(inv.getGuestName());
                    dto.setMessage(inv.getMessage());
                    return dto;
                });
    }

    @Transactional
    public Optional<InvitationDto> update(Long id, InvitationDto dto) {
        return invitationRepository.findById(id).map(inv -> {
            inv.setGuestName(dto.getGuestName());
            inv.setMessage(dto.getMessage());
            Invitation saved = invitationRepository.save(inv);
            dto.setId(saved.getId());
            return dto;
        });
    }

    @Transactional
    public boolean delete(Long id) {
        if (invitationRepository.existsById(id)) {
            invitationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}


package ru.myprojects.pcstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.Case;
import ru.myprojects.pcstore.repository.CaseRepository;
import ru.myprojects.pcstore.service.CaseService;

import java.util.List;

@Service
@AllArgsConstructor
public class CaseServiceImpl implements CaseService {

    private CaseRepository caseRepository;
    @Override
    public Case createCase(Case ecase) {
        return caseRepository.save(ecase);
    }

    @Override
    public Case getCaseById(Long caseId) {
        return caseRepository.findById(caseId).orElseThrow(() -> new RuntimeException("Не найдет такой корпус"));
    }

    @Override
    public List<Case> getAllCase() {
        return caseRepository.findAll();
    }

    @Override
    public Case updateCase(Long caseId, Case updatedCase) {
        Case ecase = caseRepository.findById(caseId).orElseThrow(() -> new RuntimeException("Не найдет такой корпус"));
        ecase.setModel(updatedCase.getModel());
        ecase.setManufacturer(updatedCase.getManufacturer());
        ecase.setPrice(updatedCase.getPrice());
        Case updateCaseObj = caseRepository.save(ecase);
        return updateCaseObj;
    }

    @Override
    public void deleteCaseById(Long caseId) {
        caseRepository.deleteById(caseId);
    }
}

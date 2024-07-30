package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.Case;

import java.util.List;

public interface CaseService {
    Case createCase(Case ecase);
    Case getCaseById(Long caseId);
    List<Case> getAllCase();
    Case updateCase(Long caseId, Case updatedCase);

    void deleteCaseById(Long caseId);
}

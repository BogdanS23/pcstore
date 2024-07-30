package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.Processor;

import java.util.List;

public interface ProcessorService {
    Processor createProcessor(Processor processor);
    Processor getProcessorById(Long processorId);
    List<Processor> getAllProcessors();
    Processor updateProcessor(Long processorId, Processor updatedProcessor);
    void deleteProcessorById(Long processorId);
    Processor findProcessorById(Long id);
}

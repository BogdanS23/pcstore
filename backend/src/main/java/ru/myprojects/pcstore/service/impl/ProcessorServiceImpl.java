package ru.myprojects.pcstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.Processor;
import ru.myprojects.pcstore.repository.ProcessorRepository;
import ru.myprojects.pcstore.service.ProcessorService;

import java.util.List;

@Service
@AllArgsConstructor
public class ProcessorServiceImpl implements ProcessorService {
    private ProcessorRepository processorRepository;

    @Override
    public Processor createProcessor(Processor processor) {
        return processorRepository.save(processor);
    }

    public Processor findProcessorById(Long id) {
        return processorRepository.findById(id).orElse(null);
    }

    @Override
    public Processor getProcessorById(Long processorId) {
        return processorRepository.findById(processorId).orElseThrow(() -> new RuntimeException("Не найдет такой процессор"));
    }

    @Override
    public List<Processor> getAllProcessors() {
        return processorRepository.findAll();
    }

    @Override
    public Processor updateProcessor(Long processorId, Processor updatedProcessor) {
        Processor processor = processorRepository.findById(processorId).orElseThrow(() -> new RuntimeException("Не найдет такой процессор"));
        processor.setManufacturer(updatedProcessor.getManufacturer());
        processor.setModel(updatedProcessor.getModel());
        processor.setSocket(updatedProcessor.getSocket());
        processor.setNumber_of_cores(updatedProcessor.getNumber_of_cores());
        processor.setNumber_of_threads(updatedProcessor.getNumber_of_threads());
        processor.setFrequency(updatedProcessor.getFrequency());
        processor.setRam_type(updatedProcessor.getRam_type());
        processor.setTdp(updatedProcessor.getTdp());
        processor.setPrice(updatedProcessor.getPrice());
        Processor updateProcessorObj = processorRepository.save(processor);
        return updateProcessorObj;
    }

    @Override
    public void deleteProcessorById(Long processorId) {
        processorRepository.deleteById(processorId);
    }
}

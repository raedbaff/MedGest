package com.securityModel.repository;

import com.securityModel.models.MedicalFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalFileRepository extends JpaRepository<MedicalFile,Long> {
    public MedicalFile findMedicalFileByPatientId(Long id);
    public List<MedicalFile>findAllByPatientId(Long id);

}

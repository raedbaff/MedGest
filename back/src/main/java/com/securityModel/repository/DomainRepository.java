package com.securityModel.repository;

import com.securityModel.models.DomainMedical;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainRepository extends JpaRepository<DomainMedical,Long> {


}

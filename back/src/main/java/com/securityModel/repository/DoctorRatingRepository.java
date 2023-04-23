package com.securityModel.repository;

import com.securityModel.models.DoctorRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRatingRepository extends JpaRepository<DoctorRating,Long> {
    public List<DoctorRating>findDoctorRatingsByDoctorId(Long id);
}

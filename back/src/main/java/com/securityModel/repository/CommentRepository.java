package com.securityModel.repository;

import com.securityModel.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    public List<Comment>findCommentsByPostId(Long id);
    public void deleteAllByPost_Id(long id);
}

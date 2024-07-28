package com.elmiraouy.jwtsecurity.repository;

import com.elmiraouy.jwtsecurity.entities.Comment;
import com.elmiraouy.jwtsecurity.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

    @Query("""
           SELECT  c from Comment c where c.ticket=:ticket
""")
    List<Comment> findCommentByTicket(Ticket ticket);

}

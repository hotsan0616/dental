package com.SEHS4701.group;

import com.SEHS4701.group.dto.BlogByIdResponse;
import com.SEHS4701.group.service.BlogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BlogTest {

    @Mock
    private BlogService blogService;

    private BlogByIdResponse response;

    @BeforeEach
    void setUp() {
        // Create Blog
        BlogByIdResponse.Blog blog = new BlogByIdResponse.Blog();
        blog.setId(1);
        blog.setTitle("Dental Examination: First Step to a Healthy Smile");
        blog.setSlug("dental-examination-first-step-to-healthy-smile");
        blog.setSnippet("Learn about the importance of regular dental check-ups and what to expect during your visit.");
        blog.setContent("Regular dental examinations are crucial for maintaining optimal oral health. During your visit, our experienced dentists will thoroughly assess your oral health, identify potential issues early, and create a personalized treatment plan to ensure your smile stays healthy and bright.");
        blog.setPost_date("2024-07-19");
        blog.setImage("/images/heroDoctors.png");

        // Create Response
        response = new BlogByIdResponse(0, "success", blog);
    }

    @Test
    void testGetBlogById() {
        // Arrange
        when(blogService.getById(1)).thenReturn(response);

        // Act
        BlogByIdResponse result = blogService.getById(1);

        // Assert
        assertNotNull(result);
        assertEquals(0, result.getCode());
        assertEquals("success", result.getMessage());
        assertNotNull(result.getBlog());

        BlogByIdResponse.Blog blog = result.getBlog();
        assertEquals(1, blog.getId());
        assertEquals("Dental Examination: First Step to a Healthy Smile", blog.getTitle());
        assertEquals("dental-examination-first-step-to-healthy-smile", blog.getSlug());
        assertEquals("Learn about the importance of regular dental check-ups and what to expect during your visit.", blog.getSnippet());
        assertEquals("Regular dental examinations are crucial for maintaining optimal oral health. During your visit, our experienced dentists will thoroughly assess your oral health, identify potential issues early, and create a personalized treatment plan to ensure your smile stays healthy and bright.", blog.getContent());
        assertEquals("2024-07-19", blog.getPost_date());
        assertEquals("/images/heroDoctors.png", blog.getImage());

        // Verify service call
        verify(blogService, times(1)).getById(1);
    }
}
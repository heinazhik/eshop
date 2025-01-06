'use client';

import React, { useState, useEffect } from 'react';

interface BlogPost {
  post_id: number;
  title: string;
  content: string;
  published_at: string;
  category_name: string;
}

interface Comment {
  comment_id: number;
  author_name: string;
  content: string;
  commented_at: string;
}

const BlogPostPage: React.FC<{ params: { slug: string } }> = ({ params }): JSX.Element => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { slug } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/posts/${slug}`);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json() as BlogPost;
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/blog/posts/${slug}/comments`);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json() as Comment[];
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [slug]);

  const handleSubmitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    const authorName = (document.getElementById('authorName') as HTMLInputElement)?.value;
    const commentContent = (document.getElementById('commentContent') as HTMLTextAreaElement)?.value;

    if (authorName && commentContent) {
      try {
        const response = await fetch(`/api/blog/${slug}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authorName, commentContent }),
        });

        if (response.ok) {
          // Refresh comments
          const res = await fetch(`/api/blog/${slug}/comments`);
          const data = await res.json() as Comment[];
          setComments(data);
          // Clear form
          const authorNameEl = document.getElementById('authorName') as HTMLInputElement;
          const commentContentEl = document.getElementById('commentContent') as HTMLTextAreaElement;
          if (authorNameEl) {
            authorNameEl.value = '';
          }
          if (commentContentEl) {
            commentContentEl.value = '';
          }
        } else {
          console.error('Failed to submit comment');
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            {comments.length > 0 ? (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment.comment_id} className="bg-gray-100 p-4 rounded-md">
                    <p className="font-bold">{comment.author_name} said:</p>
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500">Posted on: {comment.commented_at}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No comments yet.</p>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Add a Comment</h3>
            <form className="space-y-4" onSubmit={handleSubmitComment}>
              <div>
                <label htmlFor="authorName" className="block font-medium text-gray-700">Name:</label>
                <input type="text" id="authorName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
              <div>
                <label htmlFor="commentContent" className="block font-medium text-gray-700">Comment:</label>
                <textarea id="commentContent" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
              <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">Submit Comment</button>
            </form>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogPostPage;

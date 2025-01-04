import BlogPostCard from '../../components/BlogPostCard';
import BlogSidebar from '../../components/BlogSidebar';

const posts = [
  {
    title: 'First Blog Post',
    excerpt: 'This is a brief excerpt of the first blog post.',
    slug: 'first-blog-post',
    date: '2023-01-15',
    author: 'John Doe',
    imageUrl: '/placeholder.jpg',
  },
  {
    title: 'Second Blog Post',
    excerpt: 'An interesting summary of the second article.',
    slug: 'second-blog-post',
    date: '2023-02-20',
    author: 'Jane Smith',
    imageUrl: '/placeholder.jpg',
  },
  {
    title: 'Third Blog Post',
    excerpt: 'Check out the details in this third blog post.',
    slug: 'third-blog-post',
    date: '2023-03-10',
    author: 'Peter Jones',
    imageUrl: '/placeholder.jpg',
  },
];

const BlogPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
            <BlogPostCard post={posts[0]} />
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">All Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.slice(1).map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        </div>
        <aside className="lg:col-span-1">
          <BlogSidebar />
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;

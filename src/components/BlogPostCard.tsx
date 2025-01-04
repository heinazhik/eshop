import Link from 'next/link';

interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  imageUrl: string;
}

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <img className="w-full h-56 object-cover" src={post.imageUrl} alt={post.title} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500 text-xs">By {post.author} on {post.date}</p>
          <Link href={`/blog/${post.slug}`} className="text-accent-500 hover:text-accent-700 font-medium">Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;

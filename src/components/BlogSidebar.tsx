const BlogSidebar = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <div className="mb-6">
        <h3 className="font-bold mb-3">Search</h3>
        <input type="text" placeholder="Search articles..." className="w-full border rounded-md py-2 px-3" />
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-3">Categories</h3>
        <ul>
          <li>Category 1</li>
          <li>Category 2</li>
          <li>Category 3</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-3">Recent Posts</h3>
        <ul>
          <li>Post Title 1</li>
          <li>Post Title 2</li>
          <li>Post Title 3</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;

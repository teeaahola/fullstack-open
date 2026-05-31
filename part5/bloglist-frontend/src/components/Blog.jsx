import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const isOwner = blog?.user?.username === user?.username || blog?.user?.id === user?.id

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(newBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog?.user?.username}</div>
        {isOwner && (
          <button onClick={handleDelete}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setError(`wrong username or password`)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const updateBlog = async (blog) => {
    try{
      const updatedBlog = await blogService.update(blog)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      setBlogs(updatedBlogs)
    }
    catch {
      setError(`error processing blog ${blog.title}`)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const createBlog = async (blog) => {
    try {
      await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch {
      setError(`error processing blog ${blog.title}`)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  } 

  return (
    <div>
      <Error message={error}/>
      <Notification message={notification}/>
      {!user && loginForm()}
      <h2>blogs</h2>
      {user && (
        <div>
          <p>{user.name ? user.name : user.username} logged in <button onClick={logout}>logout</button></p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
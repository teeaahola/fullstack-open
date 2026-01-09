import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const blogForm = () => (
    <form onSubmit={createBlog}>
      <div>
        <label>
          title
          <input
            type="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  const createBlog = async event => {
    event.preventDefault()
    
    try {
      await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch {
      setError(`error processing blog ${title}`)
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
          <h2>create new</h2>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
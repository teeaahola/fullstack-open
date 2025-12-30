const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)
    assert(titles.includes('First class tests'))
  })

  test('blogs have a unique identifier property named "id"', async () => {
    const response = await api.get('/api/blogs')

    const keys = Object.keys(response.body[0])
    assert(keys.includes('id'))
  })

  describe('addition of a new blog', () => {

    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'test',
        url: 'test.url',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)

      assert(titles.includes('async/await simplifies making async calls'))
    })

    test('succeeds with zero likes when "likes" is missing', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'test',
        url: 'test.url'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const addedBlog = blogsAtEnd.find(b => b.author === 'test')

      assert.equal(addedBlog.likes, 0)
    })

    test('fails with status code 400 if data is missing url', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'test',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 400 if data is missing title', async () => {
      const newBlog = {
        author: 'test',
        url: 'test.url',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})

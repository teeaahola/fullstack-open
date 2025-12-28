const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (acc, curr) => {
      return acc + curr.likes
    },
    0
  )
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (best, curr) => {
      return (best && best.likes > curr.likes) ? best : curr
    },
    null
  )
}

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const amounts = _.mapValues(grouped, (o) => o.length)
  const pairs = _.toPairs(amounts)
  const found = _.maxBy(pairs, (o) => o[1])
  return found ? { author: found[0], blogs: found[1] } : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}

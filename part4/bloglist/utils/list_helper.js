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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

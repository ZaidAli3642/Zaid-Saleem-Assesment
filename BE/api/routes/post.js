const { queries } = require('../../db')
const { databaseOp } = require('../../utils')
const auth = require('../middleware/auth')
const validateSavePost = require('../validations/post/savePost')
const validateUpdatePost = require('../validations/post/updatePost')

const router = require('express').Router()

router.post('/post', auth, validateSavePost, async (req, res) => {
  try {
    const { user_id, description } = req.body

    const UTCTime = new Date().getTime()

    await databaseOp.insert(queries.insert.post, [description, UTCTime, UTCTime, user_id])

    const post = await databaseOp.get(queries.get.postByUserId, [user_id])

    const parsedPost = JSON.parse(post.col)

    res.status(200).json({ message: 'congrats! your post is submitted', success: true, post: parsedPost })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

router.put('/post', auth, validateUpdatePost, async (req, res) => {
  try {
    const { post_id } = req.query
    const { description } = req.body

    const UTCTime = new Date().getTime()

    await databaseOp.insert(queries.update.post, [description, UTCTime, post_id])

    const post = await databaseOp.get(queries.get.postById, [post_id])

    const parsedPost = JSON.parse(post.col)

    res.status(200).json({ message: 'congrats! your post is updated', success: true, post: parsedPost })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

router.delete('/post', auth, async (req, res) => {
  try {
    const { post_id } = req.query

    await databaseOp.remove(queries.remove.postById, [post_id])

    res.status(200).json({ message: 'congrats! your post is deleted', success: true })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await databaseOp.all(queries.get.allPosts)

    const parsedPosts = JSON.parse(posts[0].posts)

    res.status(200).json({ message: 'congrats! All posts are fetched.', success: true, posts: parsedPosts })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

module.exports = router

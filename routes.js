import express from "express"
import { createPost, getPosts, getPost, updatePost, deletePost } from "./controller/Listings.js"
export const router = express.Router()

// home dir
router.get('/', (req, res) => {
  res.send("Hello World")
})

router.post('/listings/create', createPost);
router.get('/listings', getPosts)
router.get('/listings/:id', getPost)
router.patch('/listings/update/:id', updatePost)
router.delete('/listings/delete/:id', deletePost)
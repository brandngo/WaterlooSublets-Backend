import express from "express"
import { createPost, getPosts, getPost, updatePost, deletePost } from "../controllers/Listing.js"
const router = express.Router()

router.post('/create', createPost);
router.get('/', getPosts)
router.get('/:id', getPost)
router.patch('/update/:id', updatePost)
router.delete('/delete/:id', deletePost)

export default router
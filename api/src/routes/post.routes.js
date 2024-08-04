import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
} from '../controller/post.controller.js';
import uploadFile from '../middlewares/multerS3.middleware.js';
const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/', uploadFile.single('file'), createPost);
router.put('/:id', uploadFile.single('file'), updatePost);

export default router;

import express from 'express';
import userController from '../controller/user.controller.js';
import uploadFile from '../middlewares/multerS3.middleware.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.profile);
router.post('/logout', userController.logout);
router.post('/createpost',uploadFile.single('file'), userController.createpost);

router.get('/posts', userController.getposts);
router.get('/post/:id', userController.getpostinfo);
router.put('/post/:id', userController.updatepost);
router.put('/updatepost', uploadFile.single('file'),userController.updatepost);
export default router;




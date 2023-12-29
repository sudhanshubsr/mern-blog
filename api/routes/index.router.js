import express from 'express';
import userController from '../controller/user.controller.js';
import uploadFile from '../middlewares/multerS3.middleware.js';

const router = express.Router();

router.post('api/register', userController.register);
router.post('api/login', userController.login);
router.get('api/profile', userController.profile);
router.post('api/logout', userController.logout);
router.post('api/createpost',uploadFile.single('file'), userController.createpost);

router.get('api/posts', userController.getposts);
router.get('api/post/:id', userController.getpostinfo);
router.put('api/post/:id', userController.updatepost);
router.put('api/updatepost', uploadFile.single('file'),userController.updatepost);
export default router;




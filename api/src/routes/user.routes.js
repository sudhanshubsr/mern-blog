import { Router } from 'express';
import {
  current_user,
  login,
  logout,
  register,
} from '../controller/user.controller.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', current_user);
router.post('/logout', logout);

export default router;

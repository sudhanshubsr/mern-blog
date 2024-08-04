import {Router} from 'express'
import passport from 'passport';
import '../services/passport.js'

const router = Router();

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    function (req, res) {
      res.redirect(process.env.BASE_URL);
    }
  );


export default router;

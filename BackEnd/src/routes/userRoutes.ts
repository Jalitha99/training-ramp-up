import  express  from "express";
import { refreshTokenHandler, signInUser, signUpNewUser, logoutUser } from '../controllers/userController'

const router = express.Router();
router.post('/', signInUser)
router.post('/signup', signUpNewUser)
router.get('/refresh', refreshTokenHandler)
router.get('/logout', logoutUser)
export default router;
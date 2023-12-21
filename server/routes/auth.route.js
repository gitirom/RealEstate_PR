import express from 'express';
import { SigInWithGoogle, signOut, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signOut", signOut);
router.post("/google", SigInWithGoogle);


export default router;
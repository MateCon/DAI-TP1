import { Router } from "express";
import { getSignedToken } from "../utils/jwt.strategy";
 
const router = Router();
 
router.get("/login", async (req, res) => {
    res.status(200).send(getSignedToken());
});
 
export default router;

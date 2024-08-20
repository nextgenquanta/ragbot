import { Router } from "express";
import { getResponse } from "../../controllers/ragbot.controller.js";
const router = Router();

router.route("/response").post(getResponse);

export default router;

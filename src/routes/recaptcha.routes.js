import { Router } from "express";
import { captchaController } from "../controllers/recaptcha.controller";

const captchaRouter = Router();

captchaRouter.post("/verify-token", captchaController);

export default captchaRouter;

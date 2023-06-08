import { Router } from "express";
import { historyController } from "../controllers/history.controller";

const historyRouter = Router();

historyRouter.post("/history", historyController);

export default historyRouter;

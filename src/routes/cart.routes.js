import { Router } from "express";
import { cartController } from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.post("/cart", cartController);

export default cartRouter;

import { Router } from "express";
import { productsController } from "../controllers/shop.controller";

const shopRouter = Router();

shopRouter.get("/shop", productsController);

export default shopRouter;

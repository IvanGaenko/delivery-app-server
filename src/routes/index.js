import { Router } from "express";

import shopRouter from "./shop.routes";
import cartRouter from "./cart.routes";
import historyRouter from "./history.routes";
import captchaRouter from "./recaptcha.routes";

const apiRouter = Router();

apiRouter.use(shopRouter);
apiRouter.use(cartRouter);
apiRouter.use(historyRouter);
apiRouter.use(captchaRouter);

export default apiRouter;

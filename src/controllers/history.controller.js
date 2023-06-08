import { findUserInDatabase } from "../services/cart.service";
import { getUserOrders, getOrderProducts } from "../services/history.service";

export const historyController = async (req, res) => {
  const { email, phone } = req.body;
  const user = await findUserInDatabase({ email, phone });

  if (!user) {
    return res.status(200).json({
      success: false,
    });
  }

  const userOrders = await getUserOrders(user.id);
  const orderHistory = await getOrderProducts(userOrders);

  return res.status(200).json({
    success: true,
    orderHistory: orderHistory.length > 0 ? orderHistory : [],
  });
};

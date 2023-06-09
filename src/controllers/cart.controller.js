import {
  findUserInDatabase,
  saveNewUserToDatabase,
  saveOrderToDatabase,
} from "../services/cart.service";

export const cartController = async (req, res) => {
  const {
    couponid,
    cart,
    totalprice,
    discount,
    discountprice,
    address,
    name,
    email,
    phone,
  } = req.body;

  let findedUser = await findUserInDatabase({
    email,
    phone,
  });

  if (!findedUser) {
    const user = {
      name,
      email,
      phone,
    };

    findedUser = await saveNewUserToDatabase(user);
  }

  const order = await saveOrderToDatabase({
    cart,
    totalprice,
    discount,
    discountprice,
    userid: findedUser.id,
    couponid,
    address,
  });

  return res.status(200).json({
    success: true,
    orderid: order.id,
    address,
  });
};

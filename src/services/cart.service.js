import pool from "../db/pool";

export const findUserInDatabase = async ({ email, phone }) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND phone = $2 ORDER BY id ASC",
    [email, phone]
  );

  return user.rows[0];
};

export const saveNewUserToDatabase = async ({ name, email, phone }) => {
  const user = await pool.query(
    "INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
    [name, email, phone]
  );
  return user.rows[0];
};

export const saveOrderToDatabase = async ({
  cart,
  totalprice,
  discount,
  discountprice,
  userid,
  couponid,
  address,
}) => {
  const order = await pool.query(
    "INSERT INTO orders (totalprice,discount,discountprice,userid,couponid,address) values ($1,$2,$3,$4,$5,$6) RETURNING *",
    [totalprice, discount, discountprice, userid, couponid, address]
  );

  for (let i = 0; i < cart.length; i++) {
    await pool.query(
      "INSERT INTO ordersproducts (orderid,productid,quantity) values ($1,$2,$3)",
      [order.rows[0].id, cart[i].product.id, cart[i].quantity]
    );
  }

  return order.rows[0];
};

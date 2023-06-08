import pool from "../db/pool";

export const findUserInDatabase = async ({ email, phone }) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND phone = $2",
    [email, phone]
  );

  return user.rows[0];
};

export const getOrderHistory = async (id) => {
  const orders = await pool.query("SELECT * FROM orders WHERE userid = $1", [
    id,
  ]);
  console.log("orders", orders.rows);
  const orderHistory = [];
  if (orders.rows.length > 0) {
    for (let i = 0; i < orders.rows.length; i++) {
      const currentOrder = orders.rows[i];

      const orderToProduct = await pool.query(
        "SELECT * FROM ordersproducts WHERE orderid = $1",
        [currentOrder.id]
      );

      console.log("orderToProduct", orderToProduct.rows.length);

      const products = [];
      if (orderToProduct.rows.length > 0) {
        console.log("hello");
        for (let j = 0; j < orderToProduct.rows.length; j++) {
          console.log("inside", orderToProduct.rows[j]);
          const product = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [orderToProduct.rows[j].productid]
          );

          console.log("product", product.rows);
          products.push({
            quantity: orderToProduct.rows[j].quantity,
            product: product.rows[0],
          });
        }
      }

      orderHistory.push({
        ...currentOrder,
        cart: products,
      });
    }
  }
  return orderHistory;
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
}) => {
  const order = await pool.query(
    "INSERT INTO orders (totalprice,discount,discountprice,userid,couponid) values ($1,$2,$3,$4,$5) RETURNING *",
    [totalprice, discount, discountprice, userid, couponid]
  );

  for (let i = 0; i < cart.length; i++) {
    await pool.query(
      "INSERT INTO ordersproducts (orderid,productid,quantity) values ($1,$2,$3) RETURNING *",
      [order.rows[0].id, cart[i].product.id, cart[i].quantity]
    );
  }

  return order.rows[0];
};

import pool from "../db/pool";

export const fetchData = async () => {
  const products = await pool.query("SELECT * FROM products ORDER BY id ASC");
  const coupons = await pool.query("SELECT * FROM coupons ORDER BY id ASC");
  const result = await pool.query(
    `select json_build_object(
      'id', d.id,
      'name', d.name,
      'location', json_build_object(
        'id', l.id,
        'lat', l.lat,
        'lng', l.lng,
        'street_number', l.street_number,
        'route', l.route,
        'locality', l.locality,
        'icon', l.icon
      )) from dealers d inner join location l on d.id = l.dealerid;`
  );

  const dealers = result.rows.map((res) => {
    return res.json_build_object;
  });

  return {
    dealers,
    products: products.rows,
    coupons: coupons.rows,
  };
};

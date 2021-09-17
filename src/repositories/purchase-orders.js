const makeDbInstance = require('../main/factories/db');

const db = makeDbInstance();

module.exports = class PurchaseOrdersRepository {
    async findAll() {
        const sql = `
            SELECT
                purchase_orders.id,
                product_id, 
                price, 
                description, 
                name, 
                country
            FROM 
                purchase_orders,
                products,
                suppliers
            WHERE 
                purchase_orders.product_id = products.id 
            AND
                products.supplier_id = suppliers.id
            AND
                deletion_flag = '0'
            `;
        const purchase_orders = await db.select(sql);

        return purchase_orders;
    }

    async create(purchase_orders) {
        const sql = `
            INSERT INTO 
                purchase_orders (product_id, price, deletion_flag) 
            VALUES 
                (?,?,?);
        `;

        return db.persistMany(sql, purchase_orders);
    }

    async delete(id) {
        const sql = `UPDATE purchase_orders SET deletion_flag='1' WHERE id=${id}`;

        return db.persist(sql, id);
    }
};

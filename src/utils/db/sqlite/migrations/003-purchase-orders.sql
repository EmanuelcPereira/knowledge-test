--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE purchase_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL, 
    price REAL,
    deletion_flag TEXT(1) NOT NULL DEFAULT '0',
    CONSTRAINT purchaseOrderProduct_fk_productId FOREIGN KEY (product_id)
    REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO 
    purchase_orders (product_id, price, deletion_flag) 
VALUES 
    (1, 0.90, '0'),
    (2, 3000, '0'),
    (2, 700, '0'),
    (3, 40, '0');
--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE purchase_orders;
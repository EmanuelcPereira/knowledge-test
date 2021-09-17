# Alternative item - creation

## Table

`purchase_orders`

## Fields

| name          | Type     | Key | Not Null | Default | Auto Increment |
|:--------------|:--------:|:---:|:--------:|:-------:|:--------------:|
| id            | INTEGER  | X   | X        |         | X              |
| product_id    | INTEGER  |     | X        |         |                |
| price         | REAL     |     | X        |         |                |
| deletion_flag | TEXT(1)  |     | X        | 0       |                |
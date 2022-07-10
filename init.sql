CREATE DATABASE IF NOT EXISTS e_com_web;

use e_com_web;

INSERT INTO permissions(perm_name, perm_description, createdAt, updatedAt) VALUES('PRODUCT_ADD', 'Add Product', now(), now());
INSERT INTO permissions(perm_name, perm_description, createdAt, updatedAt) VALUES('PRODUCT_UPDATE', 'Update Product', now(), now());
INSERT INTO permissions(perm_name, perm_description, createdAt, updatedAt) VALUES('PRODUCT_READ', 'Get Product', now(), now());
INSERT INTO permissions(perm_name, perm_description, createdAt, updatedAt) VALUES('PRODUCT_READ_ALL', 'Get All Product', now(), now());
INSERT INTO permissions(perm_name, perm_description, createdAt, updatedAt) VALUES('PRODUCT_DELETE', 'Delete Product', now(), now());


INSERT INTO roles(role_name, role_description, createdAt, updatedAt) VALUES('ADMIN', 'ADMIN Role', now(), now());
INSERT INTO roles(role_name, role_description, createdAt, updatedAt) VALUES('SELLER', 'SELLER Role', now(), now());
INSERT INTO roles(role_name, role_description, createdAt, updatedAt) VALUES('SUPPORTER', 'SUPPORTER Role', now(), now());
INSERT INTO roles(role_name, role_description, createdAt, updatedAt) VALUES('CUSTOMER', 'CUSTOMER Role', now(), now());


INSERT INTO rolepermissions (role_id, perm_id, createdAt, updatedAt)
SELECT r.id,p.id,now(), now()
FROM permissions p, roles r WHERE role_name="ADMIN";


INSERT INTO rolepermissions (role_id, perm_id, createdAt, updatedAt)
SELECT r.id,p.id,now(), now()
FROM permissions p, roles r WHERE role_name="SELLER" AND perm_name != "PRODUCT_DELETE" ;


INSERT INTO rolepermissions (role_id, perm_id, createdAt, updatedAt)
SELECT r.id,p.id,now(), now()
FROM permissions p, roles r WHERE role_name="SUPPORTER" AND perm_name IN ("PRODUCT_DELETE","PRODUCT_READ","PRODUCT_READ_ALL") ;

INSERT INTO rolepermissions (role_id, perm_id, createdAt, updatedAt)
SELECT r.id,p.id,now(), now()
FROM permissions p, roles r WHERE role_name="CUSTOMER" AND perm_name IN ("PRODUCT_READ","PRODUCT_READ_ALL") ;
/*
  Warnings:

  - You are about to drop the column `slug` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `category_slug_key` ON `category`;

-- DropIndex
DROP INDEX `product_sku_key` ON `product`;

-- DropIndex
DROP INDEX `product_slug_key` ON `product`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `sku`,
    DROP COLUMN `slug`,
    DROP COLUMN `stock`;

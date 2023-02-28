/*
  Warnings:

  - The primary key for the `application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `idPerson` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_advert,id_person]` on the table `application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_person]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_person` to the `application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_person` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `advert` DROP FOREIGN KEY `fk_advert_user`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `fk_application_advert`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `fk_application_user`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `fk_user_person`;

-- AlterTable
ALTER TABLE `application` DROP PRIMARY KEY,
    DROP COLUMN `id_user`,
    ADD COLUMN `id_person` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_advert`, `id_person`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `idPerson`,
    ADD COLUMN `id_person` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `fk_application_person` ON `application`(`id_person`);

-- CreateIndex
CREATE UNIQUE INDEX `unique_application` ON `application`(`id_advert`, `id_person`);

-- CreateIndex
CREATE UNIQUE INDEX `id_person` ON `user`(`id_person`);

-- AddForeignKey
ALTER TABLE `advert` ADD CONSTRAINT `fk_advert_creator` FOREIGN KEY (`id_creator`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `fk_application_advert` FOREIGN KEY (`id_advert`) REFERENCES `advert`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `fk_application_person` FOREIGN KEY (`id_person`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_person` FOREIGN KEY (`id_person`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `advert` RENAME INDEX `fk_advert_user` TO `fk_advert_creator`;

-- DropForeignKey
ALTER TABLE `advert` DROP FOREIGN KEY `fk_advert_company`;

-- DropForeignKey
ALTER TABLE `advert` DROP FOREIGN KEY `fk_advert_user`;

-- AddForeignKey
ALTER TABLE `advert` ADD CONSTRAINT `fk_advert_company` FOREIGN KEY (`id_company`) REFERENCES `company`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `advert` ADD CONSTRAINT `fk_advert_user` FOREIGN KEY (`id_creator`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

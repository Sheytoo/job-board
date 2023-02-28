-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `fk_application_advert`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `fk_application_user`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `fk_user_person`;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `fk_application_advert` FOREIGN KEY (`id_advert`) REFERENCES `advert`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `fk_application_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_person` FOREIGN KEY (`idPerson`) REFERENCES `person`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

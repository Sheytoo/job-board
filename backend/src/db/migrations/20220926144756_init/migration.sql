-- CreateTable
CREATE TABLE `advert` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_company` INTEGER NOT NULL,
    `id_creator` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `creation_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_advert_company`(`id_company`),
    INDEX `fk_advert_user`(`id_creator`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `application` (
    `id_advert` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `creation_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_application_user`(`id_user`),
    PRIMARY KEY (`id_advert`, `id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(320) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPerson` INTEGER NOT NULL,
    `password` TEXT NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,

    INDEX `fk_user_person`(`idPerson`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `advert` ADD CONSTRAINT `fk_advert_company` FOREIGN KEY (`id_company`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `advert` ADD CONSTRAINT `fk_advert_user` FOREIGN KEY (`id_creator`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `fk_application_advert` FOREIGN KEY (`id_advert`) REFERENCES `advert`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `fk_application_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_person` FOREIGN KEY (`idPerson`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

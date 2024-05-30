-- CreateTable
CREATE TABLE `equipements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NULL,
    `designation` VARCHAR(40) NOT NULL,
    `description` VARCHAR(75) NULL,
    `dispo` BOOLEAN NOT NULL DEFAULT true,

    INDEX `room_fk_2`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(40) NOT NULL,
    `lieu` VARCHAR(40) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `equipements` ADD CONSTRAINT `room_fk_2` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

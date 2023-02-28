DROP TABLE IF EXISTS company, user, advert, address, application;

CREATE TABLE IF NOT EXISTS user
(
    id        INTEGER AUTO_INCREMENT,
    email     VARCHAR(320) UNIQUE NOT NULL,
    password  TEXT                NOT NULL,
    firstName VARCHAR(255)        NOT NULL,
    lastName  VARCHAR(255)        NOT NULL,
    isAdmin   BOOLEAN             NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS company
(
    id      INTEGER AUTO_INCREMENT,
    name    VARCHAR(255) NOT NULL,
    logoUrl VARCHAR(512),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS address
(
    id      INTEGER AUTO_INCREMENT,
    street  VARCHAR(255) NOT NULL,
    city    VARCHAR(255) NOT NULL,
    zip     VARCHAR(10)  NOT NULL,
    country VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS advert
(
    id           INTEGER AUTO_INCREMENT,
    idCompany    INTEGER      NOT NULL,
    idCreator    INTEGER      NOT NULL,
    idAddress    INTEGER      NOT NULL,
    title        VARCHAR(255) NOT NULL,
    description  TEXT         NOT NULL,
    creationDate TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_advert_company FOREIGN KEY (idCompany) REFERENCES company (id) ON DELETE CASCADE,
    CONSTRAINT fk_advert_user FOREIGN KEY (idCreator) REFERENCES user (id) ON DELETE CASCADE,
    CONSTRAINT fk_advert_address FOREIGN KEY (idAddress) REFERENCES address (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS application
(
    id           INTEGER AUTO_INCREMENT,
    idAdvert     INTEGER                                              NOT NULL,
    email        VARCHAR(320)                                         NOT NULL,
    firstName    VARCHAR(255)                                         NOT NULL,
    lastName     VARCHAR(255)                                         NOT NULL,
    message      TEXT                                                 NOT NULL,
    status       ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    creationDate TIMESTAMP                                            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_application_advert FOREIGN KEY (idAdvert) REFERENCES advert (id) ON DELETE CASCADE
);

INSERT INTO `address` (`id`, `street`, `city`, `zip`, `country`)
VALUES (1, '3586 Edwards Street', 'Morehead City', 'NC 28557', 'United States'),
       (2, '2753 Whitetail Lane', 'Dallas', 'TX 75244', 'United States'),
       (3, '1906 Rainy Day Drive', 'Boston', 'MA 02110', 'United States'),
       (4, '488 Quiet Valley Lane', 'North Hollywood', 'CA 91605', 'United States'),
       (5, '2797 Armbrester Drive', 'West Los Angeles', 'CA 90025', 'United States'),
       (6, '7 All. Cérès', 'Strasbourg', '67200', 'France');

INSERT INTO `user` (`id`, `email`, `password`, `firstName`, `lastName`, `isAdmin`)
VALUES (1, 'admin@localhost.me', '$2b$10$Y1cScFMc55MbRpV2s3/4w./HnoU.YuyYDr4.f/DJsHY4Tvu./X8oa', 'Admin', 'Admin', 1),
       (2, 'user@localhost.me', '$2b$10$Y1cScFMc55MbRpV2s3/4w./HnoU.YuyYDr4.f/DJsHY4Tvu./X8oa', 'User', 'User', 0),
       (3, 'elon.musk@mars.space', '$2b$10$Y1cScFMc55MbRpV2s3/4w./HnoU.YuyYDr4.f/DJsHY4Tvu./X8oa', 'Elon', 'Musk', 0),
       (4, 'nathan.blind-heitz@epitech.eu', '$2b$10$Y1cScFMc55MbRpV2s3/4w./HnoU.YuyYDr4.f/DJsHY4Tvu./X8oa', 'Nathan',
        'Blind Heitz', 1),
       (5, 'leo.bickel@epitech.eu', '$2b$10$Y1cScFMc55MbRpV2s3/4w./HnoU.YuyYDr4.f/DJsHY4Tvu./X8oa', 'Leo', 'Bickel', 1),
       (13, 'louis.kleiver@epitech.eu', '$2b$10$3DYX9.iEbySUbH/QOdA0qeroQmyCcYou7oKOg6h0GQT75qbuN..ii', 'Louis',
        'Kleiver', 1);

INSERT INTO `company` (`id`, `name`, `logoUrl`)
VALUES (1, 'Dropbox', 'https://i.postimg.cc/kGk5D20Y/dropbox-logo.png'),
       (2, 'Google', 'https://i.ibb.co/HFTs72b/google-logo.png'),
       (3, 'Uber Eats', 'https://i.ibb.co/YQ1WNZ7/uber-eats-logo.png'),
       (4, 'Patreon', 'https://i.ibb.co/GC9Yc6s/patreon-logo.png'),
       (5, 'Crédit Mutuel', 'https://i.ibb.co/G0mSDjr/credit-mutuel-logo.png'),
       (6, 'Epitech', 'https://logo.clearbit.com/epitech.eu'),
       (7, 'Nike', 'https://logo.clearbit.com/nike.com'),
       (8, 'Euro-Information', 'https://logo.clearbit.com/e-i.com'),
       (9, 'Audi', 'https://logo.clearbit.com/audi.com'),
       (10, 'Apple', 'https://logo.clearbit.com/apple.com'),
       (12, 'YouTube', 'https://logo.clearbit.com/youtube.com'),
       (13, 'Catalyse IT', 'https://logo.clearbit.com/catalyse-it.com'),
       (14, 'Chargemap', 'https://logo.clearbit.com/chargemap.com');

INSERT INTO `advert` (`id`, `idCompany`, `idCreator`, `idAddress`, `title`, `description`, `creationDate`)
VALUES (1, 1, 1, 1, 'UI / UX Designer',
        'We are looking for a UI / UX Designer to join our team. You will be responsible for creating amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional designs.',
        '2022-02-18 12:42:12'),
       (2, 2, 13, 2, 'Sr. Product Designer',
        'We are looking for a Sr. Product Designer to join our team. You will be responsible for creating amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional designs.',
        '2022-04-29 06:41:09'),
       (3, 3, 3, 3, 'User Experience Designer',
        'We are looking for a User Experience Designer to join our team. You will be responsible for creating amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional designs.',
        '2022-01-16 17:34:52'),
       (4, 4, 4, 4, 'Product Designer',
        'We are looking for a Product Designer to join our team. You will be responsible for creating amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional designs.',
        '2022-03-12 10:23:45'),
       (5, 5, 5, 5, 'UI Designer',
        'We are looking for a UI Designer to join our team. You will be responsible for creating amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional designs.',
        '2022-05-21 07:12:38'),
       (6, 14, 4, 6, 'Full Stack Developer (Web & Mobile)',
        'Lorem ipsum dolor sit amet. Ut doloribus libero nam provident repellendus est voluptates quidem ex architecto Quis eos molestiae ipsam aut molestiae enim. Est voluptates eius est praesentium laudantium sed ipsum nemo. Ut magni ullam At esse praesentium rem praesentium qui omnis sint.\n\nAd illo dolore ea dolores atque aut veritatis aliquam et saepe asperiores nam voluptatem tempora a soluta perspiciatis. Qui voluptatem veritatis qui consequatur doloremque sed doloremque consequatur et velit optio ut repellat ducimus est facilis velit. Aut iste dicta est dolores ad iste accusantium sed laborum eaque et tempora sequi. ',
        '2022-10-14 12:18:11');

INSERT INTO `application` (`id`, `idAdvert`, `email`, `firstName`, `lastName`, `message`, `status`, `creationDate`)
VALUES (1, 1, 'nathan.blind-heitz@epitech.eu', 'Nathan', 'Blind Heitz',
        'I am a UI / UX Designer with 5 years of experience. I am looking for a new challenge and I think your company is the right place for me.',
        'ACCEPTED', '2022-02-18 12:42:12'),
       (2, 2, 'fronck@foncked.fr', 'Fronck', 'Foncked',
        'I am a Sr. Product Designer with 5 years of experience. I am looking for a new challenge and I think your company is the right place for me.',
        'PENDING', '2022-04-29 06:41:09'),
       (3, 3, 'leo.bickel@epitech.eu', 'Leo', 'Bickel',
        'I am a User Experience Designer with 5 years of experience. I am looking for a new challenge and I think your company is the right place for me.',
        'CANCELED', '2022-01-16 17:34:52'),
       (4, 4, 'louis@epitech.eu', 'Louis', 'Louis',
        'I am a Product Designer with 5 years of experience. I am looking for a new challenge and I think your company is the right place for me.',
        'ACCEPTED', '2022-03-12 10:23:45'),
       (5, 5, 'elon.musk@mars.space', 'Elon', 'Musk',
        'I am a UI Designer with 5 years of experience. I am looking for a new challenge and I think your company is the right place for me.',
        'REJECTED', '2022-05-21 07:12:38'),
       (19, 2, 'nathan.blind-heitz@epitech.eu', 'Nathan', 'Blind Heitz',
        'I want to join your company please! I need moneyyyyy!!!!', 'REJECTED', '2022-10-15 12:39:05'),
       (20, 2, 'rick@roll.fr', 'Rick', 'Roll',
        'We\'re no strangers to love\nYou know the rules and so do I (do I)\nA full commitment\'s what I\'m thinking of\nYou wouldn\'t get this from any other guy\n\nI just wanna tell you how I\'m feeling\nGotta make you understand\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you',
        'CANCELED', '2022-10-15 12:40:24'),
       (21, 2, 'elon.musk@mars.space', 'Elon', 'Musk',
        'Lorem ipsum dolor sit amet. Et doloribus fuga qui internos nobis ut molestiae reiciendis vel explicabo accusantium. Aut odio necessitatibus qui consequatur obcaecati voluptates ipsam qui officia sunt est modi ullam! Ad optio deserunt et voluptas culpa eum distinctio voluptatem ex debitis quos et error internos quo omnis tenetur sit odio velit! Quo omnis possimus sed dolores quia et libero odio et suscipit molestias.',
        'ACCEPTED', '2022-10-15 12:55:06'),
       (22, 2, 'john.doe@gmail.com', 'John', 'Doe',
        'Cum quia excepturi et quia neque aut sint voluptate iste laudantium a molestias voluptatem et incidunt quas. Non quibusdam asperiores ut quia aliquam qui repudiandae consectetur At voluptate magnam. Eos voluptas cumque eum illum accusamus est quaerat distinctio qui eius eligendi et necessitatibus minus.',
        'PENDING', '2022-10-15 12:56:18'),
       (23, 6, 'louis.kleiver@epitech.eu', 'Louis', 'Kleiver',
        'Lorem ipsum dolor sit amet. Id debitis exercitationem et quia Quis non ipsam praesentium ex consequatur vero sed repellendus obcaecati sit omnis dignissimos! Qui aliquam eligendi aut magnam voluptatem in aliquam amet ut molestiae porro ea rerum laudantium. Id temporibus magnam cum earum iusto aut sint debitis et accusamus impedit sed corporis quos sed amet porro eos dolorum corrupti. ',
        'PENDING', '2022-10-15 13:00:59');
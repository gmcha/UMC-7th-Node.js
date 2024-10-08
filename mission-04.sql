CREATE DATABASE workbook1;

USE workbook1;
CREATE TABLE member (
    member_id          BIGINT NOT NULL AUTO_INCREMENT,
    name        VARCHAR(10) NOT NULL,
    nickname    VARCHAR(20) NOT NULL,
    gender      VARCHAR(10) NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    updated_at  DATETIME(6) NOT NULL,
    status      VARCHAR(15) NOT NULL,
    inactive_date   DATETIME NULL,
    PRIMARY KEY (member_id)
);

CREATE TABLE book (
    book_id          BIGINT NOT NULL AUTO_INCREMENT,
    name        VARCHAR(40) NOT NULL,
    description TEXT NULL,
    created_at  DATETIME(6) NOT NULL,
    updated_at  DATETIME(6) NOT NULL,
    PRIMARY KEY (book_id)
);

CREATE TABLE rent (
    rent_id          BIGINT NOT NULL AUTO_INCREMENT,
    book_id     BIGINT NOT NULL,
    member_id   BIGINT NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    updated_at  DATETIME(6) NOT NULL,
    PRIMARY KEY (rent_id),
    FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

CREATE TABLE book_likes (
    book_likes_id        BIGINT NOT NULL AUTO_INCREMENT,
    book_id   BIGINT NOT NULL,
    member_id   BIGINT NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    updated_at  DATETIME(6) NOT NULL,
    PRIMARY KEY (book_likes_id),
    FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

CREATE TABLE book_category (
    book_category_id      BIGINT NOT NULL AUTO_INCREMENT,
    name    varchar(20) NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    updated_at  DATETIME(6) NOT NULL,
    PRIMARY KEY (book_category_id)
);

CREATE TABLE hash_tag (
    hash_tag_id        BIGINT NOT NULL AUTO_INCREMENT,
    name    varchar(20) NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    updated_at  DATETIME(6) NOT NULL,
    PRIMARY KEY (hash_tag_id)
);

CREATE TABLE book_hash_tag (
    book_hash_tag_id        BIGINT NOT NULL AUTO_INCREMENT,
    book_id   BIGINT NOT NULL,
    hash_tag_id   BIGINT NOT NULL,
    PRIMARY KEY (book_hash_tag_id),
    FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (hash_tag_id) REFERENCES hash_tag(hash_tag_id)
);

CREATE TABLE notice_alarm (
    notice_alarm_id        BIGINT NOT NULL AUTO_INCREMENT,
    user_id   BIGINT NOT NULL,
    is_confirmed    BOOLEAN NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    updated_at  DATETIME(6) NOT NULL,
    title       VARCHAR(30) NULL,
    body        TEXT NULL,
    PRIMARY KEY (notice_alarm_id),
    FOREIGN KEY (user_id) REFERENCES member(member_id)
);

CREATE TABLE marketing_alarm (
    marketing_alarm_id        BIGINT NOT NULL AUTO_INCREMENT,
    user_id   BIGINT NOT NULL,
    is_confirmed    BOOLEAN NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    updated_at  DATETIME(6) NOT NULL,
    title       VARCHAR(30) NULL,
    body        TEXT NULL,
    PRIMARY KEY (marketing_alarm_id),
    FOREIGN KEY (user_id) REFERENCES member(member_id)
);
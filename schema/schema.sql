create database `electron-tasklist`;

use `electron-tasklist`;

create table tasks
(
    id int auto_increment,
    task varchar(255) null,
    created datetime default current_timestamp null,
    finished datetime null,
    finish boolean default false null,
    primary key (id),
    unique index (id)
);
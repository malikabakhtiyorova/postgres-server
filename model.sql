create table books(
    book_id serial not null primary key,
    user_id int not null,
    book_name character varying(64) not null,
    book_description character varying(128),
    file_id varchar(128) not null
);

insert into books (user_id, book_name, book_description, file_id) VALUES (
    1789,
    'Choliqushi',
    'Turkish book',
    12
);

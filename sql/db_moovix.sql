create database Moovix;
use Moovix;

create table cliente(
IDcliente int primary key not null auto_increment,
nome varchar (100) not null check(length(nome)>=10) unique,
email varchar (150) not null,
senha varchar (15) not null check(length(senha)>=8),
telefone numeric (12) not null check(length(telefone)>=11)
);
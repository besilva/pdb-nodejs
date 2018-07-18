create table medico(id int(5) not null AUTO_INCREMENT primary key, nome varchar(100) not null, data_nascimento Date);
create table especialidade(id int(5) not null AUTO_INCREMENT primary key, nome varchar(100) not null);
create table enfase(id int(5) not null AUTO_INCREMENT primary key, nome varchar(100) not null, especialidade_id int(5) not null,
 FOREIGN KEY (especialidade_id)  REFERENCES especialidade(id));
create table contato(id int(5) not null AUTO_INCREMENT primary key, endereco varchar(255),telefone varchar(10), medico_id int(5) not null,
 FOREIGN KEY (medico_id)  REFERENCES medico(id));
create table medico_especialidade( medico_id int(5) not null,especialidade_id int(5) not null,
 FOREIGN KEY (medico_id)  REFERENCES medico(id),
 FOREIGN KEY (especialidade_id)  REFERENCES especialidade(id));
 create table medico_enfase( medico_id int(5) not null,enfase_id int(5) not null,
 FOREIGN KEY (medico_id)  REFERENCES medico(id),
 FOREIGN KEY (enfase_id)  REFERENCES enfase(id));

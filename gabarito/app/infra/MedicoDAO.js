function MedicoDAO(connection){
    this._connection = connection;
}

MedicoDAO.prototype.lista = function(callback){
    this._connection.query('select m.nome, m.id,m.crm, m.data_nascimento, e.nome as especialidade from medico m left join medico_especialidade me on me.medico_id = m.id left join especialidade e on e.id = me.especialidade_id',callback);
}
MedicoDAO.prototype.salva = function(medico, callback){
    this._connection.query('insert into medico set ?', medico, callback);
}
MedicoDAO.prototype.salvaEspecialidades = function(array, callback){
    this._connection.query('insert into medico_especialidade(medico_id, especialidade_id) VALUES ?', [array], callback);
}
MedicoDAO.prototype.salvaContato = function(medico_id, tel, endereco, callback){
    this._connection.query('insert into contato set ?', {medico_id: medico_id, endereco: endereco, telefone: tel}, callback);
}
MedicoDAO.prototype.salvaEnfases= function(array, callback){
    this._connection.query('insert into medico_enfase(medico_id, enfase_id) values ?', [array], callback);
}
MedicoDAO.prototype.deletar= function(medico_id, callback){
    this._connection.query('delete from medico where id = ?',[medico_id], callback);
}
module.exports = function(){
    return MedicoDAO;
}
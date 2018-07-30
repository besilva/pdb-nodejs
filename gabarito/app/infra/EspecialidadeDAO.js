function EspecialidadeDAO(connection){
    this._connection = connection;
}

EspecialidadeDAO.prototype.lista = function(callback){
    this._connection.query('select e.nome, e.id, en.id as enfase_id, en.nome as enfase_nome from especialidade e left join enfase en on e.id = en.especialidade_id',callback);
}

module.exports = function(){
    return EspecialidadeDAO;
}
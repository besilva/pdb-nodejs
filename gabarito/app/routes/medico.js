module.exports = function(app){
    app.get('/medico',function(req, res){
        var connection = app.infra.connectionFactory();
        var medicoDAO = new app.infra.MedicoDAO(connection);
        medicoDAO.lista(function(err, results){
            var medicos =[];
            medicos.push(results[0]);
            
            for(var i=1; i< results.length;i++){
                if(medicos[medicos.length-1].id == results[i].id){
                    medicos[medicos.length-1].especialidade+= ',' + results[i].especialidade;
                }else{
                    medicos.push(results[i]);
                }
            }
            res.format({
                html: function(){
                    res.render('medico/lista', {lista: medicos});
                },
                json: function(){
                    res.json(results);
                }
            });
            
        });
        connection.end();
    });
    app.get('/medico/deletar/:id',function (req, res) {
        var id = req.params.id;
        var connection = app.infra.connectionFactory();
        var medicoDAO = new app.infra.MedicoDAO(connection);
        medicoDAO.deletar(id, function(err, result){
            console.log(err);
            res.redirect('/medico');
        });

    });

    function renderizaForm(res, erros, medico){
        var connection = app.infra.connectionFactory();
        var especialidadeDAO = new app.infra.EspecialidadeDAO(connection);
        especialidadeDAO.lista(function(err, results){
            var especialidades = [];
            especialidades.push({
                'nome': results[0].nome,
                'id': results[0].id,
                'enfases':[
                    {
                        'nome': results[0].enfase_nome,
                        'id': results[0].enfase_id
                    }
                ]
            });
            for(var i=1; i< results.length;i++){
                if(especialidades[especialidades.length-1].id == results[i].id){
                    especialidades[especialidades.length-1].enfases.push({
                        'nome': results[i].enfase_nome,
                        'id': results[i].enfase_id
                    });
                }else{
                    especialidades.push({
                        'nome': results[i].nome,
                        'id': results[i].id,
                        'enfases':[
                            {
                                'nome': results[i].enfase_nome,
                                'id': results[i].enfase_id
                            }
                        ]
                    });
                }
            }
            
            res.render('medico/cadastro', {errosValidacao: {}, medico:{}, especialidades: especialidades});
        });
       connection.end();
        
    }
    app.get('/medico/cadastro',function(req, res){
        
            renderizaForm(res);
        
        
    });
    app.post('/medico', function (req, res) {
        var medico = req.body;
        var connection = app.infra.connectionFactory();
        var medicoDAO = new app.infra.MedicoDAO(connection);
        medicoDAO.salva({'nome': medico.nome, 'crm': medico.crm, 'data_nascimento': new Date(medico.data)},function (erros, result) {
            medico['id'] = result.insertId;
            for(var i=0; i< medico.contatos.length;i+=2){
                console.log(medico.contatos[i]);
                medicoDAO.salvaContato(medico['id'], medico.contatos[i], medico.contatos[i+1], function(err, res){
                    console.log(err)
                    console.log('contato salvo');
                });
            }
            salvaEspecialidades(medicoDAO, medico,res,connection);
        });
        
       
    });
    function salvaEspecialidades(medicoDAO, medico,res, connection){
        var values = [];
        for(var i=0; i<medico.especialidades.length;i++){
            values.push([medico.id, medico.especialidades[i]]);
        } 
        // Insert into  medico_enfase(medico_id, enfase_id) VALUES (1,1)(1,2)
        console.log('values:'+values);
        medicoDAO.salvaEspecialidades(values,function(err, results){
            console.log(results);
            console.log(medico);
            if(medico.enfases){
                salvaEnfases(medico,medicoDAO,connection,res);
            }else{
                connection.end();
                res.redirect('/medico');
            }
        });
    }
    function salvaEnfases(medico, medicoDAO, connection,res){
        var values = [];
        for(var j=0; j<medico.enfases.length;j++){
            values.push([medico.id, medico.enfases[j]]);
        }
        medicoDAO.salvaEnfases(values,function(err, resultados){
            console.log('salvou enfases');
            connection.end();
            res.redirect('/medico');
        });
    }
}
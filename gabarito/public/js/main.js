document.querySelector('#add-endereco').addEventListener('click', function(){
    var divContato = document.querySelector('#contato');
    var contatos = document.querySelectorAll('.contato').length;
    var nomeTelefone = 'contatos['+contatos+'].telefone';
    var nomeEndereco = 'contatos['+contatos+'].endereco';
    divContato.innerHTML = divContato.innerHTML +((document.querySelector('#template-novo-endereco').innerHTML).replace('{{telefone-name}}', nomeTelefone).replace('{{endereco-name}}', nomeEndereco));
    //todo: replace do {{name}} no template com o nome da sua escolha
});
var especialidades = document.querySelectorAll('.especialidade input');
for(var i =0;i<especialidades.length; i++){
    especialidades[i].addEventListener('click',function(){
        var checkboxes = this.parentNode.parentNode.childNodes;
        if(this.checked){
            for(var j =0; j<checkboxes.length; j++){
                if(checkboxes[j].classList && checkboxes[j].classList.contains('patologia')){
                    checkboxes[j].classList.remove('hidden');
                }   
            }
        }else{
            for(var j =0; j<checkboxes.length; j++){
                if(checkboxes[j].classList && checkboxes[j].classList.contains('patologia')){
                    checkboxes[j].classList.add('hidden');
                }   
            }
        }
    });
}
document.querySelector('#contato').addEventListener('click',function (event) {
    if(event.target.id == 'remover-endereco'){
        event.target.parentNode.parentNode.remove();
    }
});
document.querySelector('#finish-register').addEventListener('click',function(e){
    e.preventDefault(); 

    var especialidadesSelecionadas = [];
    var patologiasSelecionadas = [];
    var especialiadades = document.querySelectorAll(".especialidade input")
    for(var i=0; i<especialiadades.length; i++){
        if(especialiadades[i].checked){
            especialidadesSelecionadas.push(especialiadades[i]);
        }
    }
    var patologias = document.querySelectorAll(".patologia input")
    for(var i=0; i<patologias.length; i++){
        if(patologias[i].checked){
            patologiasSelecionadas.push(patologias[i]);
        }
    }
    var div = document.createElement('div');
    var modelo = document.createElement('input');
    modelo.type = 'hidden';
    for(var i=0;i<especialidadesSelecionadas.length;i++){
        modelo.value = especialidadesSelecionadas[i].value;
        modelo.name = 'especialidades['+i+'].id';
        div.appendChild(modelo);
        document.querySelector('#especialidades-selecionadas').innerHTML+= div.innerHTML;
    }
    for(var i=0;i<patologiasSelecionadas.length;i++){
        modelo.value = patologiasSelecionadas[i].value;
        modelo.name = 'enfases['+i+'].id';
        div.appendChild(modelo);
        document.querySelector('#especialidades-selecionadas').innerHTML+= div.innerHTML;
    }
   
    document.querySelector('#doctor-register').submit();
    
});

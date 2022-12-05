
 let id = 0 
 
 let listaCEP = [
               
];
    
        
const somaId = listaCEP.reduce((acumulador, item) => {
    return acumulador + item.id;
}, 0)
function addCEP(cep) {
    listaCEP.push(cep);
    rendCEP();
}
function remover(id) {
    listaCEP = listaCEP.filter(cep => cep.id !== id);
    rendCEP();
}
function rendCEP() {
    let listaUl = document.getElementById('listaUl');
    listaUl.innerHTML = '';
    listaCEP.map(cep => {
        let li = document.createElement('li');
        li.classList.add('my-3');
        li.innerHTML = " CEP: " + cep.cep + " | " + " Cidade: " + cep.cidade + " | " + " UF: " + cep.uf;
        li.innerHTML += ` <button type="button" 
                        class="btn btn-sm btn-danger" 
                        onclick="remover(${cep.id})">
                        Remover
                        </button>`;
        listaUl.appendChild(li);
    });
}

rendCEP()

const btnAdicionar = document.getElementById('btnAdicionar');
btnAdicionar.addEventListener('click', function () {
    const buscar = document.getElementById('cep').value
    if(buscar.length < 8 || buscar.length > 8){
        alert("Por favor digite um CEP válido")
    }
    else{
        fetch('https://viacep.com.br/ws/'+ buscar + '/json/')
        .then(response => response.json())
        .then(data=> {
        if(data.erro == true){
            alert('CEP não encontrado')
        }
        else{
        addCEP(
        {
            id: id++,
            cep: data.cep,
            cidade: data.localidade,
            uf: data.uf
        })
        }
       
     })
    }
})
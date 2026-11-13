const nomeCliente = document.getElementById("nome_cliente");
const telefoneCliente = document.getElementById("telefone_cliente");
const valorEntrada = document.getElementById("valor_entrada");
const valorFinal= document.getElementById("valor_final");
const pecaProduzida= document.getElementById("peca_produzida");
const observacoes = document.getElementById("observacoes");
const botaoAddCliente = document.getElementById("botao_add_cliente");
const pastaMae = document.getElementById("pastas_clientes");
let pastas = JSON.parse(localStorage.getItem("pastas"))||[]



window.onload = function(){
    pastas.forEach(function(cliente, index){ 
        adicionarCliente(cliente, index);
 });
}

const navbar = document.getElementById("navbar")
const openButton = document.getElementById("open_side_bar")
const media = window.matchMedia("(width < 800px)")

media.addEventListener('change', (e) => updateNavBar(e))
function updateNavBar(e){
    const isMobile = e.matches
    console.log(isMobile)
    if(isMobile){
         navbar.setAttribute('inert', '')
    }
    else {
        navbar.removeAttribute('inert', '')
    }
}
function openSideBar(){
    navbar.classList.add('show')
    openButton.setAttribute('aria-expanded', 'true')
    navbar.removeAttribute('inert')
}
function closeSideBar(){
    navbar.classList.remove('show')
    openButton.setAttribute('aria-expanded', 'false')
    navbar.setAttribute('inert', '')
}

botaoAddCliente.addEventListener('click', function(event){
    event.preventDefault()
    if(nomeCliente.value.trim() === "" || telefoneCliente.value.trim() === "" || valorEntrada.value.trim() === "" ||
        valorFinal.value.trim() === "" || pecaProduzida.value.trim() === "" || observacoes.value.trim() === ""){
            alert ("Preecha todos os campos!");
            return;
        }
     
    const cliente = {
        nome: nomeCliente.value.trim(),
        telefone: telefoneCliente.value.trim(),
        entrada: valorEntrada.value.trim(),
        preco: valorFinal.value.trim(),
        peca: pecaProduzida.value.trim(),
        obs: observacoes.value.trim()

        
    }
    pastas.push(cliente)
    localStorage.setItem("pastas", JSON.stringify(pastas));
    adicionarCliente(cliente, pastas.length - 1)
})
function adicionarCliente(cliente, index){
    
    const pasta = document.createElement('div');
    pasta.classList.add('pasta');
    pasta.id = cliente.nome + "_" + index;
    
    pasta.innerHTML = `
        <div class="pasta_cabecalho">
            <h1>${cliente.nome}</h1>
            <button class="botao_deletar" title="Excluir cliente">
            <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
        <div class="pasta_interna">
            <h3>${cliente.nome}</h3>
            <p><strong>Telefone:</strong> ${cliente.telefone}</p>
            <p><strong>Entrada (R$):</strong> ${cliente.entrada}</p>
            <p><strong>Preço (R$):</strong> ${cliente.preco}</p>
            <p><strong>Peça:</strong> ${cliente.peca}</p>
            <p><strong>Observações:</strong> ${cliente.obs}</p>
        </div> 
    `;
    const pastaMae = document.getElementById("pastas_clientes");
       pastaMae.appendChild(pasta);

       nomeCliente.value = "";
       telefoneCliente.value = "";
       valorEntrada.value = "";
       valorFinal.value = "";
       pecaProduzida.value = "";
       observacoes.value = "";

      pasta.addEventListener('click', function(event){
        pasta.classList.toggle('aberta');
      })
      const botaoDeletar = pasta.querySelector('.botao_deletar');
    botaoDeletar.addEventListener('click', function(event){
        event.stopPropagation();
        if (confirm(`Deletar a pasta ${cliente.nome}?`)){
            pastas.splice(index, 1);
            localStorage.setItem("pastas", JSON.stringify(pastas));
            pasta.remove();

            location.reload();
        }
    });

    }
    
    
    //
   //const delete = document.getElementById("")
    //function deletarCliente(cliente){

    //}

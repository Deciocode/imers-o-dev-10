let cardContainer = document.querySelector(".card-container");
let searchInput = document.querySelector("input[type='text']");

let dados = [];

async function fetchData() {
  if (dados.length === 0) {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
  }
}

function iniciarBusca() {
  let termoBusca = searchInput.value.toLowerCase();
  let dadosFiltrados = dados.filter(dado => 
    dado.nome.toLowerCase().includes(termoBusca) || 
    dado.descricao.toLowerCase().includes(termoBusca)
  );
  renderizarCards(dadosFiltrados);
}

function renderizarCards(dadosParaRenderizar){
  cardContainer.innerHTML = ""; // Limpa o container antes de renderizar
  for(let dado of dadosParaRenderizar)  {
    let article = document.createElement("article");
    article.classList.add("card");  
    article.innerHTML = `
      <h2>${dado.nome}</h2>
      <p>${dado.data_criacao}</p>
      <p>${dado.descricao}</p>
      <a href="${dado.link}" target="_blank">Saiba mais</a>
    `;
    cardContainer.appendChild(article);
  }
}

// Inicia o carregamento dos dados assim que o script é carregado
fetchData(); 
// Arquivo responsavel por trazer a inteligencia do resto do site
// Por convençao, declara-se uma variavel que faz referencia a um elemento da pagina (no caso um botao) utilizando o cifrão na frente.
const key = '73850fdb';
const $searchButton = document.getElementById('search-button');
const overlay = document.getElementById('modal-overlay');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('movie-year');
const movieListContainer = document.getElementById('movie-list');
const removeButton = document.getElementsByClassName('.remove-button');

//let movieList = [];  Assim nao se relaciona com os dados salvos no navegador
let movieList = JSON.parse(localStorage.getItem('listaFilmes'));

if (movieList === null || movieList === undefined) {
	movieList = [];
}

/* Eu poderia escrever as operacoes acima assim: let movieList = JSON.parse(localStorage.getItem('listaFilmes')) ?? []; 
o simbolo ?? representa o operador de coalecencia nula. Isso significa que caso o cara da esquerda seja nulo ou undefined, ele retorna essa lista vazia []. 

*/

//A funçao ABAIXO FAZ A REQUISIÇAO PARA A API do OMDBAPI.
//A funçao é chamada ao clicar no botao de pesquisa

async function searchButtonClickHandler() {
	//async de assincrona. Por causa do await pro fetch e pro json
	try {
		/* let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieName.value.split(' ').join('+')}&y=${movieYear.value}`;  ESSE É O CODIGO MARRETADO para tratar os valores do input para usar na api. OS VALORES VIRÃO POR FUNÇÕES*/

		let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}&y=${movieYearParameterGenerator()}`;
		const response = await fetch(url); // api fetch é um recurso js pra fazer requisiçoes para uma api. Precisa esperar a requisiçao ser atendida para ter uma resposta. por isso o await. A resposta sao varios dados numa url, que sao tratados na variavel data. O await diz que é preciso esperar o fetch(url) trazer os dados para inserir na variavel url. (leia da direita para a esquerda)
		const data = await response.json(); // data pega os dados necessarios da response, sem as informaçoes adicionais que nao nos interessam. O await diz que tem que esperar a resposta em json para atribuir os valores a variavel data
		console.log('data:', data);

		if (data.Error) {
			throw new Error('Filme não encontrado');
		}
		console.log('data.imdbID: ', data.imdbID);

		createModal(data); // chamando funcao do arquivo modal.js com argumento currerntMovie vindo da api
		overlay.classList.add('open-overlay');
	} catch (error) {
		notie.alert({
			type: 'error',
			text: error.message,
		}); // utilizando a biblioteca notie e suas propriedades. notie.alert é um objeto. consultar documentaçao no npm notie
	}
}

function movieNameParameterGenerator() {
	if (movieName.value === '') {
		throw new Error('O nome do filme deve ser informado');
	}
	let nameParameter = movieName.value
		.split(' ') // // cria um array de estrings separados onde tem espaços vazios
		.join('+'); // depois junta com o +
	return nameParameter;
}

async function loadMoviesFromJSON() {
	try {
		const response = await fetch('./API_catalogoFilmes.json');
		const data = await response.json();

		const movies = Array.isArray(data) ? data : [data];

		movies.forEach((movie) => updateUI(movie));
	} catch (error) {
		console.error('Erro ao carregar filmes:', error);
	}
}

function movieYearParameterGenerator() {
	if (movieYear.value === '') {
		return '';
	} else if (movieYear.value.length !== 4 || isNaN(movieYear.value)) {
		throw new Error('Ano do filme inválido');
	} else {
		return movieYear.value;
	}
}

function addMovieToList(movieObject) {
	movieList.push(movieObject);
}

function updateUI(movieObject) {
	movieListContainer.innerHTML += `<article id= movie-card-${movieObject.imdbID}>
			<img src="${movieObject.Poster}" 
			alt="Poster do filme ${movieObject.Title}"
			> 
			<button class="remove-button" onclick="{removeFilmFromList('${movieObject.imdbID}')}">
				<i class="bi bi-trash"></i>remover da lista
			</button>
		</article> `;
}

function removeFilmFromList(id) {
	notie.confirm({
		text: 'Deseja remover o item de sua lista?',
		submitText: 'Sim',
		cancelText: 'Não',
		position: 'top',
		submitCallback: function removeMovie() {
			movieList = movieList.filter((movie) => movie.imdbID !== id);
			document.getElementById(`movie-card-${id}`).remove();
			updateLocalStorage(); //chama a funcao para armazenar os dados no navegador
		},
	});
}

function updateLocalStorage() {
	localStorage.setItem('listaFilmes', JSON.stringify(movieList)); // localSirage é um objeto proprio do javascript. setItems pede uma chave (nome onde o valor vai ser armazenado e um valor. No exemplo a chave listaFilmes vai armazenar o valor convertido em texto pelo JSON do movieList, que é um array com varios objetos. Para destransformar depois, usa-se o metodo parse, que extrai uma informaçao de um texto. Como o JSON armazena os arquivos em objetos, o parse retorna um objeto de uma string)
}

for (const movieInfo of movieList) {
	updateUI(movieInfo);
}

$searchButton.addEventListener('click', searchButtonClickHandler);

document.addEventListener('DOMContentLoaded', () => {
	loadMoviesFromJSON();
});

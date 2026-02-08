// Arquivo responsavel por trazer a inteligencia do modal (article). Como o botao de pesquisa que abriria o modal nao faz parte do modal, esntao essa inteligencia fica no arquivo script.js

const background = document.getElementById(
	'modal-background'
);
const modalContainer = document.getElementById(
	'modal-container'
);

let currentMovie = {};

function backgroundClickHandler() {
	overlay.classList.remove('open-overlay');
}

function addCurrentMovieToList() { // funçao que chama varias funçoes, chamada pelo botao adicionar filme
	if (isTheSameMovie(currentMovie.imdbID)) {	 //avaliando se o filme ja esta na playlist pela funcao IsTheSameMovie(id). retorna verdadeiro se estiver e falso se nao. se for verdadeiro interrompe a funçao no return
		notie.alert({
			type: 'error',
			text: 'Filme ja está na sua playlist'
		})
		return //retorna para interromper a funçao caso o filme ja esteja na playlist e nao adicionar de novo
	}
	//caso o if acima seja falso:
	addMovieToList(currentMovie);
	updateUI(currentMovie);
	updateLocalStorage(); //Atualiza o armazenamento local do navegador
	overlay.classList.remove('open-overlay');
}

/* Como eu fiz o codigo Para saber se o filme ja estava na lista. funcionou mas está bem mais complexo. 
A funçao era chamada pelo onclick do botao do modal no html mais abaixo

function isTheSameMovie() {
	try {
		if (movieList.length === 0) {
			addCurrentMovieToList();
		} else {
			for (const movie of movieList) {
				if (
					movie.imdbID !== currentMovie.imdbID
				) {
					addCurrentMovieToList();
					break;
				}
				throw new Error(
					'Este filme já está adicionado na lista'
				);
			}
		}
	} catch (error) {
		notie.alert({
			type: 'warning',
			text: error.message,
		});
	}
} */

//Como Dani fez a funçao para ver se o filme ja estava na lista
function isTheSameMovie(id) {  //funcao que recebe o currentMovie.imdbID como argumento
	function isMovieOnList(movieObject) {	// essa funçao de callback é chamadada no metodo find dentro da funcao principal. Ela so acontece aqui dentro do isTheSameMovie.  O argumento é preenchido automaticamente pelo js, sendo o movieObject cada elemento da lista (movieList.find(isMovieOnList))
		return movieObject.imdbID === id // retorna verdadeiro caso o movieObject.imdbID esteja na lista e undeffined caso nao esteja
	}
	return Boolean(movieList.find(isMovieOnList)) //força um retorno boolean na variavel. true == true e undeffined == false. 
}

//O HTML abaixo foi recortado do modal-container, e inserido no arquivo javascript pela propriedade .innerHTML da variavel modalContainer(que faz referencia ao modal-container) e entre a string template (``)
function createModal(data) {
	currentMovie = data; //o currentMovie é passado como argumento em varias funçoes, recebendo o data(que é um parametro de varias funçoes do codigo). A variavel currentMovie recebe os valores do data quando o botao search-button é clicado, e o data é declarado como a resposta da requisiçao da api. Apos a var data ser declarada, a funcao creatModal é chamada dentro da funcao que o data se encontra, e passando ela como argumento> Dentro do creatModal, após esse fluxo, o currentMovie recebe os valores de data.

	modalContainer.innerHTML = `<h2 id="movie-title">${data.Title} - ${data.Year}</h2>
	<section id="modal-body">
	<img id="movie-poster" src="${data.Poster}"
	alt="Poster do Filme."/>
	<div id="movie-info">
	<h3 id="movie-plot"> 
	"${data.Plot}"
	</h3>
	<div id="movie-cast">
	<h4>Elenco: </h4>
	<h5> " ${data.Actors}"</h5>
	</div>
	<div id="movie-genre">
	<h4>Genero:</h4>
	<h5> "${data.Genre}"</h5>
	</div>
	</div>
	</section>
	<section id="modal-footer"> 
	<button id="add-to-list" onclick='{addCurrentMovieToList()}'>Adicionar a lista</button>
	</section>`;
}

// 'qual o evento', qual comportamento deve dedicar a esse evento
background.addEventListener(
	'click',
	backgroundClickHandler
);

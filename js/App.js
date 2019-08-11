// OGÓLNA FUNKCJA

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');
  
  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);
  
  	return element;
}

// TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

// DODAWANIE KOLUMN DO TABLICY
board.createColumn(todoColumn);
board.createColumn(doingColumn);
board.createColumn(doneColumn);

// TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('Nowe zadanie');
var card2 = new Card('stworzyc tablice kanban');

// DODAWANIE KART DO KOLUMN
todoColumn.createCard(card1);
doingColumn.createCard(card2);

//zmienne do komunikacji z API
var baseUrl ='http://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': 'X-Client-Id',
	'X-Auth-Token': 'X-Auth-Token'
};

//funkcja z zapytaniem o zasób tablicy
fetch(baseUrl + '/board', {headers: my Headers})
	.then(function(resp) {
		return resp.json();
	})
	.then(function(resp) {
		setupColumns(resp.columns);
	});

//tworzenie kolumn
function setupColumns(columns) {
	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

//tworzenie kart
function setupCards(col, cards) {
	cards.forEach(function(card) {
		var cardObj = new Card(card.id, card.name);
		col.addCard(cardObj);
	});
}
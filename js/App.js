// OGÓLNA FUNKCJA

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');
  
  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);
  
  	return element;
}

//zmienne do komunikacji z API
var baseUrl ='http://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': 4270,
	'X-Auth-Token': '5ad1530c2b85052703d9adb41b90b56a',
};

//funkcja z zapytaniem o zasób tablicy
fetch(baseUrl + '/board', {headers: myHeaders})
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
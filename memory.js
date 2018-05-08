var cards = ["ciri.png","geralt.png","jaskier.png","jaskier.png","iorweth.png","triss.png","geralt.png","yen.png","ciri.png","triss.png","yen.png","iorweth.png"];

cards.sort(function() {
	return .5 - Math.random();
});

for (let i = 0; i<cards.length; i++) {
	document.getElementById('c'+i).addEventListener("click", function() { revealCard(i) });	
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

function revealCard(nr)
{
	var opacityValue = $("#c"+nr).css('opacity');
	
	if(opacityValue != 0 && lock == false)
	{
		lock = true;
		
		var obraz = "url(img/" + cards[nr] + ")";
		
		$('#c' + nr).css('background-image', obraz);
		$('#c' + nr).addClass('cardA');
		$('#c' + nr).removeClass('card');

		if(oneVisible == false)
		{		
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{			
			if(cards[nr] == cards[visible_nr])
			{
				setTimeout(function() { hide2Cards(nr, visible_nr) }, 750);			
			}
			else
			{
				setTimeout(function() { restore2Cards(nr, visible_nr) }, 1000);			
			}
				

			turnCounter++;
			$('.score').html('Turn counter: ' + turnCounter);
			oneVisible = false;
		}
	}	
}

function hide2Cards(nr1, nr2)
{
	$('#c' + nr1).css('opacity', '0');
	$('#c' + nr2).css('opacity', '0');
	
	pairsLeft--;
	
	if(pairsLeft == 0)
	{
		$('.board').html('<h1>You win!<br>Done in '+turnCounter+' turns</h1>');
	}
	
	lock = false;
}

function restore2Cards(nr1, nr2)
{
	restoreCard(nr1);
	restoreCard(nr2);
	
	lock = false;
}

function restoreCard(nr)
{
	$('#c' + nr).css('background-image', 'url(img/empty-card.png)');
	$('#c' + nr).addClass('card');
	$('#c' + nr).removeClass('cardA');
}

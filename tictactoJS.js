var flg 		=1,
	flgsingle 	=0,
	cells 		=document.getElementsByClassName("cell"),
	scores 		=[0,0,0];

$(document).ready(function(){
	resetGame();

	$("#reset").click(function(){
		scores=[0,0,0];
		resetGame();
	});
	$("#switchmode").click(function(){
		scores=[0,0,0];
		$(".cell").text("");
		if(flgsingle==0){
			$(this).text("2-Player Mode");
			flgsingle=1;
			$("#turn").hide();
		}
		else{
			$(this).text("Single Player Mode");
			flgsingle=0;
			$("#turn").show();
			flg=1;
		}
		updateScores();
	});

	$("#help1").click(function(){
		alert("Place ur icons such that they are 3 in a row/column/diagonal to win. Try to prevent your opponent from scoring")
	});

	$(".cell").click(function(){

		var elem=$(this);
		if(flgsingle==0){
			if(elem.text()==""){
				
				if(flg==1){
					flg=2;
					$("#turn").text("Player"+flg+"'s turn");
					elem.text("X");
				}
				else {
					flg=1;
					$("#turn").text("Player"+flg+"'s turn");
					elem.text("O");
				}

				var check=checkWin();
				if(check!=0){

					(check==3) ? alert("Tie") : alert("Player "+check+" Wins");
					scores[check-1]++;
					resetGame();
					
				}
			}
		}
		else{
			  if(elem.text()==""){
			  	elem.text("X");
			  	var check=checkWin();
				if(check!=0){

					if(check==3)alert("Tie"); 
					else if(check==2)alert("You Lose"); 
					else if(check==1)alert("you Win");

					scores[check-1]++;
					resetGame();

				}
				else{
					AIturn();
				}
				
			  }

			}
		
	});
});

function AIturn(){
	cells=document.getElementsByClassName("cell");
	slot=findBestMove();
	cells[slot].innerText="O";
	var check=checkWin();
	if(check!=0){

	if(check==3)alert("Tie"); 
	else if(check==2)alert("You Lose"); 
	else if(check==1)alert("you Win");

	scores[check-1]++;
	resetGame();
	updateScores();

	}
}

function findBestMove(){
	var temp=new Array(),i,j,k;
	for(i=0;i<9;i++){
		temp[i]=cells[i].innerText;
	}
	for(i=0;i<9;i++){
		if(temp[i]!="O"&&temp[i]!="X"){
			temp[i]="O";
			if(checkPossibility(temp)==2)return i;
			else temp[i]="";
		}
	}
	for(i=0;i<9;i++){
		if(temp[i]!="O"&&temp[i]!="X"){
			temp[i]="X";
			if(checkPossibility(temp)==1)return i;
			else temp[i]="";
		}
	}	
	
	j=parseInt((Math.random()*999)%8); 
	i=0;
	k=0;
	while(true){
		if(temp[i]!="O"&&temp[i]!="X"){
			k++;
		}
		if(k==j)return i;
		i++;
		if(i==9)i=0;

	}
}

function checkPossibility(temp){
	var arr=new Array();
	arr.push(temp[0]+temp[1]+temp[2]);
	arr.push(temp[3]+temp[4]+temp[5]);
	arr.push(temp[6]+temp[7]+temp[8]);

	arr.push(temp[0]+temp[3]+temp[6]);
	arr.push(temp[1]+temp[4]+temp[7]);
	arr.push(temp[2]+temp[5]+temp[8]);

	arr.push(temp[0]+temp[4]+temp[8]);
	arr.push(temp[6]+temp[4]+temp[2]);

	return checkArray(arr);
}

function checkWin()
{
	
	var arr=new Array();
	cells=document.getElementsByClassName("cell");
	arr.push(cells[0].innerText+cells[1].innerText+cells[2].innerText);
	arr.push(cells[3].innerText+cells[4].innerText+cells[5].innerText);
	arr.push(cells[6].innerText+cells[7].innerText+cells[8].innerText);
	
	arr.push(cells[0].innerText+cells[3].innerText+cells[6].innerText);
	arr.push(cells[1].innerText+cells[4].innerText+cells[7].innerText);
	arr.push(cells[2].innerText+cells[5].innerText+cells[8].innerText);

	arr.push(cells[0].innerText+cells[4].innerText+cells[8].innerText);
	arr.push(cells[6].innerText+cells[4].innerText+cells[2].innerText);


	return checkArray(arr);
	
}

function checkArray(arr){
	var l=0;
	for(var i=0; i<arr.length; i++)
	{
		if(arr[i]=="OOO")
		{
			return 2;
		}
		if(arr[i]=="XXX")
		{
			return 1;
		}
		
		if(arr[i].length==3)l++;
		if(l==8)
		{
			return 3;
		}


	}

	return 0;
}

function updateScores()
{
	document.getElementById("score1").innerText=" X  Player1 : "+scores[0];
	if(flgsingle==0){
		document.getElementById("score2").innerText=" O  Player2 : "+scores[1];
	}
	else{
		document.getElementById("score2").innerText=" O  Computer : "+scores[1];
	}
	document.getElementById("score3").innerText="Tie : "+scores[2];

}

function resetGame()
{
	$(".cell").text("");
	var gamecount=scores[0]+scores[1]+scores[2];
	
	if(gamecount%2==0){
		
		flg=1;
	}
	else{

		flg=2;
		if(flgsingle==1) cells[4].innerText="O";

	}

	$("#turn").text("Player"+flg+"'s turn");
	updateScores();
}

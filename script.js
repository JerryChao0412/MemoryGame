
let tiles ; 
let tileId; 
let chance; 
let trueAns; 
 

let win = document.getElementById("win");
let end = document.getElementById("end"); 
let end_game = document.getElementById("end_game");
let fail = document.getElementById("fail");
let retry = document.getElementById("retry");
let point = document.getElementById('score');
let insert_form = document.getElementById('insert');

let level = 0;
let score = 0;
let player;
let stage = [3,4,5,6,7];
let ans = [4,5,7,10,13];


function game(){
    document.getElementById('start').style.display = '';
    end.style.display = 'none';
	fail.style.display = 'none';
	insert_form.style.display='none';
	let l = stage[level];
	tiles = ans[level];
    tilesNumber = l * l;
    create_tile(tilesNumber);
    let boardWidth = Math.sqrt(tilesNumber) * 90 + 16; //
    document.getElementById('board').style.width = `${boardWidth}px`;
    document.getElementById('board').classList.add('show');
    
	 document.getElementById('tiles').innerHTML= `Select : ${tiles}`;
        let allTiles = document.querySelectorAll(".tile");
        allTiles.forEach(item => item.addEventListener('click',function(){
            check_tile(Number(item.id));
            this.classList.add('hover');
        }));
}



function matrix() {
    document.getElementById('start').style.display = 'none'; 
     chance = 3;
     trueAns = tiles;
    
        setTimeout(function(){createTile()},200);
		
        setTimeout(function(){clear()},1500);
		
		setTimeout(function(){rotate()},2000);
}


function RandomTileNumber(max){
    return Math.floor(Math.random() * max);  
}    


function get_tile_Id(){
    let id = [];
    for(let i = 0 ; i < tiles ; i++){
    let tile_id = RandomTileNumber(tilesNumber);
	if(!id.includes(tile_id))
		id[i] = tile_id;
	else
		i--;
    }
    return id;
}

function createTile(){
   tileId = get_tile_Id();
    for(let i = 0 ; i < tileId.length ; i++){
           let square = document.getElementById(tileId[i]);
           square.classList.add('hover');
    }  
}


function check_tile(num){
    
    let correct = tileId.indexOf(num);
    let clickedTile = document.getElementById(num);
    if(!clickedTile.classList.contains('hover')){
    if(correct >= 0){
        clickedTile.querySelector('.back').style.backgroundColor = "green";
        trueAns--;
        score += 50;
		point.innerHTML=`Point : ${score}`;
        if(trueAns == 0){
			
            end.style.display = "block";
            win.style.display = "block";
            
        }
    }else{
        clickedTile.querySelector('.back').style.backgroundColor = "red";
        chance--;
        score -= 100;
		point.innerHTML=`Point : ${score}`;
        if(chance == 0){
            fail.style.display = "block";
            retry.style.display = "block";
            
        }
		if (score < 0)
			lose();
    }  
}
}



function clear(){
    
    var hoverTiles = document.querySelectorAll(".hover");
    hoverTiles.forEach(item => {
        item.classList.remove('hover');
        item.querySelector('.back').removeAttribute('style');
    });

}


function create_tile(n){
    for(let i = 0 ; i < n ; i++){
            let block = document.createElement("div");
            block.id = i;
            block.className = "tile";
            let flipper = document.createElement('div');
            flipper.className = "flipper";
            let front = document.createElement('div');
            front.className = "front";
            let back = document.createElement("div");
            back.className = "back";
            flipper.appendChild(front);
            flipper.appendChild(back);
            block.appendChild(flipper);
            document.querySelector('.matrix').appendChild(block); 
    }
}
function remove_game(){
    let block = document.querySelectorAll('.tile');
    for(let i = 0 ; i < block.length ; i++){
        document.querySelector('.matrix').removeChild(block[i]);
    }
    document.getElementById('board').classList.remove('show');
    document.getElementById('game').style.opacity = '1';
	
	let rotate = document.querySelectorAll(".matrix");
    rotate.forEach(item => {
        item.classList.remove('rotate');
    });
}

function play_sound(){
	let sound = document.getElementById("win_sound");
	sound.play();
}
	

function nextLevel(){
	if(level < 7){
	play_sound();
	level++;
	remove_game();
	game();
	}else{
		remove_game();
		game();
	}
}

function lose(){
	remove_game();
	window.alert("Game Over!");
	game_reset();

}

function finish(){
	remove_game();
	insert();
	game_reset();

}

function retry_game(){
	remove_game();
	game();
}

function rotate(){
	let rotate = document.getElementById("rotate");
	rotate.classList.add('rotate');
}

function restart(){
	let r = confirm("Are you sure to restart?");
  if (r == true) {
    game_reset();
	retry_game();
  } 
}

function game_reset(){
	score = 0;
	level = 0;
	point.innerHTML=`Point : ${score}`;
}

function insert() {
  let person = prompt("Please enter your name:", "Player");
  if (person == null || person == "") {
    player = "Player";
  } else {
    player = person;
  }
  
  document.getElementById("Name").value= player.toString();
  document.getElementById("Score").value = score;
  send("Name="+player+"&Score="+score);
  
}

function send(params) {
    var httpc = new XMLHttpRequest(); 
    var url = "insert.php";
    httpc.open("POST", url, true);

    httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   

    httpc.onreadystatechange = function() { 
        if(httpc.readyState == 4 && httpc.status == 200) { 
        
        }
    };
    httpc.send(params);
}

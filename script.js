
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const size = 30;
const buttons = document.querySelectorAll('button');
const reload = document.getElementById('reload')
const playground = canvas.getBoundingClientRect();
console.log(playground)
// Sélection joueur
let value = '';
buttons.forEach(button =>{
    button.addEventListener('click', () => {
        if(button.value == 'circle'){   
            localStorage.setItem('value' , value)
         return value = "circle";
        }
        else{
            localStorage.setItem('value' , value)
         return value = 'cross';
        }
     })
     
})



//Refresh la page
reload.addEventListener('click', () =>{
    window.location.reload();
})


value = localStorage.getItem('value')



// Déssiner un rond
function drawCircle(xPos, yPos){
    context.linewidth = 10;
    context.strokeStyle = "#DCD6F7";

    context.beginPath();
    
    context.arc(xPos, yPos, size, 0, 2 * Math.PI);
    
    context.stroke();
}

// Déssiner une croix
function drawCross(xPos, yPos){
    context.linewidth = 10;
    context.strokeStyle = "#A6B1E1";
    context.beginPath();
    context.moveTo(xPos - size, yPos - size);
    context.lineTo(xPos + size , yPos  + size);
    context.stroke();
    
    context.beginPath();
    context.moveTo(xPos + size, yPos - size);
    context.lineTo(xPos - size, yPos + size);
    context.stroke();
}


// Déssiner la grille de jeu
function drawGrid(){
    context.linewidth = 10;
    context.lineCap = "round";
    context.strokeStyle = "#985F6F";

    let widthSquare = playground.width;
    let heightSquare = playground.height;
    let leftSquare = playground.left;
    let topSquare = playground.top;

    let lineLength = 300;
    
    context.beginPath();

    for (let i = 1; i <= 2; i++){
        context.moveTo(100, i*100 + 100);
        context.lineTo(lineLength + 100, i*100 + 100);
    }

    for (let j = 1; j <= 2; j++){
        context.moveTo(j*100 + 100, 100);
        context.lineTo(j*100 + 100, lineLength + 100);
    }
        
    context.stroke();
}

canvas.addEventListener('click', (e) => {
    
    const x = e.clientX - playground.left;
    const y = e.clientY - playground.top;
    if(value === 'circle'){
        drawCircle(x, y);
    }else{
        drawCross(x, y);
    }
    
    
})

drawGrid();




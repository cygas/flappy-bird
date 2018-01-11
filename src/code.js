window.addEventListener("load", function () {

    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");

    let bird = new Image();
    let bg = new Image();
    let fg = new Image();
    let pipeNorth = new Image();
    let pipeSouth = new Image();

    bird.src = "images/bird.png";
    bg.src = "images/bg.png";
    fg.src = "images/fg.png";
    pipeNorth.src = "images/pipeNorth.png";
    pipeSouth.src = "images/pipeSouth.png";

    let gap = 85;
    let bX = 10;
    let bY = 150;
    let gravity = 1.7;
    let score = 0;
    
    //audio
    let fly = new Audio();
    let scor = new Audio();
    
    fly.src = "sounds/fly.mp3";
    scor.src="sounds/score.mp3";
    
    
    //on key down
    
    document.addEventListener("keydown", moveUp);
    function moveUp(event) {
        if (event.keyCode === 38) {
            bY -= 27;
            fly.play();
        }
    }
    
    //pipe coordinates
    let pipe = [];
    pipe[0] = {
        x: cvs.width,
        y: 0
    };

    
    // draw images

    function draw() {
        ctx.drawImage(bg, 0, 0);
        
        for(let i=0; i<pipe.length;i++){
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+pipeNorth.height + gap);
            pipe[i].x--;
            if(pipe[i].x === 125){
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                });
            }
            //detect collision
            if(bX+bird.width >=pipe[i].x && bX<=pipe[i].x+pipeNorth.width && (bY<=pipe[i].y+pipeNorth.height||bY+bird.height>=pipe[i].y+pipeNorth.height+gap )||bY+bird.height>=cvs.height - fg.height){
                location.reload();
            }
            if(pipe[i].x === 5){
                score++;
                scor.play();
            }
        }        
        
        ctx.drawImage(fg, 0, bg.height - fg.height);
        ctx.drawImage(bird, bX, bY);

        bY += gravity;
        ctx.fillStyle = "#000";
        ctx.font = "28px Verdana";
        ctx.fillText("Score: " + score, 10, cvs.height - 20);


        requestAnimationFrame(draw);
    }
    draw();
    
    /*
     bg.onload = function() {
     ctx.drawImage(bg, 0, 0);
     ctx.drawImage(pipeNorth, 100, 0);
     ctx.drawImage(pipeSouth, 100, pipeNorth.height + gap);
     ctx.drawImage(fg, 0, bg.height - fg.height);
     ctx.drawImage(bird, bX, bY);
     
     bY += gravity;
     
     requestAnimationFrame(this);
     };
     */


});
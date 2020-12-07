var redball;
var database, position;
function setup(){
    createCanvas(500,500);
    database=firebase.database();
    console.log(database);
    redball = createSprite(250,250,10,10);
    redball.shapeColor = "red";
    var redballPosition=database.ref('ball/position');
    redballPosition.on('value',readPosition);
}

function draw(){
    background("white");
    if (position!==undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-10,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(10,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-10);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+10);
        }
        drawSprites();
    }
}

function changePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    })

}

function readPosition(data){
    position=data.val();
    redball.x=position.x;
    redball.y=position.y;
}

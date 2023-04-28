var interval
var ctx = document.getElementById("canvas").getContext("2d");

var texture = "Texture: 1";
texture = localStorage.getItem("navicella");
var nav = "IMMAGINI/GAME/" + texture + ".png";
//alert(texture)

var munizioni = document.getElementById("munizioni");
var img_munizioni;
var arrayMunizioni = new Array();

for (var i = 0; i < 27; i++) {
    img_munizioni = document.createElement("img");
    img_munizioni.draggable = false;
    munizioni.appendChild(img_munizioni);
    $(img_munizioni).addClass("imgAmmo");
    img_munizioni.src = "IMMAGINI/GAME/munizioni.png";
    arrayMunizioni.push(img_munizioni);
}

var life = 3;

function GameObject(x, y, img, src) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.src = src;
    this.active = true
}
GameObject.prototype.draw = function (ctx) {
    this.active && ctx.drawImage(this.img, this.x, this.y, 40, 40) //dimensione mostri
}
GameObject.prototype.move = function (dx, dy) {
    this.x += dx; this.y += dy
}
GameObject.prototype.fire = function (dy) {
    return new Shot(this.x + 20, this.y + 20, dy)
}
GameObject.prototype.isHitBy = function (shot) {
    function between(x, a, b) { return a < x && x < b }
    return this.active && between(shot.x, this.x, this.x + 40) && between(shot.y + 10, this.y, this.y + 20)
}
function Shot(x, y, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy;
}
Shot.prototype.move = function () {
    this.y += this.dy
    return this.y > 0 && this.y < 600
}
Shot.prototype.draw = function (ctx) {
    ctx.fillStyle = '#555'
    ctx.fillRect(this.x - 1, this.y, 3, 20)
}
var invaderDx = -5
var invaders = []
var cannon = new GameObject(300, 440, document.getElementById("cannon"), nav)
console.log(cannon.src);
var invaderShot, cannonShot

function init() {
    var img = document.getElementById("invader")
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 8; x++) {
            invaders.push(new GameObject(50 + x * 50, 20 + y * 50, img))
        }
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height) //disegna il riquadro
    invaders.forEach(inv => inv.draw(ctx))
    cannon.draw(ctx)
    invaderShot && invaderShot.draw(ctx) //disegna lo sparo degli invasori
    cannonShot && cannonShot.draw(ctx) //disegna lo sparo della navicella
}

function move() {
    var leftX = invaders[0].x, rightX = invaders[invaders.length - 1].x
    if (leftX <= 20 || rightX >= 585) invaderDx = -invaderDx //movimento laterale mostri
    invaders.forEach(inv => inv.move(invaderDx, 0.5))
    if (invaderShot && !invaderShot.move()) {
        invaderShot = null
    }
    if (!invaderShot) {
        var active = invaders.filter(i => i.active)
        var r = active[Math.floor(Math.random() * active.length)]
        invaderShot = r.fire(20) //l'invasore spara il proiettile
    }
    if (cannonShot) {
        var hit = invaders.find(inv => inv.isHitBy(cannonShot))
        if (hit) {
            hit.active = false
            cannonShot = null
        } else {
            if (!cannonShot.move()) cannonShot = null
        }
    }
}

function isGameOver() {
    var topX = invaders[0].y;
    return (cannon.isHitBy(invaderShot) && life == 0) || (topX >= 315) || (arrayMunizioni.length == 0);
}
function game() {
    move()
    draw()

    if (isGameOver()) {
        clearInterval(interval);
        restartGame();
    }

    else if (cannon.isHitBy(invaderShot)) {
        life = life - 1;
        var arrayVite = document.getElementsByClassName("imgLife");
        arrayVite[life].src = "IMMAGINI/GAME/vitaPersa.png";
    }


}

function start() {
    init()
    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 65 && cannon.x > 40) cannon.move(-20, 0)
        if (e.keyCode == 68 && cannon.x < 580) cannon.move(20, 0)
    });

    document.addEventListener("mousedown", function(e){
        console.log(e.mousedown)
        cannonShot = cannon.fire(-30); //posizione di partenza del proiettile = -30
        munizioni.removeChild(arrayMunizioni[arrayMunizioni.length - 1]);
        arrayMunizioni.pop();
    })
    
    interval = setInterval(game, 50)
}

function restartGame() {
    canvas.style.opacity = "0.2";
    canvas.style.transition = "1.5s";
    var restart = document.createElement("a");
    document.body.appendChild(restart);
    restart.innerHTML = "RIGIOCARE ";
    restart.style.color = "white";
    restart.style.opacity = "1";
    restart.style.position = "absolute";
    restart.style.top = "48%";
    restart.style.left = "48%";
    restart.style.zIndex = "2";
    restart.style.fontWeight = "bold";
    restart.href = "gamePage2.html"
}


window.onload = start





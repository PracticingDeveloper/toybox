//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;
//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(1000,600);


stage.updateLayersOrder = function () {
    stage.children.sort(function(a,b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex
    });
};

renderer.backgroundColor = 0xFFFFFF;
document.body.appendChild(renderer.view);

var t = new Tink(PIXI, renderer.view);
var b = new Bump(PIXI);

var pointer = t.makePointer();

var space  = keyboard(32);

var paintColor = 0xFF0000;

var rectangle;  

setup()
gameLoop();

function circle(color) {
  var c = new PIXI.Graphics();

  c.color = color;
  c.beginFill(color);
  c.lineStyle(2, 0x000000);
  c.drawCircle(30, 30, 30);
  c.circular = true;

  t.makeInteractive(c);

  c.press = function() {
    paintColor = this.color;
    updateRectangle();
  }
  
  return c;
}

function updateRectangle() {
  rectangle.clear();

  rectangle.beginFill(paintColor);
  rectangle.lineStyle(2, 0x000000);
  rectangle.drawRect(0, 0, 300, 300);

  rectangle.position.set(200,30);

}

function setup() {
   rectangle = new PIXI.Graphics();

   updateRectangle();

   var redCircle   = circle(0xFF0000);
   var greenCircle = circle(0x00FF00);
   var blueCircle  = circle(0x0000FF);

   redCircle.position.y = 60;
   redCircle.position.x = 60;

   greenCircle.position.y = 150;
   greenCircle.position.x = 60;

   blueCircle.position.y = 240;
   blueCircle.position.x = 60;

   stage.addChild(redCircle);
   stage.addChild(greenCircle);
   stage.addChild(blueCircle);
   stage.addChild(rectangle);
}

function gameLoop() {
  id = requestAnimationFrame(gameLoop);
  t.update();

  renderer.render(stage);
}
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
var circle = new PIXI.Graphics();

setup()
gameLoop();

function setup() {
   circle.beginFill(colors[colorIndex]);
   circle.lineStyle(2, 0xFFFFFF);
   circle.drawCircle(60, 60, 30);
   
   stage.addChild(circle);
}

function updateCircle() {

}
function gameLoop() {
  id = requestAnimationFrame(gameLoop);
  t.update();

  renderer.render(stage);
}
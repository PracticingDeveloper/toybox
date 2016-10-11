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

function buildPurifierSupplyChain() {
  blue_crate   = buildCrate(600,340);



  var purifier_machine = buildMachine("blue", 400,400);
  machines.push(purifier_machine);

  var order   = buildOrder(purifier_machine, blue_crate);

  blue_crate.consume = buildConsumer(order);
  
  purifier_machine.worker.delay = 3000

  purifier_machine.addSupplyCrate(green_crate);

  _.times(3, function() { order.submit(); });
}

function gameLoop() {
  id = requestAnimationFrame(gameLoop);
  t.update();

  renderer.render(stage);
}
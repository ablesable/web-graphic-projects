import * as PIXI from 'pixi.js'

import fragment from './shader/fragment.glsl'
// console.log(fragment)


let image1 = require('./img/img.jpg')
let image2 = require('./img/img2.jpg')
let image3 = require('./img/img3.jpg')


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application(window.innerWidth, window.innerHeight,
    {
        autoResize:true
    });

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

// load the texture we need

let loader = app.loader;

loader.add('img0', image1);
loader.add('img2', image2);
loader.add('img3', image3);

let Filter = new PIXI.Filter(null, fragment)
// console.log(typeof(Filter))


Filter.apply = function(filterManager, input, output, clear){
    const matrix = new PIXI.Matrix();
    this.uniforms.mappedMatrix = filterManager.calculateNormalizedScreenSpaceMatrix(matrix);

   

    PIXI.Filter.prototype.apply.call(this, filterManager, input, output, clear);
};

loader.load((loader, resources) => {


    // This creates a texture from a 'bunny.png' image.
    const bunny = new PIXI.Sprite(resources.img3.texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    bunny.filters = [Filter]

    Filter.uniforms.uTextureOne = resources.img0.texture;
    Filter.uniforms.uTextureTwo = resources.img2.texture;
    Filter.uniforms.uTextureThree = resources.img3.texture;


    // Add the bunny to the scene we are building.
    app.stage.addChild(bunny);

    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        // bunny.rotation += 0.01;
    });
});
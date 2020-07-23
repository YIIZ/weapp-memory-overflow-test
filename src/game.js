import 'weapp-adapter/src/index'
import * as PIXI from 'pixi.js'
import { install } from '@pixi/unsafe-eval'
install(PIXI)

// fix pixi
// fix context undefined
global.WebGLRenderingContext = canvas.getContext('webgl').constructor
// fix autoResourceDetect
global.HTMLVideoElement = function () {}
global.HTMLImageElement = new Image().constructor
global.HTMLCanvasElement = canvas.constructor
// fix InteractionManager.prototype.mapPositionToPoint
canvas.parentElement = true

// console.log(typeof WebGLRenderingContext)
// console.log(PIXI.utils.isWebGLSupported())


window.PIXI = PIXI

async function main() {
  const files = Array.from({ length: 200 }).map((_, i) => `tex/${i}.png`)

  const app = new PIXI.Application({
    view: canvas,
    width: 750,
    height: 1224,
    backgroundColor: 0xDDDDDD,
  })
  window.app = app

  {
    const container = new PIXI.Container()
    app.stage.addChild(container)

    const s = new PIXI.Sprite(PIXI.Texture.WHITE)
    // s.tint = 0x000000
    s.width = 200
    s.height = 100
    container.addChild(s)

    const t = new PIXI.Text('Click to Start')
    container.addChild(t)

    container.interactive = true
    container.pointerdown = () => {
      console.log('start')
      app.stage.removeChildren()
      explode()
    }
    window.container = container
  }


  let i = 0
  // const createSprite = createSpriteWithCache
  const createSprite = createSpriteWithoutCache

  function explode() {
    // console.log(path)
    const file = files[i]
    if (!file) {
      console.log(`explode finished`)
      return
    }
    console.log(`explode sprite from ${file}`)
    const s1 = createSprite(file)
    s1.x = (i%2)*20
    s1.y = (i%2)*20
    app.stage.removeChildren()
    app.stage.addChild(s1)

    i += 1
    setTimeout(explode, 200)
  }

  // explode pure Image
  // window.imgs = []
  // function explode() {
  //   // Array.from({ length: 100 }).forEach(() => {
  //   //   const img = new Image()
  //   //   img.src = files[0]
  //   //   imgs.push(img)
  //   // })\
  //   console.log(`explode sprite ${i}`)
  //   const img = new Image()
  //   img.src = files[0]
  //   i += 1
  //   setTimeout(explode, 100)
  // }
}
main().catch(e => {
  console.error(`error ${e.message}`)
  throw e
})


function createSpriteWithCache(file) {
  return PIXI.Sprite.from(file)
}
function createSpriteWithoutCache(file) {
  const tex = new PIXI.Texture(new PIXI.BaseTexture(file))
  return new PIXI.Sprite(tex)
}



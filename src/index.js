/*
 * ゲーム
 */

/**
 * キーコード定義
 */
const KeyMap = {
  68: 'right', //D
  65: 'left',  //A
  87: 'up',    //W
  83: 'down'   //S
};

/**
 * 入力状態
 */
const InputState = {
  left: false,
  right: false,
  up: false,
  down: false
};

/**
 * Screen管理
 */
const ScreenState = {

  /**
   * 前回描画タイムスタンプ
   * 
   * @type {number}
   */
  lastRender: 0,

  /**
   * Canvas オブジェクト
   * 
   * @type {HTMLElement}
   */
  canvas: null,

  /**
   * Canvasの横幅
   * 
   * @type {number}
   */
  width: 0,

  /**
   * Canvasの縦幅
   * 
   * @type {number}
   */
  height: 0,

  /**
   * 2D Context
   * 
   * @type {CanvasRenderingContext2D}
   */
  ctx: null
};

/**
 * プレイヤー
 */
const Player = {
  position: {
    x: 0,
    y: 0
  },
  rotation: 0
};


/**
 * ゲーム状態の更新
 * 
 * @param {number} progress - 前回実行時からの差分
 */
function update(progress) {
  // プレイヤーの方向を更新
  updateRotation(progress);
  // プレイヤーの位置を更新
  updatePosition(progress);
}

/**
 * プレイヤーの方向を更新
 * 
 * @param {number} progress
 */
function updateRotation(progress) {
  const value = progress / 3;

  if (InputState.left) {
    Player.rotation -= value;
  } else if (InputState.right) {
    Player.rotation += value;
  }
}

/**
 * プレイヤーの位置を更新
 * 
 * @param {number} progress
 */
function updatePosition(progress) {
  const value = progress / 3;

  // 方向をもとに移動距離のx,y座標を算出
  const vector = {
    x: value * Math.cos((Player.rotation - 90) * (Math.PI/180)),
    y: value * Math.sin((Player.rotation - 90) * (Math.PI/180))
  };

  if (InputState.up) {
    Player.position.x += vector.x;
    Player.position.y += vector.y;
  } else if (InputState.down) {
    Player.position.x -= vector.x;
    Player.position.y -= vector.y;
  }

  // 衝突判定
  if (Player.position.x < 0) {
    Player.position.x = 0;
  } else if (Player.position.x > ScreenState.width) {
    Player.position.x = ScreenState.width;
  }
  if (Player.position.y < 0) {
    Player.position.y = 0;
  } else if (Player.position.y > ScreenState.height) {
    Player.position.y = ScreenState.height;
  }

}

/**
 * 描画関数
 */
function draw() {
  ScreenState.ctx.clearRect(0, 0, ScreenState.width, ScreenState.height);

  // プレイヤーの描画
  drawPlayer(ScreenState.ctx);
}

/**
 * プレイヤーの描画
 * 
 * @param {CanvasRenderingContext2D} ctx
 */
function drawPlayer(ctx) {
  ctx.save();

  ctx.translate(Player.position.x, Player.position.y);
  ctx.rotate((Math.PI/180) * Player.rotation);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(10, 10);
  ctx.lineTo(0, -20);
  ctx.lineTo(-10, 10);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

/**
 * ゲームループ
 * 
 * @param {number} timestamp
 */
function loop(timestamp) {
  const progress = timestamp - ScreenState.lastRender;

  if (progress > 10) {
    update(progress);
    draw();
    ScreenState.lastRender = timestamp;
  }
  
  window.requestAnimationFrame(loop);
}

/**
 * キー押下
 * 
 * @param {Event} event
 */
function keydown(event) {
  const key = KeyMap[event.keyCode];
  InputState[key] = true;
}

/**
 * キー解放
 * 
 * @param {Event} event
 */
function keyup(event) {
  const key = KeyMap[event.keyCode];
  InputState[key] = false;
}

/**
 * windowのresize
 */
function resize() {
  const width = window.innerWidth * 2;
  const height = window.innerHeight * 2;

  ScreenState.width = width;
  ScreenState.height = height;
  ScreenState.canvas.width = width;
  ScreenState.canvas.height = height;
}

/**
 * 初期化処理
 */
function initialize() {
  // 画面状態の取得
  ScreenState.canvas = document.getElementById("characters");
  ScreenState.ctx = ScreenState.canvas.getContext("2d");

  // 画面リサイズイベント
  window.addEventListener("resize", resize);
  resize();

  // プレイヤーの初期位置設定
  Player.position.x = ScreenState.width / 2;
  Player.position.y = ScreenState.height / 2;

  // キーイベント設定
  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);

  // 初回描画処理
  window.requestAnimationFrame(loop);
}

initialize();

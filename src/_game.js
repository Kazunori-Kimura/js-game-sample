/*
 * _game.js
 * 
 * gameの基本部分
 */

/**
 * 1マスの大きさ
 * 
 * @type {number}
 */
const BLOCK_SIZE = 30;

/**
 * Game基本情報
 */
const Game = {
  /**
   * 画面サイズ
   */
  screen: {
    width: 0,
    height: 0
  },
  /**
   * 描画レイヤー
   */
  layers: {},
  /**
   * 前回処理時間
   * 
   * @type {number}
   */
  lastRender: 0
};


/**
 * ユーザーの状態
 */
const state = {
  x: 0,
  y: 0,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  }
};

/**
 * 更新処理
 * 
 * @param {number} progress - 前回のレンダリングからの経過時間
 */
function update(progress) {
  if (state.pressedKeys.left) {
    state.x -= progress;
  }
  if (state.pressedKeys.right) {
    state.x += progress;
  }
  if (state.pressedKeys.up) {
    state.y -= progress;
  }
  if (state.pressedKeys.down) {
    state.y += progress;
  }

  // 衝突判定
  // TODO: state変更前にやる必要あり
  if (state.x > WIDTH) {
    state.x = WIDTH;
  }
  else if (state.x < 0) {
    state.x = 0;
  }
  if (state.y > HEIGHT) {
    state.y = HEIGHT;
  }
  else if (state.y < 0) {
    state.y = 0;
  }
}

/**
 * 描画処理
 */
function draw() {
  // 初期化
  layers.context.clearRect(0, 0, WIDTH, HEIGHT);

  // マーカー描画
  layers.context.fillStyle = "red";
  layers.context.fillRect(
    state.x - BLOCK_SIZE / 2,
    state.y - BLOCK_SIZE / 2,
    BLOCK_SIZE,
    BLOCK_SIZE);
}

/**
 * ブラウザの requestAnimationFrame から繰り返し呼ばれる処理
 * 
 * @param {number} timestamp - requestAnimationFrame から引き渡されるtimestamp
 */
function loop(timestamp) {
  const progress = timestamp - lastRender;

  update(progress);
  draw();

  if (progress < 2000) {
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  }
}

/**
 * キー押下
 */
function keydown(event) {
  const key = KeyMap[event.keyCode];
  state.pressedKeys[key] = true;
}

/**
 * キーはなす
 */
function keyup(event) {
  const key = KeyMap[event.keyCode];
  state.pressedKeys[key] = false;
}

/**
 * 初期化処理
 */
function init() {
  // キャンバス設定
  layers.canvas = document.getElementById("canvas");
  WIDTH = window.innerWidth * 2;
  HEIGHT = window.innerHeight * 2;
  layers.canvas.width = WIDTH;
  layers.canvas.height = HEIGHT;
  layers.context = canvas.getContext("2d");

  state.x = WIDTH / 2;
  state.y = HEIGHT / 2;

  // キーイベント設定
  window.addEventListener("keydown", keydown, false);
  window.addEventListener("keyup", keyup, false);

  // 初回描画処理
  window.requestAnimationFrame(loop);
}

init();

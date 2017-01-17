/*
 * 入力管理
 */

/**
 * キーコード定義
 */
const KeyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
};

class InputManager {
  constructor() {
    this.state = {
      left: false,
      right: false,
      up: false,
      down: false
    };

    // キーイベント設定
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
  }

  /**
   * @private
   */
  keydown(evt) {
    const key = KeyMap[event.keyCode];
    this.state[key] = true;
  }
  /**
   * @private
   */
  keyup(evt) {
    const key = KeyMap[event.keyCode];
    this.state[key] = false;
  }
}


module.exports = InputManager;

/**
 * 描画レイヤークラス
 */
class Layer {
  /**
   * @param {string} id
   */
  constructor(id) {
    this.id = id;
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext("2d");
  }

  init (width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  get ctx() {
    return this.context;
  }
}

module.exports = Layer;

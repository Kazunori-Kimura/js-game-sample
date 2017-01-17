/**
 * プレイヤークラス
 */
class Player {
  constructor(x, y, size) {
    // 位置
    this.position = {
      x, y
    };

    // 方向
    this.rotation = 0;

    this.width = this.height = size;
  }

  /**
   * playerの更新
   * 
   * @param {number} progress
   * @param {InputManager} state
   */
  update(progress, state) {
    this.updateRotation(progress, state);
    this.updatePosition(progress, state);
  }

  /**
   * 方向の更新
   * 
   * @private
   * @param {number} progress
   * @param {InputManager} state
   */
  updateRotation(progress, state) {
    // progressをそのまま使用すると大きすぎるので値を調整
    const value = progress / 3;
    if (state.left) {
      this.rotation -= value;
    } else if (state.right) {
      this.rotation += value;
    }
  }

  /**
   * 位置の更新
   * 
   * @private
   * @param {number} progress
   * @param {InputManager} state
   */
  updatePosition(progress, state) {
    // progressをそのまま使用すると大きすぎるので値を調整
    const value = progress / 3;

    const vector = {
      x: value * Math.cos((this.rotation - 90) * (Math.PI/180)),
      y: value * Math.sin((this.rotation - 90) * (Math.PI/180))
    };

    if (state.up) {
      this.position.x += vector.x;
      this.position.y += vector.y;
    } else if (state.down) {
      this.position.x -= vector.x;
      this.position.y -= vector.y;
    }
  }


  /**
   * playerの描画
   * 
   * @param {CanvasRenderingContext2D} ctx - canvas context
   */
  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate((Math.PI/180) * this.rotation);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.size/2, this.size/2);
    ctx.lineTo(0, this.size * -1);
    ctx.lineTo(this.size/2 * -1, this.size/2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

module.exports = Player;

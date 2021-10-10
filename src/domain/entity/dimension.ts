export default class Dimension {
  constructor(readonly width: number, readonly height: number, readonly depth: number) {
  }

  get cubage() {
    return this.height/100 * this.width/100 * this.depth/100
  }
}

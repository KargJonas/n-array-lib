class NArray extends Array {
  static neighborOffsets = [
    [[-1], [1]],
    [[-1, 0], [0, -1], [1, 0], [0, 1]],
  ];

  constructor(shape) {
    const length = shape
      .reduce((product, factor) => product * factor);

    super(length);
    this.shape = shape;
  }

  static fromNested() {
    
  }

  getIndex(location) {
    const offsets = [1];
    let previous = 1;

    for (let i = 1; i < location.length; i++) {
      offsets.push(previous *= this.shape[i]);
    }

    return location.reduce((sum, component, i) =>
      sum + (component * offsets[i]), 0);
  }

  get(location) {
    return this[this.getIndex(location)];
  }

  set(location, value) {
    return this[this.getIndex(location)] = value;
  }

  getNeighbors(location, offsets) {
    // this.map((item, index) => {
    //   const 
    // });
  }
}


const shape = new Vector(4, 4, 4, 4);
const arr = new NArray(shape);

const p = new Vector(0, 1, 2, 3);

arr.set(p, 10);
console.log(arr.get(p));
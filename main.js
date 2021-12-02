class NArray extends Array {
  constructor(shape) {
    const length = shape
      .reduce((product, factor) => product * factor);

    super(length);
    this.shape = shape;
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
}

const arr = new NArray([4, 4, 4, 4]);
arr.set([1, 2, 3, 1], 10);
console.log(arr.get([1, 2, 3, 1]));

class State1D {
  constructor({ value, validNeighborsWest, validNeighborsEast }) {
    this.value = value;
    this.neighbors = {
      west: validNeighborsWest,
      east: validNeighborsEast,
    };
  }
}

class QSystem1D {
  constructor(size, states) {
    this.size = size;
    this.states = states;
    this.MAX_ITERATIONS = 100;

    this.init();
  }

  init() {
    this.system = Array(this.size).fill(null);
    this.entropies = Array(this.size).fill(1);
  }

  collapse() {
    const location = (Math.random() * this.size) | 0;
    const state = (Math.random() * this.states.length) | 0;
    this.system[location] = this.states[state];

    let allCollapsed = false;

    for (let i = 0; i < this.MAX_ITERATIONS; i++) {
      const next = this.getLowestEntropyLocation();
      const validStates = this.getValidStates(next);
      const decidedStateIndex = (Math.random() * validStates.length) | 0;
      const decidedState = this.getStateWithValue(
        validStates[decidedStateIndex]
      );
      this.system[next] = decidedState;

      if (this.allCollapsed()) {
        allCollapsed = true;
        break;
      }
    }

    if (!allCollapsed) {
      console.warn('Abort: Max iterations reached.');
    }

    return this.system.map(state => state?.value);
  }

  multiCollapse(n) {
    const statistics = {};

    for (let i = 0; i < n; i++) {
      this.init();
      const pattern = this.collapse().toString();

      if (!statistics[pattern]) statistics[pattern] = 0;
      statistics[pattern]++;
    }

    return statistics;
  }

  allCollapsed() {
    return !this.system.includes(null);
  }

  getStateWithValue(_state) {
    return this.states.find((state) => state.value == _state);
  }

  getValidStates(index) {
    const neighborEast = this.system[index - 1];
    const neighborWest = this.system[index + 1];

    const validNeighbors = [];

    if (neighborEast) {
      validNeighbors.push(neighborEast.neighbors.west);
    }

    if (neighborWest) {
      validNeighbors.push(neighborWest.neighbors.east);
    }

    const reducer = (previousValue, currentValue) => {
      return [...previousValue].filter((neighbor) => {
        return currentValue.includes(neighbor);
      });
    };

    return validNeighbors.reduce(reducer);
  }

  // Low values (close to 0) mean high certainty,
  // high values (close to 1) mean low certainty
  calculateEntropy() {
    for (let i = 0; i < this.size; i++) {
      if (this.system[i] !== null) {
        this.entropies[i] = 0;
        continue;
      }

      const neighborEast = this.system[i - 1];
      const neighborWest = this.system[i + 1];

      if (neighborEast) this.entropies[i] -= 0.1;
      if (neighborWest) this.entropies[i] -= 0.1;
    }
  }

  getLowestEntropyLocation() {
    this.calculateEntropy();

    const sortedLocations = Object.entries(this.entropies)
      .sort(([index_a, a], [index_b, b]) => a - b)
      .filter(([index, entropy]) => entropy > 0);

    return sortedLocations[0][0] | 0;
  }
}

class QState {
  constructor() {}
}

const s0 = new State1D({
  value: 0,
  validNeighborsEast: [0],
  validNeighborsWest: [1],
});

const s1 = new State1D({
  value: 1,
  validNeighborsEast: [1],
  validNeighborsWest: [0, 1],
});

const q0 = new QSystem1D(10, [s0, s1]);
console.time();
const statistics = q0.multiCollapse(20000);
console.timeEnd();
console.log(statistics)
// This is amazing... its all connected truly
// Im gonna need superstates for combinatorics,
// im gonna need combinatorics to find neighbors
// in higher dimensional lattices and i need
// neighbor finding in higher dimensions to make
// the wfc algorithm work

// class SuperState {
//   constructor(states) {
//     this.states = states;
//     this.value = undefined;
//     this.collapsed = false;
//   }

//   setValue(index) {
//     this.value = this.states[index];
//   }
// }

// Generate cartesian product of given iterables:
// function* cartesian(head, ...tail) {
//   let remainder = tail.length ? cartesian(...tail) : [[]];
//   for (let r of remainder) for (let h of head) yield [h, ...r];
// }

function* cartesian([head, ...tail]) {
  let remainder = tail.length ? cartesian(tail) : [[]];
  for (let r of remainder) for (let h of head) yield [h, ...r];
}

// Example:
const first  = [-1, 1];
const second = [-1, 1];

console.log(Array.from(cartesian([first, second])));
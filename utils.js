
// from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

function deepFreeze(obj) {

  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function(name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
}

function deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
}

/** A modulo function where if and b are integers, and b > 0
 * then mod(a, b) >= 0 and mod(a, b) < b 
 */
function mod(a, b){
    var r = a % b;
    if (r < 0){
        r += b;
    }
    return r;
}

/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 * Taken from https://github.com/component/throttle v1.0.0
 *
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

const throttleFunc = (func, wait) => {
  let ctx;
  let args;
  let rtn;
  let timeoutID;
  let last = 0;

  const call = () => {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  };

  return function Funcd() {
    ctx = this;
    args = arguments;
    const delta = new Date() - last;
    if (!timeoutID) {
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    }
    return rtn;
  };
};

export default throttleFunc;

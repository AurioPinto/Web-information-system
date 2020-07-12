function throttle(method, context, delay) {
  clearInterval(method.tId);
  method.tId = setTimeout(function() {
    method.call(context);
  }, delay);
}

export { throttle };

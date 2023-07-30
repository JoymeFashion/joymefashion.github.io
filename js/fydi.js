// fixed message on top when scroll
/*
  parameter: type: string (element id)
*/
var fix_message = function(ele) {
  window.onscroll = function () {
  const messageContainer = document.getElementById(ele);
  const scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollDistance > messageContainer.offsetTop) {
      messageContainer.classList.add('sticky-message');
  } else {
      messageContainer.classList.remove('sticky-message');
  }
}
};
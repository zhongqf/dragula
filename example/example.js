'use strict';

function $ (id) {
  return document.getElementById(id);
}
function hasClass(el,className){
  return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
function addClass(el, className){
  if (!hasClass(el, className)){
    el.className += ' ' + className;
  }
}

function removeClass(el, className){
  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

dragula([$('left1'), $('right1')]);
var d = dragula([$('left2'), $('right2'), $('zone')], {
  copy: true,
  moves: function(item, container, handle){
    return container.getAttribute('id') !== 'zone';
  } 
});

d.on('shadow', function(el, container, origin, source){
    var s_id = source.getAttribute("id");
    var c_id = container.getAttribute("id");

    if (c_id === 'zone') {
      addClass(origin, 'toZone');
    }else{
      removeClass(origin, 'toZone');
    }
});

d.on('drop', function(el, target, origin, source){
  var t_id = target.getAttribute("id");

  removeClass(origin, 'toZone');

  if (t_id === 'left2' || t_id === 'right2'){
    source.removeChild(origin);
    console.log("move it");
  }

  if (t_id === 'zone') {
    target.removeChild(el);
    console.log("drop it");
  }
});


dragula([$('left3'), $('right3')]).on('drag', function (el) {
  el.className = el.className.replace(' ex-moved', '');
}).on('drop', function (el) {
  setTimeout(function () {
    el.className += ' ex-moved';
  }, 0);
});
dragula([$('left4'), $('right4')], { revertOnSpill: true });
dragula([$('left5'), $('right5')], {
  moves: function (el, container, handle) {
    return handle.className === 'handle';
  }
});
dragula([$('single1')], { removeOnSpill: true });

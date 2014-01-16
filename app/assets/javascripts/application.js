// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui.min
//= require spectrum
//= require_tree .

$(function(){

  $("#color-field").spectrum({
    color: "#ffffff",
    preferredFormat: "hex6",
    flat: true,
    move: function(color) {
      var hex = color.toHexString();
      $("body").css({background:hex});
      $("input#color-field").attr('value', hex);
    },
    showPalette: true,
    showSelectionPalette: true,
    palette: [ ],
    localStorageKey: "spectrum.homepage"
  });
  
  setToLast();
  
  flashLast($('#last.color-box'));
  
  $('form.new_color .actions input').click(function(e){
    e.preventDefault();
    $('.sp-button-container button.sp-choose').click();
    $('form.new_color .actions input').unbind().click();
  });

});

function setToLast(){
  var lastColor = "rgb(255,255,255)";
  if ($('.sp-palette-row-selection span').length > 0)
    lastColor = rgb2hex($('.sp-palette-row-selection span:first-child span').css('background-color'));
  $("#color-field").spectrum("set", lastColor);
}

function flashLast(lastBox){
  lastBox.css("border-color", isDark($('body').css("background-color")) ? 'white' : 'black');
  lastBox.animate({opacity:'0'}, 200, 'easeOutQuad', function(){
    $(this).animate({opacity:'1'}, 200, 'easeOutQuad', function(){
      flashLast(lastBox);
    });
  });
}

function isDark( color ) {
  var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color);
  return parseFloat(match[1])
  + parseFloat(match[2])
  + parseFloat(match[3])
  < 3 * 256 / 2; // r+g+b should be less than half of max (3 * 256)
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}
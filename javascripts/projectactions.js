$(document).ready(function(){$("#instaimgs").fetchUserImg({clientID:"d05f3c6e609e4925b9bd19ce67a505f8",username:"500px",loadMore:!1}),$("#hpslideshow").fetchUserImg({clientID:"d05f3c6e609e4925b9bd19ce67a505f8",byTag:!0,tagname:"harrypotter"}),$("#fullscreentoggle").click(function(){el=document.documentElement,rfs=el.requestFullScreen||el.webkitRequestFullScreen||el.mozRequestFullScreen||el.msRequestFullscreen,rfs.call(el)}),$('[data-toggle="tooltip"]').tooltip(),$("#chaton").click(function(){$(this).blur(),$("#chatbox").animate({right:"0"})}),$("#back").click(function(){$(this).blur(),$("#chatbox").animate({right:"-200"})}),$("#back-chat").click(function(){$(this).blur(),$("#chattab").animate({right:"-200"})}),$(".chatitem").click(function(){$("#chattab").children("img,span").remove(),$("#chattab").prepend($(this).children("div").html()),$("#chattab").animate({right:"0"})}),$("#post").keypress(function(e){if(13==e.which){var t=document.getElementById("post");if(""==t.value|null==t.value)return;var c=document.createElement("p");$(c).html(t.value),t.value="",c.className="msg",document.getElementById("msg1").appendChild(c)}})});
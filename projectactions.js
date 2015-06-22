
$(document).ready(function(){
	$("#fullscreentoggle").click(function(){
		  el = document.documentElement
         , rfs =
	           el.requestFullScreen
	        || el.webkitRequestFullScreen
	        || el.mozRequestFullScreen
	        || el.msRequestFullscreen;
		rfs.call(el);

	});
	$('[data-toggle="tooltip"]').tooltip(); 	
 	$("#chaton").click(function(){
		$(this).blur();
		$("#chatbox").animate({right:"0"});
	});
	$("#back").click(function(){
		$(this).blur();
		$("#chatbox").animate({right:"-200"});
	});
	$("#back-chat").click(function(){
		$(this).blur();
		$("#chattab").animate({right:"-200"})
	});
	$(".chatitem").click(function(){
		$("#chattab").children("img,span").remove();
		$("#chattab").prepend($(this).children("div").html());
		$("#chattab").animate({right:"0"});

	});
	$("#post").keypress(function(ev){
		if(ev.which==13)
		{
			var pst=document.getElementById('post');
		    if(pst.value==""| pst.value==null)return;
			var spn = document.createElement('p');
			spn.innerHTML = pst.value;
			pst.value="";
			spn.className="msg";
			document.getElementById("msg1").appendChild(spn);
			$("#msg1").animate({scrollTop: $(this).scrollHeight()},5000);
		}
	});
});


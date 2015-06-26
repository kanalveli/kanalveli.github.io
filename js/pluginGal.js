(function($) {
	$.fn.fetchUserImg= function(options) {
		if(!this.length) { 
			return this; 
		}

        var defaults = {
            username: 'kanalveli',
            clientID: null,
            limit:10,
            id:null,
            loadMore:false,
            usrid:null,
            error: function() {},
            success: function() {}
        }
        $(window).scrollTop(0);
		settings = {}
 		settings = $.extend({}, defaults, options);
 		elem = $(this);
 		elem.each(function() {
        	if(settings.clientID){
		        $.ajax({
			       	type:'GET',
			       	url: 'https://api.instagram.com/v1/users/search?q='+settings.username+'&client_id='+settings.clientID+'&callback=?',
			       	dataType: 'jsonp',
			       	success: function(data) { 
			       		settings.usrid=data.data[0].id;
			       		loadContent();
						if(settings.loadMore){
				        	elem.after('<input id="loadmore" type="button" value="Load More">');
				        	$("#loadmore").css("float","right").click(function(){
				        	loadContent();
				        	});
				        }				        
				    },
			        error: function(jqXHR, textStatus, errorThrown){
						console.log(textStatus,errorThrown);
					}
		        });
			}
			else{
				console.log("client ID missing");
			}
	    });
 	}

 	changeBackground=function(imgsrc,item,c_text){
 		var img1=new Image();
 		img1.crossOrigin='';
    	img1.src=imgsrc.images.thumbnail.url;
    	var canvs= document.createElement('canvas');
    	var context = canvs.getContext('2d');
    	img1.onload= function(){
			context.drawImage(img1, 0, 0);	
			idata = context.getImageData(0, 0,150,150).data;
			var r,g,b,a,k,colArr= {},hex1;
			for(k=0;k<idata.length;k+=4){
				r=idata[k];
				g=idata[k+1];
				b=idata[k+2];
				hex1="#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
				if(hex1 in colArr){
					colArr[hex1]++;
				}
				else{
					colArr[hex1]=1;
				}
			}
			var dom1=0;

			for(var colr in colArr){
				if(colr=='#000000'|| colr=='#ffffff'){}
				else if(colArr[colr]>=dom1){
					dom1=colArr[colr];
					hex1=colr;
				}
			}
			$(item).css("background",hex1);
			var rgb=$(item).css("background-color");
			rgb=rgb.slice(4,-1).split(',');
			hsv=new RGBColour(parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])).getHSV();
			if(hsv.v<50){
				$(c_text).css("color","#ffffff");
				$(item).css("border-color",'#ffffff');
			}
			$(c_text).appendTo(item);
			$(item).appendTo(elem);
		}
	}

	autoload=function() {
		if($(window).scrollTop() + $(window).height() > $(document).height()-100) {
			$(window).unbind('scroll');
			loadContent();
		}
	}

    loadContent = function(){
		var url = 'https://api.instagram.com/v1/users/'+settings.usrid+'/media/recent/?client_id='+settings.clientID+'&count='+settings.limit+'&callback=?';
		if(settings.id!=null){
			url+='&max_id='+settings.id;
		}
		$.ajax({
			type: 'GET',
		    url: url,
	  	    dataType: 'jsonp',
			success: function(data) {
				if(data.data.length){
			    for( var i=0;i<data.data.length;i++){
					var instimg = data.data[i],item,c_text;
					if(instimg.type === 'image'){
						item=document.createElement("div");
						$(item).html('<a target="_blank" href="'+instimg.link+'"><img class="instaphotos" src="'+instimg.images.standard_resolution.url+'" alt="Instagram Image" data-filter="'+instimg.filter+'" /></a>')
								.addClass("bgdiv");
						c_text=document.createElement('p');
						$(c_text).html(instimg.caption.text)
								 .addClass("caption");
						changeBackground(instimg,item,c_text);


					}
			 	} 	
			 	settings.id=data.data[data.data.length-1].id;
			 	if(!settings.loadMore){
			 		$(window).bind('scroll',autoload);
			 	}
			 	}
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus,errorThrown);
			}
		});
	}

})(jQuery);
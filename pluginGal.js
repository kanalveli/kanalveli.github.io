(function($) {
    $.fn.fetchUserImg= function(options) {
		if(!this.length) { 
			return this; 
		}

        var defaults = {
            username: null,
            clientID: null,
            limit:5,
            id:null,
            loadMore: null,
            error: function() {},
            success: function() {}
        }
		settings = {}
 		settings = $.extend({}, defaults, options);
 		elem = $(this);
 		loadContent();
        if(settings.loadMore){
        	elem.append('<a href="#" id="loadmore">Load More</a>');
        	$("#loadmore").click(function(){
        	loadContent();
        });
        }
        else{
        	settings.limit=33;
        }
        
    }

    changeBackground = function(){
    	var imgs=$(".instaphotos");
    	imgs.each(function(){
    		var canvs= document.createElement('canvas');
    		var context = canvs.getContext('2d');
			context.drawImage(imgs, 0, 0,300,300);
			data = context.getImageData(0, 0,300,300).data;
			imgs.css("background","black");
    	});	
    }   
    loadContent = function(){
        elem.each(function() {
	        $.ajax({
		       	type: 'GET',
		       	url: 'https://api.instagram.com/v1/users/search?q='+settings.username+'&client_id='+settings.clientID+'&callback=?',
		       	dataType: 'jsonp',
		       	success: function(data) {
			        var usr = data.data[0];
					var url = 'https://api.instagram.com/v1/users/'+usr.id+'/media/recent/?client_id='+settings.clientID+'&count='+settings.limit+'&callback=?';
					if(settings.id!=null){
						url+='&max_id='+settings.id;
					}
		        	$.ajax({
					    type: 'GET',
					    url: url,
					    dataType: 'jsonp',
				       	success: function(data) {
					       for( var i=0;i<data.data.length;i++) {
					    		var instimg = data.data[i],item;
					       		if(instimg.type === 'image'){
					       			item=document.createElement("li");
					       			$(item).html('<a target="_blank" href="'+instimg.link+'"><img class="instaphotos" src="'+instimg.images.standard_resolution.url+'" alt="Instagram Image" data-filter="'+instimg.filter+'" /></a>').css("background-color","#f1f1f1").appendTo(elem);
					       		}
					       	} 	
					       	settings.id=data.data[i-1].id;
						}
					});
		        }
	        });
	    });
    }

})(jQuery);
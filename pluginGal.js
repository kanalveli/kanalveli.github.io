(function($) {
	var i=0;
    $.fn.fetchUserImg= function(options) {
		if(!this.length) { 
			return this; 
		}

        var defaults = {
            username: null,
            clientID: null,
            limit:3,
            loadMore: null,
            error: function() {},
            success: function() {}
        }

        plugin = this;
		plugin.settings = {}
 		plugin.settings = $.extend({}, defaults, options);
 		el = $(this);
 		el.append('<a href="#" id="loadmore">Load More</a>');
        loadContent();
        if(plugin.settings.loadMore){
        	$("#loadmore").click(function(){	
        	plugin.settings.limit+=3;
        	loadContent();
        });
        }
        
    },
    
    loadContent = function(){
        el.each(function() {
	        $.ajax({
		       	type: 'GET',
		       	url: 'https://api.instagram.com/v1/users/search?q='+plugin.settings.username+'&client_id='+plugin.settings.clientID+'&callback=?',
		       	dataType: 'jsonp',
		       	success: function(data) {
			        var usr = data.data[0];
			        if(usr.username === plugin.settings.username) {
						var url = 'https://api.instagram.com/v1/users/'+usr.id+'/media/recent/?client_id='+plugin.settings.clientID+'&count='+plugin.settings.limit+'&callback=?';
			        	$.ajax({
						    type: 'GET',
						    url: url,
					       	dataType: 'jsonp',
					       	success: function(data) {
						       	if(data.meta.code === 200 && data.data.length) {
						        	for(; i < plugin.settings.limit && i<=data.data.length;) {
						       			var instimg = data.data[i],item;
						        		if(instimg.type === 'image') {
						        			item = '<li><a target="_blank" href="'+instimg.link+'"><img class="instaphotos" src="'+instimg.images.standard_resolution.url+'" alt="Instagram Image" data-filter="'+instimg.filter+'" /></a></li>';							       			
						        			i++;
						        			el.append(item);
								       	}
							       	}
							       	if(i>data.data.length){
							       		window.alert("No More Images available");
							       	}
							       		
						       	} 	
							}
						});	
				    }
		        }
	        });
	    });
    }
})(jQuery);
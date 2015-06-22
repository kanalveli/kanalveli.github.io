;(function($) {

    $.fn.fetchUserImg= function(options) {
		if(!this.length) { 
			return this; 
		}

        var defaults = {
            username: null,
            clientID: null,
            limit: null,
            loadMore: null,
            error: function() {},
            success: function() {}
        }
        plugin = this;
		plugin.settings = {}
 		plugin.settings = $.extend({}, defaults, options);
 		el = $(this);
        loadContent();
    },
    
    loadContent = function(){
        el.each(function() {
	        $.ajax({
		       	type: 'GET',
		       	url: 'https://api.instagram.com/v1/users/search?q='+plugin.settings.username+'&client_id='+plugin.settings.clientID+'&callback=?',
		       	dataType: 'jsonp',
		       	success: function(data) {
			        var thisUser = data.data[0];
			        if(thisUser.username === plugin.settings.username) {
						var url = 'https://api.instagram.com/v1/users/'+thisUser.id+'/media/recent/?client_id='+plugin.settings.clientID+'&count='+plugin.settings.limit+'&callback=?';
			        	$.ajax({
						    type: 'GET',
						    url: url,
					       	dataType: 'jsonp',
					       	success: function(data) {
						       	if(data.meta.code === 200 && data.data.length) {
						        	for(var i = 0; i < data.data.length; i++) {
						        		var thisMedia = data.data[i],item;
						        		if(thisMedia.type === 'image') {
							       			item = '<li><a href="#"><img class="instaphotos" src="'+thisMedia.images.standard_resolution.url+'" alt="Instagram Image" data-filter="'+thisMedia.filter+'" /></a></li>';
								       	}
							       		el.append(item);
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
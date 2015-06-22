(function($){

	$.fn.fetchUserPhotos=function(options){
		var defaults={
			clientID:'3d4a6c6f983c463e9f0d688bdf892609',
			usrname:'kanalveli',
			maxphotos:10

		};
		var settings={};
		settings=$.extend(defaults, options);

		$.ajax({
			type ='GET',
			url  ='https://api.instagram.com/v1/users/search?q='+settings.usrname+'&client_id='+settings.clientID,
			dataType='jsonp',
			success: function(data){
				alert("success");
				var imghtml='<li><img src="'+data.data[0].profile_picture+'"></li>';
				$(this).prepend(imghtml);
				$.ajax({
					type ="GET",
					url  ='https://api.instagram.com/v1/users/'+data.data[0].id+'/media/recent/?client_id='+settings.clientID+'&count='+settings.maxphotos,
					dataType='jsonp',
					success: function(data){
						if(data.meta.code==200 && data.data.length){
							for(var i=0;i<data.data.length;i++){
								var img1=data.data[i];
								if(img1.type==='image'){
									var imghtml='<li><img src="'+img1.standard_resolution.url+'"></li>';
									$(this).prepend(imghtml);
								}
							}
						}

					}
 
				});
			},
			error: function(){
				alert("error");
			}
		});

	}

}(jquery));
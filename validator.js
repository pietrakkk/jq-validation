(function ( $ ) {
 
    $.fn.validate = function(settings) {

        $(this).change(function() {
        var test;
        
        if(settings.email){
            var DEFAULT_EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
      
            if(settings.email.pattern){
              test = settings.email.pattern.test($(this).val()); 
            } else{
              test =  DEFAULT_EMAIL_PATTERN.test($(this).val());
            }
      
 
            if(!test){
                $(this).addClass('error');
            } else{
                $(this).removeClass('error');
          }
        }

      if(settings.name){
          var test;
          var DEFAULT_NAME_PATTERN = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/; 
          
          if(settings.name.pattern){
              test = settings.name.pattern.test($(this).val()); 
          } else{
              test =  DEFAULT_NAME_PATTERN.test($(this).val());
          }
      
          if(!test){
              $(this).addClass('error');
          }else{
              $(this).removeClass('error');
          }
        }

        if(settings.code){
          var CODE_PATTERN = /[0-9]{2}-[0-9]{3}$/;
          var test;
          var code =  $(this);

          test = CODE_PATTERN.test(code.val());

          if(test){
            $.ajax({
            url: "kody.json",
            type: "GET",
            dataType: "json",
            success: function (data) {
              var responseValue = data[code.val()]; 

              if(responseValue){
                $("#code").append("<span>"+responseValue+"</span>");
              }           
            },
            error: function(response){

            }
          }); 
          }
        }
    });
    return this;
  };

    $.fn.notNullConstraint = function(){
    	return this.each(function(){
    		$(this).change(function(){
    			if($(this).val() === ''){
    					$(this).addClass('not-null');
   	 			}else{
   	 				$(this).removeClass('not-null');
    			}
    		});
    	});
    }
}( jQuery ));

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
    });
    return this;
  };

    // $.fn.notNullConstraint = function(){
    // 	return this.each(function(){
    // 		$(this).change(function(){
    // 			if($(this).val() === ''){
    // 					$(this).addClass('not-null');
   	//  			}else{
   	//  				$(this).removeClass('not-null');
    // 			}
    // 		});
    // 	});
}( jQuery ));
(function ($) {


    $.fn.validateEmail = function (pattern) {
        var DEFAULT_EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var test;

        $(this).change(function () {

            if (pattern) {
                test = pattern.test($(this).val());
            } else {
                test = DEFAULT_EMAIL_PATTERN.test($(this).val());
            }

           checkErrorStatus(test, $(this));

        });
        return this;
    };

    $.fn.validateText = function (pattern) {
        var DEFAULT_NAME_PATTERN = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/;
        var test;


        $(this).change(function () {
            if (pattern) {
                test = pattern.test($(this).val());
            } else {
                test = DEFAULT_NAME_PATTERN.test($(this).val());
            }

            checkErrorStatus(test, $(this));
           
        });
        return this;
    };


    $.fn.validatePostalCode = function (){
        var CODE_PATTERN = /[0-9]{2}-[0-9]{3}$/; 
        var test;

        $(this).change(function () {
            var postalCode = $(this).val();

            test = CODE_PATTERN.test(postalCode);

            $('#post').remove();

            if (test) {
                getPostalCode(postalCode);
                $(this).removeAttr('error');
            } else {
                $(this).attr('error', 'true');
                $("#code").after("<span class='error' id='post'>Niepoprawny kod</span>");
            }

             if(submitDisabled($(this))){
                processSubmit('disable', $(this));
            }else{
                processSubmit('enable', $(this));
            }
        });
        return this;
    };


    function getPostalCode(postalCode) {
        $.ajax({
            url: "kody.json",
            type: "GET",
            dataType: "json",
            success: function (data) {
                var responsePostalCode = data[postalCode];

                if (responsePostalCode) {
                    $("#code").after("<span id='post'>" + responsePostalCode + "</span>");
                }
            }
        });
    }

    $.fn.notNullConstraint = function () {

        processSubmit('disable', $(this));
        
        return this.each(function () {
            
            $(this).attr('error', 'true');
            
            $(this).change(function () {
                if ($(this).val() === '') {
                    $(this).addClass('not-null');
                } else {
                    $(this).removeClass('not-null');
                }
            });
        });
    };


    function processSubmit(operation, selector){
        var submitButton = selector.parent().find('input[type="submit"]');
        
        if(operation === 'disable'){
            submitButton.attr('disabled', 'disabled');
        } else if(operation === 'enable'){
            submitButton.removeAttr('disabled');
        }
    };

    function submitDisabled(selector){
        var inputs = selector.parent().children('input');
    
        for(var i = 0 ; i < inputs.length ; i++){
            if(inputs[i].attributes['error']){
                return true;
            }
        }
        return false;
    }



    function checkErrorStatus(test, selector){
         if (!test) {
                selector.addClass('error');
                selector.attr('error', 'true');
            } else {
                selector.removeClass('error');
                selector.removeAttr('error');
            }

            if(submitDisabled(selector)){
                processSubmit('disable', selector);
            }else{
                processSubmit('enable', selector);
            }
    }


}(jQuery));

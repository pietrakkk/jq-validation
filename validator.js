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

            if (!test) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        return this;
    }

    $.fn.validateText = function (pattern) {
        var DEFAULT_NAME_PATTERN = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/;
        var test;

        $(this).change(function () {

            if (pattern) {
                test = pattern.test($(this).val());
            } else {
                test = DEFAULT_NAME_PATTERN.test($(this).val());
            }

            if (!test) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
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
            } else {
                $("#code").after("<span class='error' id='post'>Niepoprawny kod</span>");
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
        return this.each(function () {
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
}(jQuery));

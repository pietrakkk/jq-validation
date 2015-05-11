$(function(){
	$('#email').validateEmail();
	$('#name').validateText();
	$('#code').validatePostalCode().notNullConstraint();
});
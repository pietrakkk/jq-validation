$(function(){
	$('#email').validateEmail().notNullConstraint();
	$('#name').validateText().notNullConstraint();
	$('#code').validatePostalCode();
});
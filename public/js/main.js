$('.groupTwo').hide()
$('.groupThree').hide()
$('input:radio[name="profileType"]').change(function(){

    if ($(this).val() == 'artist') {
        $('.groupTwo').show()
        $('.groupThree').show()
    }
    if ($(this).val() == 'fan') {
        $('.groupTwo').show()
}
})
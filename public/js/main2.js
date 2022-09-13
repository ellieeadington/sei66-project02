

$('.groupTwo').hide()

$('input:radio[name="profileType"]').change(function(){

    if ($(this).val() == 'artist') {
        $('.groupTwo').show()
    }
    if ($(this).val() == 'fan') {
        $('.groupTwo').hide()
}
})
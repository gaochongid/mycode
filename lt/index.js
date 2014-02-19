function demo() {
    document.body.innerHTML = 'yes';
    return 'ok';
}
//demo();

document.body.addEventListener('click', function () {
    alert('yes');
}, false);

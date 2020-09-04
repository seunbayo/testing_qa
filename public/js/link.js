(function() {
    var buttons = document.querySelectorAll('[data-append-hash]')
    buttons.forEach (btn => {
        btn.href = btn.href + window.location.hash
    });    
})();

var params = window.location.hash
    .split('#')
    .filter(segment => segment)
    .map(segment => segment.split('='))
    .reduce((obj, pair) => { obj[pair[0]] = pair[1]; return obj }, {});

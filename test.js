function outter() {
    var abc = 123
    inner()
}

function inner() {
    console.log(abc + 1)
}

outter()
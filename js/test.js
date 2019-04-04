//promises

const esperando = new Promise(function (resolve, reject) {
    setTimeout(function() {
        resolve('Se ejecuto')
    }, 5000);
})

esperando.then(function(mensaje) {
    console.log(mensaje);
})



const aplicarDescuento = new Promise(function(resolve, reject) {
    const descuento = true;
    if(descuento) {
        resolve('Descuento aplicado');
    } else {
        reject('No se puede aplicar descuento');
    }
});

aplicarDescuento.then(function(mensaje) {
    console.log(mensaje)
}).catch(function(error) {
    console.log(error)
});
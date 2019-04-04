//Cotizador constructor

class Seguro{
    constructor(marca, anio, tipo) {
        this.marca = marca
        this.tipo = tipo
        this.anio = anio
    }
    cotizarSeguro(){
        /*
              1 = Americano 1.15
              2 = Asiatico 1.05
              3 = Europeo 1.35
        */
       let cantidad;
       const base = 2000;
    
       switch(this.marca){
             case '1':
                    cantidad = base * 1.15;
                    break;
             case '2':
                    cantidad = base * 1.05;
                    break;
             case '3':
                    cantidad = base * 1.35;
                    break;
       }
       //leer anio
       const diferencia = new Date().getFullYear() - this.anio;
       //Cada anio de diferencia se debe reducir 3% el valor de seguro
       cantidad -= ((diferencia * 3) * cantidad) / 100
       /*
       Si el seguro es basico se multiplica por 30% mas
       Si es completo es 50% mas.
       */
      if(this.tipo === 'basico'){
            cantidad *= 1.30;
      } else {
        cantidad *= 1.50;
      }
      return cantidad
    
    }
}


//todo lo que muestra
class Interfaz {
    //mensaje de error
    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');

        if (tipo === 'error') {
              div.classList.add('mensaje', 'error');
        } else {
              div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function() {
              document.querySelector('.mensaje').remove();
        }, 3000);
  }
    //mensaje de resultado de cotizacion
  mostrarResultado(seguro, total) {
    const resultado = document.getElementById('resultado');
    let marca;

    switch(seguro.marca) {
          case '1':
                marca = 'americano'
                break;
          case '2':
                marca = 'asiatico'
                break;
          case '3':
                marca = 'europeo'
                break;
    }
    //crear div
    const div = document.createElement('div');
    //insetar informacion en el div
    div.innerHTML = `
          <p class='header'>Tu Resumen:</p>
          <p>Marca; ${marca}</p>
          <p>Anio: ${seguro.anio}</p>
          <p>Tipo: ${seguro.tipo}</p>
          <p>Total: $ ${total}</p>
    `;
    const spinner = document.querySelector('#cargando img')
    spinner.style.display = 'block';

    setTimeout(function() {
          spinner.style.display = 'none';
          resultado.appendChild(div)
    }, 3000);
}

}

 



//EventListener
const formulario = document.getElementById('cotizar-seguro')

formulario.addEventListener('submit', function(e) {
    e.preventDefault();//previene el comoportamiento del boton submit por defecto
    //leer marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    //leer el anio seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    //leer el tipo seleccionado
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear una instancia de interface
    const interfaz = new Interfaz();

    //revisamos que los campos no esten vacios
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '' ) {
          //interface imprimiendo error
          interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo.', 'error')
    } else {
          //limpiar resultados anteriores
          const resultados = document.querySelector('#resultado div');
          if(resultados != null) {
                resultados.remove();
          }
          //instanciar seguro y mostrar interfaz
          const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
          //cotizar el seguro
          const cantidad = seguro.cotizarSeguro(seguro); 
          interfaz.mostrarResultado(seguro, cantidad)
          interfaz.mostrarMensaje('Cotizando...', 'correcto');

    }
});

const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.getElementById('anio');
for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}
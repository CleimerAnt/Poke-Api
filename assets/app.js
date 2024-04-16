//Declaracion de Variables
const formulario = document.querySelector('.formulario')
const stat = document.querySelector('#stat')
const input = document.querySelector('[type="text"]')
const segundo = document.querySelector('#segundo')
const imagen = document.querySelector('#imagen')

// Agregando la Logica de la barra de busqueda
formulario.addEventListener('submit',function(e){
    e.preventDefault();
    // La variable Pokemin es igual al valor del Input de busqued
    let pokemon = input.value
    pokedex(pokemon)

    if(pokemon !== '')
    {
        tarjeta.innerHTML = ''
    }   
    else{
        tarjeta.innerHTML = ''  
        //La funcion de datos realiza la funcion de cargar los datos de la API, en este
        //caso los 15 primeros Pokemones    
        datos()
    }
})



// La constante tarjeta, aqui se presentaran los Pokemones
const tarjeta = document.querySelector('.tarjeta')
datos()
// La funcion datos se encarga de traer los 15 primeros pokemones desde la API, 
//se utiliza un For para hacer el llamado de los 15 a la API
function datos()
{
    for(let i =1; i < 19; i++)
{
fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
.then(res => res.json())
.then(data => {
    render(data)
})
.catch(error => console.log(error))
}

}


//La Funcion Pokedex es la encargada de buscar un Pokemon en especifico en la API
//La utilizo se utiliza en la Barra de Navegacion
function  pokedex (pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    fetch(url)
    .then(res => {
        if(res.ok)
        {
            return res.json()
        }
        else{
            datos()
        }
    } )
    .then(data => {
        render(data)
    })
    .catch(error => console.log(error))
}
//La siguiente funcion se encarga de mandar un color dependiendo de cual sea
//Asi se puede poner un color de fondo en especifico dependiendo del tipo de Pokemon
function colorEstadistica(valor)
{   
    if(valor == 'fire')
    {
        return 'red'
    }
    else if(valor == 'grass')
    {
        return '#9BCC50'
    }

    else if(valor == 'poison')
    {
        return '#B97FC9'
    }

    else if(valor == 'water')
    {
        return '#428BBB'
    }
    else if(valor == 'bug')
    {
        return '#729E3F'
    }
    else if(valor == 'flying')
    {
        return '#BDB9B8'
    }
    else if(valor == 'electric')
    {
        return '#EED535'
    }
    else if(valor == 'normal')
    {
        return '#00B98E'
    }
}

//En esta funcion se crean la mayoria de elementos HTML que tendra nuestra pagina
//Y se le asignan clases
function render(data)
{
    //Declaracion de Variables
    let p = document.createElement('p')
    let img = document.createElement('img')
    let stats = document.createElement('p')
    let stats2 = document.createElement('p')
    let div = document.createElement('div')
    let statsContainer = document.createElement('div')
    

    //No todo los Pokemones son de dos tipos, por eso creo la siguiente funcion
    //Se encarga de revisar si el pokemon tiene un segundo tipo, si no lo tiene 
    //Retorna un STRING vacio
    const segundaStat = () => {
        if(data.types[1] !== undefined)
        {
            return data.types[1].type.name
        }
        else {
            return ''
        }
    }
    //Aqui se asignan valores
    p.classList.add('titulo')
    p.textContent = data.species.name
    img.src = data.sprites.front_default
    stats.textContent = ` ${data.types[0].type.name}`;
    stats2.textContent = ` ${segundaStat()} `;


    let valor = `${data.types[0].type.name}`
    const valor2 = () => {
    
            if(data.types[1] !== undefined)
            {
                return data.types[1].type.name
            
            }
            else {
                return ''
            }
        }     
    
    //En el siguiente codigo se agregan clases y elementos al archivo HTML
    stats.style.backgroundColor = colorEstadistica(valor)
    stats.classList.add('stat')
    stats2.style.backgroundColor = colorEstadistica(valor2())
    stats2.classList.add('stat')
    statsContainer.append(stats)
    statsContainer.append(stats2)
    statsContainer.classList.add('statsContainer');
    
    div.classList.add('margen')
    img.classList.add('imagen')
    div.append(img)
    div.append(p)

    div.append(statsContainer)
    tarjeta.append(div)
    
    div.addEventListener('click', () => {
        console.log(div.childNodes[1].textContent)
        
        localStorage.setItem('p', div.childNodes[1].textContent)
        window.location.href = './Pokemon.html';
    })


}
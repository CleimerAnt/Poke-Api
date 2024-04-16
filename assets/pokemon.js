//Declaracion de Variables
const targeta = document.querySelector('.targeta')
const boton = document.querySelector('.probar')

const pokemon = localStorage.getItem('p')

const img = document.querySelector('.pokemon__imagen')
const listaPokemon = document.querySelector('.pokemon__lista')
const contenedor2 = document.querySelector('.pokemon__descripcion__detalles')
const tipo = document.querySelector('.p__type')
const tipo1 = document.querySelector('.p__type1')

pokedex(pokemon);

//Esta es la funcion principal, se encarga de recibir los datos que mandamos de la pagina principal.

function  pokedex (pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        let valor = `${data.types[0].type.name}`;
        
        tipo.textContent = valor

        const valor2 = () => {
    
            if(data.types[1] !== undefined)
            {
                return data.types[1].type.name
            
            }
            else {
                return ''
            }
        }     

        tipo.style.backgroundColor = colorEstadistica(valor)
        
        tipo1.textContent = valor2()
        tipo1.style.backgroundColor = colorEstadistica(valor2())
        //La siguiente constante crea una lista HTML con las Stats del Pokemon
        const lista = 
        `<li>${data.stats[0].stat.name} : ${data.stats[0].base_stat}</li>
        <li>${data.stats[1].stat.name} : ${data.stats[1].base_stat}</li>
        <li>${data.stats[2].stat.name} : ${data.stats[2].base_stat}</li>
        <li>${data.stats[3].stat.name} : ${data.stats[3].base_stat}</li>
        <li>${data.stats[4].stat.name} : ${data.stats[4].base_stat}</li>
        <li>${data.stats[5].stat.name} : ${data.stats[5].base_stat}</li>
        `
        
        listaPokemon.innerHTML = lista
        
        img.src = data.sprites.front_default
        //Esta se encarga de confirmar si tiene una segunda habilidad
        const segundaHabilidad = () => {
            if(data.abilities[1] !== undefined)
            {
                return  data.abilities[1].ability.name
            }
            else {
                return ''
            }
        }
        //La siguiente constante crea unos parrafos con algunas caracteristicas del Pokemon
        const cont =  `
            <p> Weigtht: ${data.weight}</p>
            <p> Height: ${data.height} </p>
            <p> Abilities: ${data.abilities[0].ability.name} ${ segundaHabilidad()} </p>
        `;
        contenedor2.innerHTML = cont;
        
    })

}

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
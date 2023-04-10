import { Component } from 'react'

export default class SearchPokemon extends Component {

    constructor(props){
        super(props)
        this.state = {
            name:'',
            img: '',
            type: ''
        }
    }

    traerDatos = async () => {
        let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`);
        let data = await respuesta.json();
        console.log(data);
    
        this.setState({
            img: data.sprites.front_default,
            type: data.types[0].type.name,
        })
    }

    handleName = (event) => {
        let aux = event.target.value.toLowerCase();
        console.log(event.target.value.toLowerCase());
        this.setState({
            name: aux
        })
    }

    handleSubmit = (event) => {
        let name = this.state.name;
        console.log(name);
        event.preventDefault();
        this.traerDatos();
    }

    render() {
        if (this.state.img === '') {
            return (
                <div className='search-'>

                    <div className='card-body'>
                        <form>
                            <input type="text" placeholder='Nombre pokemon' onChange={this.handleName}/><br/>
                            <button className='btn btn-outline-danger ' type='submit' onClick={this.handleSubmit}>Buscar</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return(
                <div className='' style={{width: '10rem'}}>

                    <div className=' text-white'>
                        {this.state.name}
                    </div>
                    <div >
                    <img src={this.state.img} className="img-thumbnail  rounded mx-auto d-block" alt={this.state.name}></img> <br />
                    <p >Tipo: {this.state.type}</p>
                     <button className='btn btn-outline-warning d-block mx-auto mb-3' onClick={() =>{this.setState({img: ''})}}>Regresar</button>

                    </div>
                </div>
            )
        }
    }
}

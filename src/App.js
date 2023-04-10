import './App.css';
import Navbar from './Components/NavBar/Navbar';
import PokemonList from './Components/PokemonList/PokemonList';
import SearchPokemon from './Components/SearchPokemon/SearchPokemon';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
      <SearchPokemon className="main"/>
      <PokemonList/>
      </header>
      
      
    


    </div>
  );
}

export default App;

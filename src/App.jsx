import { useEffect, useState } from 'react'

// Array iniziale dei film (dati statici)
const films = [
  { title: 'Inception', genre: 'Fantascienza' },
  { title: 'Il Padrino', genre: 'Thriller' },
  { title: 'Titanic', genre: 'Romantico' },
  { title: 'Batman', genre: 'Azione' },
  { title: 'Interstellar', genre: 'Fantascienza' },
  { title: 'Pulp Fiction', genre: 'Thriller' },
]

function App() {
  // Stato per il valore di ricerca (input o select)
  const [search, setSearch] = useState('')
  // Stato per i film filtrati da mostrare in lista
  const [filteredFilms, setFilteredFilms] = useState(films)
  // Stato per l'input di un nuovo titolo da aggiungere
  const [newFilm, setNewFilm] = useState('')
  // Stato con la "vera" lista di film aggiornata nel tempo
  const [filmsState, setFilmsState] = useState(films)

  // Funzione che gestisce l'aggiunta di un nuovo film
  const addFilm = (event) => {
    event.preventDefault(); // Evita il refresh della pagina
    const trimmedFilm = newFilm.trim(); // Rimuove spazi vuoti

    // Se il titolo è vuoto, non aggiunge niente
    if (trimmedFilm === '') return;

    // Crea un nuovo oggetto film con genere sconosciuto
    const newFilmObj = {
      title: trimmedFilm,
      genre: 'genere sconosciuto'
    }

    // Aggiorna lo stato dei film aggiungendo quello nuovo
    setFilmsState([...filmsState, newFilmObj])
    // Svuota l'input dopo l'aggiunta
    setNewFilm('');
  }

  // Effetto che si attiva quando `search` o `filmsState` cambiano
  // Serve a filtrare i film in base a titolo o genere
  useEffect(() => {
    const filteredArray = filmsState.filter((film) => {
      return (
        film.genre.toLowerCase().includes(search.toLowerCase()) ||
        film.title.toLowerCase().includes(search.toLowerCase())
      );
    })

    // Aggiorna i film da mostrare in lista
    setFilteredFilms(filteredArray)
  }, [search, filmsState]) // Dipendenze: si aggiorna se cambiano questi due stati

  return (
    <>
      <div className='container mt-5'>
        <h1>Film Form</h1>

        {/* Form per aggiungere un nuovo film */}
        <form onSubmit={addFilm} className='mb-4'>
          <div className='input-group'>
            <input
              value={newFilm}
              onChange={(event) => {
                setNewFilm(event.target.value)
              }}
              type='text'
              placeholder='Nuovo Film'
              className='form-control'
            />
            <button className='btn btn-outline-success'>Aggiungi</button>
          </div>
        </form>

        {/* Lista dei film filtrati */}
        <ul className='list-group'>
          {filteredFilms.map((film, index) =>
            <li className='list-group-item' key={index}>
              {film.title} {': '} {film.genre}
            </li>
          )}
        </ul>

        {/* Campo input per cercare per titolo o genere */}
        <div className='input-group mt-3'>
          <input
            type="text"
            placeholder='Cerca in base al genere o titolo...'
            className='form-control'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </div>

        {/* Menu a tendina per filtrare per genere */}
        <div className='input-group mt-3'>
          <select
            className='form-select'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            <option value=''>Tutti i generi</option>
            {/* Mostra i generi (anche se ci sono duplicati) */}
            {filmsState.map(film => film.genre).map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default App
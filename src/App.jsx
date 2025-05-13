import { useEffect, useState, } from 'react'

const films = [
  { title: 'Inception', genre: 'Fantascienza' },
  { title: 'Il Padrino', genre: 'Thriller' },
  { title: 'Titanic', genre: 'Romantico' },
  { title: 'Batman', genre: 'Azione' },
  { title: 'Interstellar', genre: 'Fantascienza' },
  { title: 'Pulp Fiction', genre: 'Thriller' },
]



function App() {


  const [search, setSearch] = useState('')
  const [filteredFilms, setFilteredFilms] = useState(films)
  const [newFilm, setNewFilm] = useState('')
  const [filmsState, setFilmsState] = useState(films)

  const addFilm = (event) => {
    event.preventDefault();
    const trimmedFilm = newFilm.trim();
    if (
      trimmedFilm === ''
    )
      return

    const newFilmObj = {
      title: trimmedFilm,
      genre: 'genere sconosciuto'
    }

    setFilmsState([...filmsState, newFilmObj])
    setNewFilm('');

  }

  useEffect(() => {
    const filteredArray = filmsState.filter((film) => {
      return (
        film.genre.toLowerCase().includes(search.toLowerCase()) || film.title.toLowerCase().includes(search.toLowerCase())
      );
    })
    setFilteredFilms(filteredArray)

  }, [search, filmsState]);

  return (
    <>
      <div className='container mt-5'>
        <h1>Film Form</h1>

        <form onSubmit={addFilm} className='mb-4'>
          <div className='input-group'>
            <input
              value={newFilm}
              onChange={(event) => {
                setNewFilm(event.target.value)
              }}
              type='text'
              placeholder='Nuovo Film'
              className='form-control' />
            <button className='btn btn-outline-success'>Aggiungi</button>
          </div>
        </form>

        <ul className='list-group'>
          {filteredFilms.map((film, index) =>
            <li className='list-group-item' key={index}>
              {film.title}  {': '} {film.genre}
            </li>
          )}
        </ul>

        <div className='input-group mt-3'>
          <input
            type="text"
            placeholder='Cerca in base al genere...'
            className='form-control'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </div>
        <div className='input-group mt-3'>
          <select
            className='form-select'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            <option value=''>Tutti i generi</option>
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

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

  const [film, setFilm] = useState(films)
  const [search, setSearch] = useState('')
  const [filteredFilms, setFilteredFilms] = useState(films)


  useEffect(() => {
    const filteredArray = films.filter((film) => {
      return film.genre.toLowerCase().includes(search.toLowerCase());
    })
    setFilteredFilms(filteredArray)

  }, [search]);







  return (
    <>
      <div className='container mt-5'>
        <h1>Film Form</h1>

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

      </div>
    </>
  )
}

export default App

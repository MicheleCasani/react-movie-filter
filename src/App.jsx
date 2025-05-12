import { useState, } from 'react'

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







  return (
    <>
      <div className='container mt-5'>
        <h1>Film Form</h1>

        <ul className='list-group'>
          {film.map((film, id) =>
            <li className='list-group-item' key={id}>
              {film.title}  {': '} {film.genre}
            </li>
          )}
        </ul>

        <div className='input-group mt-3'>
          <input
            type="text"
            placeholder='Cerca'
            className='form-control'
            value={''}
          />
        </div>

      </div>
    </>
  )
}

export default App

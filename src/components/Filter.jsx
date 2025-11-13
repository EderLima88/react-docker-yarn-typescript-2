const Filter = ({filter, setFilter, setSort}) => {
  return (
    <div className="filter">
      <h2>Filtrar:</h2>
      <div className="filter-option">
        <div>
          <p>Status:</p>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">Todas</option>
              <option value="Complete">Completa</option>
              <option value="Incomplete">Inconpletas</option>
          </select>
        </div>
      <div>
        <p>Ordem Alfabética</p>
        <button onClick={() => setSort("Asc")}>Asc</button>
        <button onClick={() => setSort("Desc")}>Desc</button>
      </div>
    </div>
    </div>
  )
}

export default Filter

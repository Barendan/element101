const ColorDetails = ({ color, tintArr, clearColor }) => {
  return (
    <div className="col px-3 mb-4">
      <div className="card featured">
        <div className="card-body" style={{ backgroundColor: color }}>
        </div>
        <div className="card-footer text-muted">
          {color}
        </div>
      </div>
      <div className="row justify-content-around mt-4">
        {tintArr.map((tint, i) => (
          <div className="col" key={i}>
            <div className="card">
              <div className="card-body card-mini" style={{ backgroundColor: tint }}>
              </div>
              <div className="card-footer text-muted">
                {tint}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-12">

        <a href="/" onClick={() => clearColor()}>
          <button className="col-5 btn btn-custom btn-light border-dark py-2 px-4 my-4 font-weight-bold mx-auto">Clear</button>
        </a>
      </div>
    </div>
  )
}

export default ColorDetails;
export default ({ color, onSelection }) => (
    <div className="col-3 px-3 mb-4">
        <a href={color} onClick={() => onSelection(color)}>
            <div className="card">
                <div className="card-body" style={{ backgroundColor: color }}>
                </div>
                <div className="card-footer text-muted">
                    {color}
                </div>
            </div>
        </a>
    </div>
)
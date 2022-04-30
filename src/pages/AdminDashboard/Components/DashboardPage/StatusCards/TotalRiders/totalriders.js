import './totalriders.css';

function TotalRiders(props) {
    return (
        <div className="col-md-3">
            <div className="cardContainer bg-green-card">
                <i className="fa fa-truck"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">EW Riders</span>
            </div>
        </div>
    );
}

export default TotalRiders;
import './totalpartners.css';

function TotalPartners(props) {
    return (
        <div className="col-md-3">
            <div className="cardContainer bg-yellow-card">
                <i className="fa fa-building"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">EW Partners</span>
            </div>
        </div>
    );
}

export default TotalPartners;
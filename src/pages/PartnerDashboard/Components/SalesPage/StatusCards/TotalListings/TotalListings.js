import './TotalListings.css';

function TotalListings(props) {
    return (
        <div className="col-md-4">
            <div className="cardContainer bg-orangePartner-card">
                <i className="fa fa-bullhorn"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">Total Listings</span>
            </div>
        </div>
    );
}

export default TotalListings;
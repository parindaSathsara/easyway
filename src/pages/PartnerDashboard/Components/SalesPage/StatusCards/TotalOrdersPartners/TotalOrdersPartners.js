import './TotalOrdersPartners.css';

function TotalOrdersPartner(props) {
    return (
        <div className="col-md-4">
            <div className="cardContainer bg-yellowpartner-card">
                <i className="fa fa-shopping-bag"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">Total Orders</span>
            </div>
        </div>
    );
}

export default TotalOrdersPartner;
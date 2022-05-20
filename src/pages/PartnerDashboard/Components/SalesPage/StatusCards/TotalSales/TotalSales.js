import './TotalSales.css';

function TotalSales(props) {
    return (
        <div className="col-md-4">
            <div className="cardContainer bg-redPartner-card">
                <i className="fa fa-usd"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">Total Sales (Last 12 Months)</span>
            </div>
        </div>
    );
}

export default TotalSales;
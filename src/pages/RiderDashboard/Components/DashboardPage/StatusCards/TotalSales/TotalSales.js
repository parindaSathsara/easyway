import './TotalSales.css';

function TotalSalesRider(props) {
    return (
        <div className="col-md-4">
            <div className="cardContainer bg-totalSalesRider-card">
                <i className="fa fa-usd"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">Total Sales (Last 12 Months)</span>
            </div>
        </div>
    );
}

export default TotalSalesRider;
import './totalorders.css';

function TotalOrders(props) {
    return (
        <div className="col-md-3">
            <div className="cardContainer bg-blue-card">
                <i className="fa fa-cubes"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">EW Orders</span>
            </div>
        </div>
    );
}

export default TotalOrders;
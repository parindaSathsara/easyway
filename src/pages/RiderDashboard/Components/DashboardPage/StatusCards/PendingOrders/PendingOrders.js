import './PendingOrders.css';

function PendingOrders(props) {
    return (
        <div className="col-md-4">
            <div className="cardContainer bg-blueRider-card">
                <i className="fa fa-bullhorn"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">Pending Orders</span>
            </div>
        </div>
    );
}

export default PendingOrders;
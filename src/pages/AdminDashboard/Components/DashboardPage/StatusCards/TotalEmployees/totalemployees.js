import './totalemployees.css';

function TotalEmployees(props) {
    return (
        <div className="col-md-3">
            <div className="cardContainer bg-red-card">
                <i className="fa fa-users"></i>
                <span className="cardNumber">{props.count}</span>
                <span className="cardTitle">EW Employees</span>
            </div>
        </div>
    );
}

export default TotalEmployees;
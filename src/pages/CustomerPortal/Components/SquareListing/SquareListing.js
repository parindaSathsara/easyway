import { NavLink } from 'react-router-dom';
import './SquareListing.css'

function SquareListing(props) {


    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <figure className="card card-product-grid">
                <NavLink to={`/customerportal/listing/${props.listingid}`} target="_blank" className="img-wrap">
                    <img src={props.image} />
                </NavLink>
                <figcaption className="info-wrap border-top">
                    <NavLink to={`/customerportal/listing/${props.listingid}`} target="_blank" className="title text-truncate listingTitleText">{props.title}</NavLink><br></br>
                    <label className="lblServiceName">{props.servicename}</label>
                    <div className="price-wrap">
                        <span className="price" style={{ fontSize: 20, fontWeight: 600 }}>{"LKR " + props.price}</span>
                    </div>
                    <small className="text-muted">{props.partnername}</small>

                </figcaption>
            </figure>
        </div>
    );
}


export default SquareListing;
import './SquareListing.css'

function SquareListing(props) {


    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <figure className="card card-product-grid">
                <a href="#" className="img-wrap">
                    <img src={props.image} />
                </a>
                <figcaption className="info-wrap border-top">
                    <a href="#" className="title text-truncate listingTitleText">{props.title}</a><br></br>
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
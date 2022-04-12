import logoimg from '../../../../assets/images/easywaymain.png';
import './NavBar.css'
function CustomerNavBar() {
    return (
        <>
            <header className="section-header">
                <section className="header-main bg-white">
                    <div className="container">
                        <div className="row gy-3 align-items-center">
                            <div className="col-lg-2 col-sm-4 col-4">
                                <a href="" className="navbar-brand">
                                    <img className="logo" src={logoimg} />
                                </a> {/* brand end.// */}
                            </div>
                            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                                <div className="float-end">
                                    <a href="#" className="btn btn-light">
                                        <i className="fa fa-user" />  <span className="ms-1 d-none d-sm-inline-block">Sign in</span>
                                    </a>
                                    <a href="#" className="btn btn-light">
                                        <i className="fa fa-heart" />  <span className="ms-1 d-none d-sm-inline-block">Wishlist</span>
                                    </a>
                                    <a data-bs-toggle="offcanvas" href="#offcanvas_cart" className="btn btn-light">
                                        <i className="fa fa-shopping-cart" /> <span className="ms-1">My cart </span>
                                    </a>
                                </div>
                            </div> {/* col end.// */}
                            <div className="col-lg-5 col-md-12 col-12">
                                <form action="#" className>
                                    <div className="input-group">
                                        <input type="search" className="form-control" style={{ width: '55%' }} placeholder="Search" />
                                        <button className="btn btn-primary">
                                            <i className="fa fa-search" />
                                        </button>
                                    </div> {/* input-group end.// */}
                                </form>
                            </div> {/* col end.// */}
                        </div> {/* row end.// */}
                    </div> {/* container end.// */}
                </section> {/* header-main end.// */}
                
            </header> {/* section-header end.// */}

        </>

    );
}


export default CustomerNavBar;
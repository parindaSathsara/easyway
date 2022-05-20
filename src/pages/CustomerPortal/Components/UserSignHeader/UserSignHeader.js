import logoimg from '../../../../assets/images/easywaymain.png'

function UserSignHeaders() {

    return (
        <header className="section-header border-bottom">
            <section className="header-main">
                <div className="container">
                    <div className="row gy-3 align-items-center">
                        <div className="col-4">
                            <a href="http://bootstrap-ecommerce.com" className="brand-wrap">
                                <img className="logo" src={logoimg} />
                            </a>
                        </div>
                        <div className="col-8">
                            <div className="float-end">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header> 
    );
}

export default UserSignHeaders;
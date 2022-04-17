import './TopHeadingNav.css'

function TopHeadingNav() {

    return (
        <header className="section-header border-bottom">
            <section className="header-top-light border-bottom">
                <div className="container">
                    <nav className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                        <div className="nav">
                            <a href="#" className="nav-link p-2">  <i className="fab fa-lg fa-facebook" /></a>
                            <a href="#" className="nav-link p-2">  <i className="fab fa-lg fa-instagram" /></a>
                            <a href="#" className="nav-link p-2">  <i className="fab fa-lg fa-twitter" /></a>
                            <a href="#" className="nav-link p-2">  <i className="fab fa-lg fa-linkedin" /></a>
                        </div>

                        <ul className="nav">
                            <li className="nav-item dropdown">
                               
                                <select class="form-select form-select-sm TopNavDropDown" aria-label=".form-select-sm example">
                                    <option selected>District</option>
                                    <option value="1">Galle</option>
                                    <option value="2">Matara</option>
                                    <option value="3">Hambanthota</option>
                                </select>
                            </li>

                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );

}

export default TopHeadingNav;
import logoimg from '../../../../assets/images/easywaymain.png';
import './NavBarBreadCrumb.css'
function CustomerNavBarBreadCrumb() {
    return (
        <>
            <section class="navbarCustomer padding-y-sm">
                <div class="container">

                    <ol class="breadcrumb ondark mb-0">
                        <li class="breadcrumb-item"><a href="#">Listing</a></li>
                        <li class="breadcrumb-item"><a href="#">Data</a></li>
                        <li class="breadcrumb-item">Data</li>
                    </ol>

                </div> 
            </section>
        </>

    );
}


export default CustomerNavBarBreadCrumb;
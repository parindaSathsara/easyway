import logoimg from '../../../../assets/images/easywaymain.png';
import './NavBarSecondary.css'
function CustomerNavBarSecondary() {
    return (
        <>
            <section className="bg-primary navbarCustomer py-5">
                <div className="container">
                    <h2 className="text-white">Men's wear</h2>
                    <ol className="breadcrumb ondark mb-0">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Category</a></li>
                        <li className="breadcrumb-item">Data</li>
                    </ol>
                </div> {/* container //  */}
            </section>

        </>

    );
}


export default CustomerNavBarSecondary;
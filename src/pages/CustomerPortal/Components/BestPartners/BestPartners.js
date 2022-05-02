import './BestPartners.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import PartnerDashboard from '../../../PartnerDashboard/Dashboard/Dashboard';
import { NavLink } from 'react-router-dom';

function BestPartners() {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        getPartners();
    }, []);

    const getPartners = () => {
        axios.get('/api/partners/getAllPartners').then(res => {

            if (res.data.status === 200) {
                setPartners(res.data.partners);
                console.log(res.data.partners);
            }
        })
    }

    return (
        <>
            <section class="padding-top" style={{ paddingTop: 75 }}>
                <div class="container">

                    <header class="section-heading">
                        <h4 class="section-title">Best Partners</h4>
                    </header>

                    <div className="content-body">
                        <div className="row gy-4">
                            {partners.map((partnersDetails) => (
                                <div className="col-lg col-md-3 col-sm-4 col-6">
                                    <NavLink target={"_blank"} to={"/customerportal/partnerprofilepage/"+partnersDetails["partnerid"]} className="item-link text-center">
                                        <div className="mb-2">
                                            <img className="icon icon-xl rounded-circle" width={120} height={120} src={partnersDetails['profilepic']} />
                                        </div>
                                        <span className="text">{partnersDetails['partnername']} </span>
                                    </NavLink>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default BestPartners;
import './NavigationHeader.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function NavigationHeader() {

    const [serviceslist, setServicesList] = useState([]);

    const getServicesList = () => {
        axios.get('/api/getservices').then(res => {

            if (res.data.status === 200) {
                setServicesList(res.data.services);
                console.log(res.data.services);
            }


        })
    }


    useEffect(() => {
        getServicesList();
    }, []);




    return (
        <section className="section-intro padding-top-sm">
            <div className="container">
                <main className="card p-3">
                    <div className="row">
                        <aside className="col-lg-3">
                            <nav className="nav flex-column nav-pills">

                                {serviceslist.map((service) => (
                                    <NavLink to={`/customerportal/servicepartner/${service.serviceid}`} className="nav-link" activeClassName="active" >{service['servicename']}</NavLink>
                                ))}

                            </nav>
                        </aside>
                        <div className="col-lg-9">
                            <article className="card-banner p-5 bg-primary" style={{ height: '360px' }}>
                                <div style={{ maxWidth: '500px' }}>
                                    <h3 className="text-white">We make the things you need arrive on time </h3>
                                    <p className="text-white">You focus on what you need to do</p>
                                    <a href="#" className="btn btn-warning"> View more </a>
                                </div>
                            </article>
                        </div>
                    </div>
                </main>
            </div >
        </section >
    );
}

export default NavigationHeader;
import './NewListedServices.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import SquareListing from '../SquareListing/SquareListing';

function NewListedServices() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        getListings();
    }, []);

    const getListings = () => {
        axios.get('/api/partners/getListings').then(res => {

            if (res.data.status === 200) {
                setListings(res.data.listings);
                console.log(res.data.listings);
            }
        })
    }

    return (
        <>
            <section class="padding-top" style={{ paddingTop: 75 }}>
                <div class="container">

                    <header class="section-heading">
                        <h4 class="section-title">Recent Listed Services</h4>
                    </header>

                    <div class="row">
                        {listings.map((listingsDet) => (

                            <SquareListing 
                            listingid={listingsDet['listingid']}
                            image={listingsDet['listingimageurl']}
                            title={listingsDet['listingtitle']} 
                            servicename={listingsDet['servicename']}
                            price={listingsDet['listingprice']}
                            partnername={listingsDet['partnername']}
                            >

                            </SquareListing>

                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}


export default NewListedServices;
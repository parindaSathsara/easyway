import axios from 'axios'
import { useEffect, useState } from "react"
import SquareListing from '../../SquareListing/SquareListing';
import { useHistory, useParams } from 'react-router-dom';

function ServiceFilter() {

    const { id } = useParams()

    const [listings, setListings] = useState([]);
    const [idState,setIdState]=useState(id)

    const getListings = (serviceIDD) => {

        console.log(serviceIDD)
        axios.get('/api/partners/getListings').then(res => {

            if (res.data.status === 200) {

                // console.log(res.data.listings);
                const filteredData = res.data.listings.filter(
                    (listingsData) => listingsData.serviceid == serviceIDD
                );

                setListings(filteredData)
            }
        })
    }



    useEffect(() => {
        setIdState(id)
        getListings(id)

    }, [id]);


    return (
        <div className="row">
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
    );
}

export default ServiceFilter;
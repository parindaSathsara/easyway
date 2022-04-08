
import NewListing from "../ContainerCards/NewListings/NewListings";

function CreateListingMaster() {
    return (
        <div className="DPMaster">
            <div className="col-12">
                <div className='container'>
                    <div className="row">
                        <NewListing></NewListing>
                    </div>
                    
                </div>
            </div>
        </div>

    );
}

export default CreateListingMaster;
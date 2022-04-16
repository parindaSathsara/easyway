
import './FSPreLoader.css'

import { BallSpinner } from "react-spinners-kit";

function FSPreLoader() {


    return (
        <div className="w-100 h-100 p-3 fullScreenPreLoader">
            <div className='preLoaderElements'>
                <img src={require('../../assets/images/logo.png')} className='mb-4' alt="" width={200}></img>

                    <BallSpinner
                        progress={true}
                        color="#FFB600"
                        shadow={false}
                        loaderSpeed={500}
                    />
            </div>
        </div>
    );

}

export default FSPreLoader;

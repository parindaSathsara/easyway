import React, { useEffect, useState, useRef, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './AllListings.css'
import axios from 'axios';
import MaterialTable from "material-table";
import { alpha } from '@material-ui/core/styles';
import { render } from '@testing-library/react';


function AllListings() {


    const [listings, setListings] = useState([]); //Services List State

    const data = {
        columns: [
            {
                title: "",
                field: "listingid",
                render: listingdata => <div class="btn-group">
                    <button className="btn btn-light btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    </button>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="#">Edit</Link>
                        <Link className="dropdown-item" to="#">Delete</Link>
                        <Link className="dropdown-item" to={`/customerportal/listing/${listingdata.listingid}`} target='_blank'>View</Link>
                    </div>
                </div>
            },
            {
                title: "Listing Image",
                field: "listingimage",
                render: listingdata => <img src={listingdata.listingimage} alt="" border="3" height="100" width="100" />
            },

            {
                title: "Title",
                field: "listingtitle",
            },

            {
                title: "Publish Date",
                field: "listingpublishdate",
            },
            {
                title: "Ending Date",
                field: "listingendingdate",
            },
            {
                title: "Listing Type",
                field: "listingtype",
            },


        ],

        rows: listings.map(listingdata => {
            return {
                listingid:listingdata.listingid,
                listingimage: listingdata.listingimageurl,
                listingtitle: listingdata.listingtitle,
                listingpublishdate: listingdata.listingpublishdate,
                listingendingdate: listingdata.listingendingdate,
                listingtype: listingdata.listingtype,
            }
        }),
    };



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
        <div className="col-xl-12 mx-auto mt-5">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Listings
                    </h5>
                </div>
                {/* <MDBDataTableV5 hover scrollX maxHeight='400px' data={data} getValueCheckBox={(val) => console.log(val)} searchTop searchBottom={false} /> */}
                <MaterialTable
                    title={""}
                    data={data.rows}
                    columns={data.columns}
                    options={{
                        sorting: true, search: true,
                        searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
                        filtering: false, paging: true, pageSizeOptions: [5, 10, 20, 25, 50, 100], pageSize: 5,
                        paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
                        exportAllData: true, exportFileName: "Services Data", addRowPosition: "first", actionsColumnIndex: -1, selection: false,
                        showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
                            disabled: rowData.serviceid == null,
                            // color:"primary"
                        }),
                        columnsButton: true,
                    }}
                />
            </div>
        </div>

    );

}

export default AllListings;

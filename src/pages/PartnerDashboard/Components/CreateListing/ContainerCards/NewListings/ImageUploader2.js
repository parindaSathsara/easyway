import React, { Component } from 'react'
import { useState } from 'react';
import storage from '../../../../../../firebase-config';
import firebase from "firebase";

export default class FileUploadPage extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            progress: 0,
            downloadURL: null
        }
    }


    handleChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
        // console.log(e.target.files[0])
    }

    handleUpload = (e) => {

        e.preventDefault();
        // console.log(this.state.image);
        let file = this.state.image;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child('images/' + file.name).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
                this.setState({ progress })
            }, (error) => {
                throw error
            }, () => {
                // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    this.setState({
                        downloadURL: url
                    })
                })
                document.getElementById("file").value = null

            }
        )
    }


    render() {
        return (
            <div className="App">
                <h4>upload image</h4>
                <label>
                    Choose file
                    <input type="file" id="file" onChange={this.handleChange} />
                </label>

                {this.state.progress}
                <button className="button" onClick={this.handleUpload}>Upload</button>

            </div>
        )
    }
}

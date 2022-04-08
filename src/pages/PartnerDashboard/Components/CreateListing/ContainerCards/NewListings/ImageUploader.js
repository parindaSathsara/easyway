import React from "react";
import ReactDOM from "react-dom";
import ImageUploader from "react-images-upload";
import firebase from "firebase";


class ImageUpload extends React.Component {

  
  onDrop(pictureFiles, pictureDataURLs) {


    console.log(pictureFiles);


    console.log(pictureFiles[0]['name']);

    let file = pictureFiles[0];
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child('images/' + file['name']).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
        console.log(progress);
      }, (error) => {
        throw error
      }, () => {
        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
        })

      }
    )
  }

  render() {
    return (
      <ImageUploader
        withIcon={false}
        withPreview={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    );
  }
}

export default ImageUpload;
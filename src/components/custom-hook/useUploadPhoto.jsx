

import React from "react";
import { StoreContext } from "../store/StoreContext";
import { setError, setMessage } from "../store/StoreAction";


const useUploadPhoto = (url) => {
  const [photo, setPhoto] = React.useState(null);
  const [photo1, setPhoto1] = React.useState(null);
  const { dispatch } = React.useContext(StoreContext);
  const uploadPhoto = async () => {
    // if (photo) {
    //   const fd = new FormData();
    //   fd.append("photo", photo);
    //   const data = await fetchFormData(devApiUrl + url, fd);
    // }
  };
  const uploadPhoto1 = async () => {
    // if (photo) {
    //   const fd = new FormData();
    //   fd.append("photo", photo);
    //   const data = await fetchFormData(devApiUrl + url, fd);
    // }
  };
  const handleChangePhoto = (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      setPhoto("");
      dispatch(setError(false));
      dispatch(setMessage(""));
      return;
    }

    const img = e.target.files[0];
    if (img.size > 50000) {
      dispatch(setError(true));
      dispatch(
        setMessage(
          "Photo is too big. It should be less than 5Kb and 80x80px size for better result."
        )
      );
    } else {
      setPhoto(img);
      dispatch(setError(false));
    }
  };
  const handleChangePhoto1 = (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      setPhoto1("");
      dispatch(setError(false));
      dispatch(setMessage(""));
      return;
    }

    const img = e.target.files[0];
    if (img.size > 50000) {
      dispatch(setError(true));
      dispatch(
        setMessage(
          "Photo is too big. It should be less than 5Kb and 80x80px size for better result."
        )
      );
    } else {
      setPhoto1(img);
      dispatch(setError(false));
    }
  };

  return { uploadPhoto, handleChangePhoto, photo, handleChangePhoto1, photo1, uploadPhoto1 };
};

export default useUploadPhoto;

import { StoreContext } from "@/components/store/StoreContext";
import { Form, Formik } from "formik";
import React from "react";
import { ImagePlusIcon, X } from "lucide-react";
import { setIsAdd, setMessage, setSuccess, setValidate } from "@/components/store/StoreAction";
import ModalWrapper from "../partials/modals/ModalWrapper";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import {
  InputPhotoUpload,
  InputSelect,
  InputText,
} from "@/components/helpers/FormInputs";
import { imgPath } from "@/components/helpers/functions-general";
import * as Yup from "Yup";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import useQueryData from "@/components/custom-hook/useQueryData";

const ModalAddClothes = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");
  const { uploadPhoto, handleChangePhoto, photo } =
  useUploadPhoto("/v2/upload-photo");

  const { uploadPhoto1, handleChangePhoto1, photo1 } =
  useUploadPhoto("/v2/upload-photo");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v2/clothe/${itemEdit.clothe_aid}` : `/v2/clothe`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["clothe"],
      });


      // show error box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
      } else {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const {
    isFetching,
    error,
    data: categ,
    status,
  } = useQueryData(
    `/v2/category`, //enpoint
    "get", //method
    "category" //key
  );

  const initVal = {
    clothe_image: itemEdit ? itemEdit.clothe_image : "",
    clothe_image1: itemEdit ? itemEdit.clothe_image1 : "",
    clothe_title: itemEdit ? itemEdit.clothe_title : "",
    clothe_price: itemEdit ? itemEdit.clothe_price : "",
    clothe_category_id: itemEdit ? itemEdit.clothe_category_id : "",
    clothe_size: itemEdit ? itemEdit.clothe_size : "",
  };
  const yupSchema = Yup.object({
    clothe_title: Yup.string().required("Required"),
    clothe_price: Yup.string().required("Required"),
    clothe_size: Yup.string().required("Required"),
    clothe_category_id: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Foods</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                clothe_image:
                  (itemEdit?.clothe_image === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && itemEdit?.clothe_image !== photo?.name)
                    ? photo?.name || ""
                    : itemEdit?.clothe_image || "",

                    clothe_image1:
                  (itemEdit?.clothe_image1 === "" && photo1) ||
                  (!photo1 && "") ||
                  (photo1 === undefined && "") ||
                  (photo1 && itemEdit?.clothe_image1 !== photo1?.name)
                    ? photo1?.name || ""
                    : itemEdit?.clothe_image1 || "",
              });
              uploadPhoto();
              uploadPhoto1();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[80vh] h-full overflow-y-auto custom-scroll">
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] mb-10">
                        <label htmlFor="">Photo 1</label>
                        {itemEdit === null && photo === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              photo
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.clothe_image // check db
                            }
                            alt="employee photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto `}
                          />
                        )}
                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full 
                          }`}
                        />
                      </div>
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="">Photo 2</label>
                        {itemEdit === null && photo1 === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              photo1
                                ? URL.createObjectURL(photo1) // preview
                                : imgPath + "/" + itemEdit?.clothe_image1 // check db
                            }
                            alt="employee photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto `}
                          />
                        )}
                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto1(e)}
                          onDrop={(e) => handleChangePhoto1(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full 
                          }`}
                        />
                      </div>

                      <div className="input-wrap mt-8">
                        <InputText
                          label="Title"
                          type="text"
                          name="clothe_title"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Price"
                          type="text"
                          name="clothe_price"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Sizes"
                          type="text"
                          name="clothe_size"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect label="Category" name="clothe_category_id"  onChange={handleChange}>
                        <option value="hidden"></option>
                        {categ?.data.map((item, key) => {
                          return(
                            <>
                            {item.category_is_active === 1 && (
                              <option value={item.category_aid} key={key}>{item.category_title}</option>
                            )}
                            </>
                          )
                        })}
                          
                        </InputSelect>
                      </div>
                    </div>
                    <div className="form-action flex p-4 justify-end gap-3">
                      <button className="btn btn-add" type="submit">
                      {mutation.isPending && <SpinnerButton />} 
                      {itemEdit ? "Save" : "Add"}
                      </button>
                      <button
                        className="btn btn-cancel"
                        type="reset"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddClothes;

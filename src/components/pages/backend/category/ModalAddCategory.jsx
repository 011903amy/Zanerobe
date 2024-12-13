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

const ModalAddCategory = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
 
  const { uploadPhoto, handleChangePhoto, photo } =
  useUploadPhoto("/v2/upload-photo");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v2/category/${itemEdit.category_aid}` : `/v2/category`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["category"],
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

  const handleClose = () => dispatch(setIsAdd(false));

  const initVal = {

    category_title: itemEdit ? itemEdit.category_title : "",
   
  };
  const yupSchema = Yup.object({
    category_title: Yup.string().required("Required"),

  });

  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Category</h5>
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
                category_image:
                  (itemEdit?.category_image === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && itemEdit?.category_image !== photo?.name)
                    ? photo?.name || ""
                    : itemEdit?.category_image || "",
              });
              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[80vh] h-full overflow-y-auto custom-scroll">
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="">Photo</label>
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
                              itemEdit === null
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.category_image // check db
                            }
                            alt="Category photo"
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
                            ${
                              mutation.isPending ? "pointer-events-none" : ""
                            }`}
                        />
                      </div>

                      <div className="input-wrap mt-8">
                        <InputText
                          label="Title"
                          type="text"
                          name="category_title"
                        />
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

export default ModalAddCategory;

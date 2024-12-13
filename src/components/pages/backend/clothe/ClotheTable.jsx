import Pills from "../partials/Pills";
import LoadMore from "../partials/LoadMore";
import ModalDelete from "../partials/modals/ModalDelete";
import ModalConfirm from "../partials/modals/ModalConfirm";
import React from "react";
import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";

import { setIsAdd, setIsConfirm, setIsDelete } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { clothes } from "../clothe-data";
import useQueryData from "@/components/custom-hook/useQueryData";
import TableLoader from "../partials/TableLoader";
import IconServerError from "../partials/IconServerError";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import IconNoData from "../partials/IconNoData";


const ClotheTable = ({setItemEdit}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isActive, setIsActive] = React.useState(0)
  const [id, setId] = React.useState(null)
  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/v2/clothe`, // endpoint
    "get", // method
    "clothe"
  );
  let counter = 1;
  

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.clothe_aid)
  };
  const handleRestore = (item) => {
    dispatch(setIsConfirm(true));
    setIsActive(1)
    setId(item.clothe_aid)
  };
  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setIsActive(0)
    setId(item.clothe_aid)
  };
 
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };



  return (
    <div>
      {" "}
      <div className="relative p-4 bg-secondary rounded-md mt-10 border border-line">
      {!isLoading || (isFetching && <SpinnerTable />)}
        <div className="table-wrapper custom-scroll">
         
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sizes</th>
                
                
                
                <th></th>
              </tr>
            </thead>
            <tbody>
            {((isLoading && !isFetching) || result?.data.length === 0) && (
                <tr>
                  <td colSpan="100%">
                    {isLoading ? (
                      <TableLoader count={30} cols={6} />
                    ) : (
                      <IconNoData />
                    )}
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan="100%">
                    <IconServerError />
                  </td>
                </tr>
              )}

              {result?.data.map((item, key) => {

                return(
                <tr key={key}>
                  <td>{counter++}.</td>
                  <td>
                    <Pills isActive={item.clothe_is_active}/>
                  </td>
                  <td>{item.clothe_title}</td>
                  <td>{item.clothe_price}</td>
                  <td>{item.category_title}</td>
                  <td>{item.clothe_size}</td>
                  
                  <td>
                    <ul className="table-action">
                    {item.clothe_is_active ? (
                        <>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Edit"
                              onClick={() => handleEdit(item)}
                            >
                              <FilePenLine />
                            </button>
                          </li>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Archive"
                              onClick={() => handleArchive(item)}
                            >
                              <Archive />
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Restore"
                              onClick={() => handleRestore(item)}
                            >
                              <ArchiveRestore />
                            </button>
                          </li>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <Trash2 />
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>

          <LoadMore />
        </div>
      </div>
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/v2/clothe/${id}`}
          queryKey="clothe"
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          queryKey="clothe"
          mysqlApiArchive={`/v2/clothe/active/${id}`}
          active={isActive}
        />
      )}
      
    </div>
  );
};

export default ClotheTable;

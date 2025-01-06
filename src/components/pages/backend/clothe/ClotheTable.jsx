import Pills from "../partials/Pills";
import LoadMore from "../partials/LoadMore";
import ModalDelete from "../partials/modals/ModalDelete";
import ModalConfirm from "../partials/modals/ModalConfirm";
import React from "react";
import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";

import { setIsAdd, setIsArchive, setIsConfirm, setIsDelete } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { clothes } from "../clothe-data";
import useQueryData from "@/components/custom-hook/useQueryData";
import TableLoader from "../partials/TableLoader";
import IconServerError from "../partials/IconServerError";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import IconNoData from "../partials/IconNoData";
import SearchBarWithFilterStatus from "../partials/SearchBarWithFilterStatus";
import { useInView } from "react-intersection-observer";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";


const ClotheTable = ({setItemEdit}) => {
   const { store, dispatch } = React.useContext(StoreContext);
   const [isActive, setIsActive] = React.useState(0);
   const [id, setId] = React.useState(null);
   const [isFilter, setIsFilter] = React.useState(false);
   const [onSearch, setOnSearch] = React.useState(false);
   const [statusFilter, setStatusFilter] = React.useState("");
   const search = React.useRef({ value: "" });
   const [page, setPage] = React.useState(1);
   const { ref, inView } = useInView();
   let counter = 1;
  // const {
  //   isLoading,
  //   isFetching,
  //   error,
  //   data: result,
  // } = useQueryData(
  //   `/v2/clothe`, // endpoint
  //   "get", // method
  //   "clothe"
  // );
  

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
const {
  data: result,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
} = useInfiniteQuery({
  queryKey: ["clothe", onSearch, isFilter, statusFilter],
  queryFn: async ({ pageParam = 1 }) =>
    await queryDataInfinite(
      "/v2/clothe/search", // search or filter endpoint
      `/v2/clothe/page/${pageParam}`, //page api/ endpoint
      isFilter || store.isSearch, //search boolean
      {
        isFilter,
        statusFilter,
        searchValue: search?.current.value,
        id: "",
      } //payload
    ),
  getNextPageParam: (lastPage) => {
    if (lastPage.page < lastPage.total) {
      return lastPage.page + lastPage.count;
    }
    return;
  },
  refetchOnWindowFocus: false,
});
 React.useEffect(() => {
   if (inView) {
     setPage((prev) => prev + 1);
     fetchNextPage();
   }
 }, [inView]);


  return (
    <div>
      <SearchBarWithFilterStatus
        search={search}
        dispatch={dispatch}
        store={store}
        result={result}
        isFetching={isFetching}
        setOnSearch={setOnSearch}
        onSearch={onSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setIsFilter={setIsFilter}
        setPage={setPage}
      />
      <div className="relative p-4 bg-secondary rounded-md mt-10 border border-line">
        {/* {!isLoading || (isFetching && <SpinnerTable />)} */}
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
              {/* LOADING OF NO DATA */}
              {(status === "pending" || result?.pages[0].data.length === 0) && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    {status === "pending" ? (
                      <TableLoader cols={2} count={20} />
                    ) : (
                      <IconNoData />
                    )}
                  </td>
                </tr>
              )}

              {/* ERROR */}
              {error && (
                <tr>
                  <td colSpan={100}>
                    <IconServerError />
                  </td>
                </tr>
              )}

              {result?.pages.map((page, pageKey) => (
                <React.Fragment key={pageKey}>
                  {page.data.map((item, key) => {
                    return (
                      <tr key={key} className="group relative cursor-pointer">
                        <td>{counter++}.</td>
                        <td>
                          {item.clothe_is_active ? (
                            <Pills text="Active" />
                          ) : (
                            <Pills text="Inactive" />
                          )}
                        </td>
                        <td>{item.clothe_title}</td>
                        <td>{item.clothe_price}</td>
                        <td>{item.category_title}</td>
                        <td>{item.clothe_size}</td>

                        <td
                          colSpan="100%"
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <div className="flex items-center justify-end gap-2 mr-5">
                            {item.clothe_is_active == 1 ? (
                              <>
                                <button
                                  type="button"
                                  className="tooltip"
                                  data-tooltip="Edit"
                                  disabled={isFetching}
                                  onClick={() => handleEdit(item)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  type="button"
                                  className="tooltip"
                                  data-tooltip="Archive"
                                  disabled={isFetching}
                                  onClick={() => handleArchive(item)}
                                >
                                  <FaArchive />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="tooltip"
                                  data-tooltip="Restore"
                                  disabled={isFetching}
                                  onClick={() => handleRestore(item)}
                                >
                                  <FaTrashRestore />
                                </button>
                                <button
                                  type="button"
                                  className="tooltip"
                                  data-tooltip="Delete"
                                  disabled={isFetching}
                                  onClick={() => handleDelete(item)}
                                >
                                  <FaTrash />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="pb-10 flex items-center justify-center text-white">
            <LoadMore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
            />
          </div>
        </div>
      </div>
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
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
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          mysqlEndpoint={`/v2/clothe/active/${id}`}
          queryKey={"clothe"}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          mysqlEndpoint={`/v2/clothe/active/${id}`}
          queryKey={"clothe"}
        />
      )}
    </div>
  );
};

export default ClotheTable;

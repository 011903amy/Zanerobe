import React from 'react'
import SearchBar from '../partials/SearchBar'
import { Plus } from 'lucide-react'
import Footer from '../partials/Footer'
import SideNavigation from '../partials/SideNavigation'
import Header from '../partials/Header'
import { StoreContext } from '@/components/store/StoreContext'
import { setIsAdd } from '@/components/store/StoreAction'
import ClotheTable from './ClotheTable'
import ModalAddClothes from './ModalAddClothes'


const Clothes = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null)
  }
  return (
    <>
    <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="clothe" />
          <main>
            <Header title="Clothes" subtitle='Zanerobe Clothe Management' />
            <div className="p-8">
              <div className="flex justify-between items-center">
                <SearchBar />
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <ClotheTable setItemEdit={setItemEdit}/>
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && <ModalAddClothes itemEdit={itemEdit} />}
      {/* {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />} */}
    </>
  )
}

export default Clothes
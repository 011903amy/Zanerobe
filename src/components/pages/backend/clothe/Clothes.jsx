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
import ModalValidation from '../partials/modals/ModalValidation'
import ModalError from '../partials/modals/ModalError'
import ToastSuccess from '../partials/ToastSuccess'


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
                <div></div>
                <button className="btn btn-add mb-5" onClick={handleAdd}>
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
      {store.isAdd && <ModalAddClothes itemEdit={itemEdit} setIsAdd={setIsAdd} setItemEdit={setItemEdit} />}
      {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />}
    </>
  )
}

export default Clothes
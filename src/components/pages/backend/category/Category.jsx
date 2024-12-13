import { setIsAdd } from '@/components/store/StoreAction'
import { StoreContext } from '@/components/store/StoreContext'
import { Plus } from 'lucide-react'
import React from 'react'
import Footer from '../partials/Footer'
import Header from '../partials/Header'

import SearchBar from '../partials/SearchBar'
import SideNavigation from '../partials/SideNavigation'
import CategoryTable from './CategoryTable'

import ModalValidation from '../partials/modals/ModalValidation'
import ModalError from '../partials/modals/ModalError'
import ModalAddCategory from './ModalAddCategory'



const Category = () => {
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
          <SideNavigation menu="category" />
          <main>
            <Header title="Category" subtitle='Zanerobe Category Management' />
            <div className="p-8">
              <div className="flex justify-between items-center">
                <SearchBar />
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <CategoryTable setItemEdit={setItemEdit}/>
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && <ModalAddCategory itemEdit={itemEdit} />}
      {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />}
    </>
  )
}

export default Category
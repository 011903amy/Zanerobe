import { StoreContext } from '@/components/store/StoreContext'
import Header from '../partials/Header'
import SideNavigation from '../partials/SideNavigation'
import { Plus } from 'lucide-react'
import Footer from '../partials/Footer'
import { setIsAdd } from '@/components/store/StoreAction'
import SearchBar from '../partials/SearchBar'
import React from 'react'
import ModalAddClothes from '../clothe/ModalAddClothes'
import CategoryTable from './CategoryTable'
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

              <CategoryTable/>
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && <ModalAddCategory itemEdit={itemEdit} />}
      {/* {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />} */}
    </>
  )
}

export default Category
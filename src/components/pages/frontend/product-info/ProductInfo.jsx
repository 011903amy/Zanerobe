import React from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { imgPath } from '@/components/helpers/Functions-General'
import { Star } from 'lucide-react'
import { newArrivalArray } from '../home/new-arrival-data'
import { useParams } from 'react-router-dom'

const ProductInfo = () => {
  const {slug} = useParams()

  const getProductInfo = newArrivalArray.filter((item)=>item.slug===slug)
  console.log(getProductInfo)
  return (
    <>
    <Header/>
    <section className='product-info'>
      <div className="container">
        <div className="grid grid-cols-[1fr,500px] gap-5 mt-10">
          <main>
            <div className='flex gap-5'>
              <img src={`${imgPath}/${getProductInfo[0].img1}`} alt="" className='w-1/2'/>
              <img src={`${imgPath}/${getProductInfo[0].img2}`} alt="" className='w-1/2'/>
            </div>
          </main>
          <aside>
            <div className='mt-24 text-black'>
                
              <h3>{getProductInfo[0].title}</h3>

              <ul className='flex gap-1 my-2 text-black'>
              {Array.from(Array(getProductInfo[0].rating).keys()).map(
                      () => (
                        <li>
                          <Star fill={"black"} size={16} />
                        </li>
                      )
                    )}
                
                
                
                <p className='ml-5'>reviews(100)</p>
                </ul> 
                <h5 className='text-base font-semibold mb-4'>{getProductInfo.price}</h5>
                <p className='mb-2'>SKU-8934</p>

                  <div className='thubmnails flex gap-2 mt-6 flex-wrap'>
                    {getProductInfo[0].thumnails.map((item,key) => (
                    <img src={`${imgPath}/${item}`} alt="" className='size-[100px] rounded-md'key={key}/>  
                  ))}
                  </div>
                  <h6 className='mb-2 text-sm'>Select Your Size</h6>
                <ul className='sizes flex gap-2'>
                  {getProductInfo[0].sizes.map((item,key) => (
                  <li className='w-[50px] h-[30px] border border-black flex justify-center items-center hover:bg-black hover:text-white transition-colors cursor-pointer' key={key}>{`${item}`}</li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <Footer/>

    </>
  )
}

export default ProductInfo
import React, { useEffect, useState } from 'react';
import Attendence from '../../components/Attendence';
import Stats from '../../components/Stats';
import Navbar from '../../components/Navbar';
import './home.css'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { setCart } from '../../redux/auth';
export default function Home() {
  const [products, setProducts] = useState([]);
  const [tcart, settCart] = useState(useSelector((state) => state.cart));
  const dispatch = useDispatch();
  useEffect(() => {
    const getProducts = async () => {
      const responce = await Axios.get("https://64e0caef50713530432cafa1.mockapi.io/api/products");
      console.log(responce);
      setProducts(responce.data);
    }
    getProducts();
  }, []);
  const addtocart = (product) => {
    let temp = [...tcart];
    if (temp.includes(product)) {
      temp.splice(temp.indexOf(product));
    } else {
      temp.push(product);
    }
    settCart(temp);
    dispatch(setCart({
      cart: temp
    }));
    console.log(temp);
  }
  return (
    <>
      <Navbar />
      <div className='home-root'>
        <div className='s-attendance'>
          <div className='mark-attendance'>
            <Attendence />
          </div>
          <div className='attendance-stats'>
            <Stats />
          </div>
        </div>
          <p>Products</p>
        <div className='s-products'>
          {
            products.map((product) => {
              return (
                <div className='product' key={product.id}>
                  <img src={product.image} alt={product.productName} className='product-image'></img>
                  <p className='product-name'>{product.productName}</p>
                  <p className='product-price'>{product.price}</p>
                  <button className='add-to-cart' style={{ backgroundColor: tcart?.includes(product) ? "red" : "blue"}} onClick={() => { addtocart(product) }}>{
                    tcart?.includes(product) ? "Remove from Cart" : "Add to cart"
                  }</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json()
    //console.log(response[0],response[1]);
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])
  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg" alt="Burger"
                style={{ width: '100%', height: 'auto', filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg" alt="pastry"
                style={{ width: '100%', height: 'auto', filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://images.pexels.com/photos/1651166/pexels-photo-1651166.jpeg" alt="barbeque"
                style={{ width: '100%', height: 'auto', filter: "brightness(30%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems !== [] ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem={filterItems} options={filterItems.options[0]}></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}

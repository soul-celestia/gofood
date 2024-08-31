import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style = {{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousel">
                    <div className='carousel-caption' style = {{zIndex : "10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg" alt="Burger"
                            style={{ width: '100%', height: 'auto', filter:"brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg" alt="pastry"
                            style={{ width: '100%', height: 'auto', filter:"brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/1651166/pexels-photo-1651166.jpeg" alt="barbeque"
                            style={{ width: '100%', height: 'auto', filter:"brightness(30%)" }} />
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
    )
}

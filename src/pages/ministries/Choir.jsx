import React from 'react'
import { Carousel } from 'antd'
import choir from '../../assets/images/choir.jpg'
import choir1 from '../../assets/images/choir1.jpg'
import choir2 from '../../assets/images/choir2.jpg'
import choir3 from '../../assets/images/choir3.jpg'
import choir4 from '../../assets/images/choir4.jpg'
import choir5 from '../../assets/images/choir5.jpg'
import choir6 from '../../assets/images/choir6.jpg'

const carouselImages = [choir, choir1, choir2, choir3, choir4, choir5, choir6]

function Choir() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving At Choir
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
          The Choir Ministry of Grace Baptist Church is dedicated to glorifying God through sacred
          music, faithfully presenting solemn and hymnal songs that lead the congregation into
          reverent and Christ-centered worship.
        </p>
      </div>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`choir ministry moment ${index + 1}`}
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Choir

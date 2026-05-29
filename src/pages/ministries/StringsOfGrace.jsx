import React from 'react'
import { Carousel } from 'antd'
import sog from '../../assets/images/sog.jpg'
import sog1 from '../../assets/images/sog1.jpg'
import sog2 from '../../assets/images/sog2.jpg'
import sog3 from '../../assets/images/sog3.jpg'
import sog4 from '../../assets/images/sog4.jpg'
import sog5 from '../../assets/images/sog5.jpg'
import sog6 from '../../assets/images/sog6.jpg'

const carouselImages = [sog, sog1, sog2, sog3, sog4, sog5, sog6]

function StringsOfGrace() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving the String Of Grace
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
          The Music Ministry is dedicated to glorifying God through Christ-centered worship,
          providing musical leadership that enriches services and supports the proclamation of the
          Word. Through the Strings of Grace, our group of musicians faithfully offers instrumental
          excellence that fosters reverent worship.
        </p>
      </div>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`sog ministry moment ${index + 1}`}
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

export default StringsOfGrace

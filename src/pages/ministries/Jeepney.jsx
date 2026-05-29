import React from 'react'
import { Carousel } from 'antd'
import jeepny from '../../assets/images/jeepny.jpg'
import jeepny1 from '../../assets/images/jeepny1.jpg'
import jeepny2 from '../../assets/images/jeepny2.jpg'
import jeepny3 from '../../assets/images/jeepny3.jpg'
import jeepny4 from '../../assets/images/jeepny4.jpg'
import jeepny5 from '../../assets/images/jeepny5.jpg'
import jeepny6 from '../../assets/images/jeepny6.jpg'
import jeepny7 from '../../assets/images/jeepny7.jpg'

const carouselImages = [jeepny, jeepny1, jeepny2, jeepny3, jeepny4, jeepny5, jeepny6, jeepny7]

function Jeepney() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving At Jeepney
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
          The Jeepney Ministry of Grace Baptist Church serves as an outreach and support ministry,
          providing safe and reliable transportation that enables individuals and families to attend
          worship services, church activities, and spiritual gatherings.
        </p>
      </div>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`jeepny ministry moment ${index + 1}`}
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

export default Jeepney

import React from 'react'
import { Carousel } from 'antd'
import children from '../../assets/images/children.jpg'
import children1 from '../../assets/images/children1.jpg'
import children2 from '../../assets/images/children2.jpg'
import children3 from '../../assets/images/children3.jpg'
import children4 from '../../assets/images/children4.jpg'
import children5 from '../../assets/images/children5.jpg'
import children6 from '../../assets/images/children6.jpg'

const carouselImages = [children, children1, children2, children3, children4, children5, children6]

function Children() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving the Children
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
          The Children's Ministry of Grace Baptist Church is committed to providing a
          Christ-centered environment where children are taught the Word of God, nurtured in their
          spiritual growth, and guided in developing a personal relationship with Jesus Christ.
        </p>
      </div>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`children ministry moment ${index + 1}`}
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

export default Children

import React from 'react'
import { Carousel } from 'antd'
import cavalry from '../../assets/images/cavalry.jpg'
import cavalry1 from '../../assets/images/cavalry1.jpg'
import cavalry2 from '../../assets/images/cavalry2.jpg'
import cavalry3 from '../../assets/images/cavalry3.jpg'
import cavalry4 from '../../assets/images/cavalry4.jpg'
import cavalry5 from '../../assets/images/cavalry5.jpg'
import cavalry6 from '../../assets/images/cavalry6.jpg'

const carouselImages = [cavalry, cavalry1, cavalry2, cavalry3, cavalry4, cavalry5, cavalry6]

function Cavalry() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving the 2nd Cavalry Squadron
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
          With hearts committed to serving God and reaching souls, the members of Grace Baptist
          Church faithfully minister to the soldiers of the 2nd Cavalry Squadron every 1st and 3rd
          of the month. Through Bible studies, fellowship, and the preaching of God's Word, we aim
          to strengthen lives, encourage hearts, and lead brave men in uniform closer to Christ. As
          they serve and protect our nation, we are honored to share with them the hope, peace, and
          salvation found in the Lord Jesus Christ.
        </p>
      </div>

      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`Cavalry ministry moment ${index + 1}`}
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

export default Cavalry

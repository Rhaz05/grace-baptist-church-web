import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

import BobImage from '../assets/images/BandOfBrother.jpg'
import defaultImage from '../assets/images/place-holder-image.jpg'

const MinistryLayout = () => {
  const location = useLocation()

  const getMinistryDetails = () => {
    switch (location.pathname) {
      case '/ministries/bob':
        return {
          image: BobImage,
          title: 'Band Of Brothers',
          subtitle: 'BoB Subtitle',
        }
      case '/ministries/children':
        return {
          image: defaultImage,
          title: 'Children Ministry',
          subtitle: 'Children Subtitle',
        }
      case '/ministries/jeepney':
        return {
          image: defaultImage,
          title: 'Jeepney Ministry',
          subtitle: 'Jeepney Subtitle',
        }
      case '/ministries/youth':
        return {
          image: defaultImage,
          title: 'Youth Ministry',
          subtitle: 'Youth Subtitle',
        }
      case '/ministries/kitchen':
        return {
          image: defaultImage,
          title: 'Kitchen Ministry',
          subtitle: 'Kitchen Subtitle',
        }
      case '/ministries/choir':
        return {
          image: defaultImage,
          title: 'Choir Ministry',
          subtitle: 'Choir Subtitle',
        }
      case '/ministries/cavalry':
        return {
          image: defaultImage,
          title: 'Cavalry Ministry',
          subtitle: 'Cavalry Subtitle',
        }
      case '/ministries/multimedia':
        return {
          image: defaultImage,
          title: 'Multimedia Ministry',
          subtitle: 'Multimedia Subtitle',
        }
      case '/ministries/nursery':
        return {
          image: defaultImage,
          title: 'Nursery Ministry',
          subtitle: 'Nursery Subtitle',
        }
      case '/ministries/strings-of-grace':
        return {
          image: defaultImage,
          title: 'String of Grace Ministry',
          subtitle: 'String of Grace Subtitle',
        }
      case '/ministries/log':
        return {
          image: defaultImage,
          title: 'Log Ministry',
          subtitle: 'Log Subtitle',
        }
      default:
        return {
          image: defaultImage,
          title: 'OUR MINISTRIES',
          subtitle: 'GROWING TOGETHER IN FAITH',
        }
    }
  }

  const { image, title, subtitle } = getMinistryDetails()

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-white">
      <Header />

      <div className="relative w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center -mt-20 pt-20">
        <div className="absolute inset-0 z-0">
          <img src={image} alt={title} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-wide mb-2 uppercase">
            {title}
          </h1>
          <p className="text-sm md:text-lg tracking-[0.15em] font-light uppercase">{subtitle}</p>
        </div>

        <div className="absolute -bottom-px left-0 w-full overflow-hidden leading-none z-20">
          <svg
            className="relative block w-full h-10 md:h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 C300,20 900,20 1200,120 L1200,120 L0,120 Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>

      <main className="grow container mx-auto px-4 py-12 md:py-16 relative z-10 text-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default MinistryLayout

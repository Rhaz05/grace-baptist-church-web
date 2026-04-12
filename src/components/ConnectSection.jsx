import { FaUserFriends } from 'react-icons/fa'

const ConnectSection = () => {
  const options = [
    'Planning A Visit',
    'Salvation',
    'Baptism',
    'Joining The Church',
    'Volunteering',
    'Prayer Request',
    'Music Ministry',
  ]
  return (
    <div className="bg-church-dark border-b border-white/10 py-16">
      <div className="container mx-auto px-4 xl:max-w-5xl md:max-w-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-widest uppercase mb-4">
            Connect
          </h2>
          <p className="text-gray-300 italic">
            We'd love to meet you in person! Submit your contact info, and someone will reach out
            soon!
          </p>
        </div>
        <form className="flex flex-col space-y-6">
          <div className="flex xl:flex-row xl:justify-around md:flex-col md:mx-auto md:gap-10">
            <div className="flex flex-col md:mx-auto w-110 gap-6">
              <div className="space-y-2">
                <label className="text-white font-medium">Your Name *</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-church-red"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-medium">Your Phone *</label>
                <input
                  type="tel"
                  className="w-full p-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-church-red"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-medium">Your Email *</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-church-red"
                />
              </div>
            </div>
            <div className="space-y-5 mx-30">
              <p className="text-white text-center font-medium">I'd Like To Learn More About:</p>
              <div className="xl:flex xl:flex-col md:grid md:grid-cols-2 md:gap-x-30  gap-2">
                {options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="w-10 h-5 rounded border-gray-300 accent-church-red"
                    />
                    <span className="text-md">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-white font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full p-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-church-red"
            ></textarea>
          </div>
          <div className="flex justify-center pt-4">
            <button className="flex items-center gap-2 bg-white text-church-dark px-10 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-church-red hover:text-white transition-all duration-300 shadow-lg">
              <FaUserFriends className="text-lg" /> Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConnectSection

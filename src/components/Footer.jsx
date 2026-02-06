import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-church-dark border-t-4 border-church-red text-gray-300 text-sm relative z-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <h4 className="font-bold text-white uppercase text-lg">
                Grace Baptist Church
              </h4>
              <div className="w-16 h-1 bg-church-red mt-3"></div>
            </div>
            <p className="mb-6 text-gray-400 leading-relaxed">
              We are a community committed to sharing the love of Jesus Christ.
              Join us as we grow in faith and serve our city together.
            </p>
            <div className="flex gap-3">
              <SocialBtn
                icon={<FaFacebookF />}
                href="https://www.facebook.com/gracebaptistlucenacity"
              />

              <SocialBtn
                icon={<FaYoutube />}
                href="https://www.youtube.com/@GRACEBAPTISTCHURCHLUCENA"
              />
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 text-lg">Quick Links</h5>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/preaching" label="Preaching" />
              <FooterLink to="/events" label="Events" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 text-lg">Service Times</h5>
            <ul className="space-y-3">
              <ServiceTime label="Sunday School" time="9:00 AM" />
              <ServiceTime label="Morning Service" time="10:00 AM" />
              <ServiceTime label="Afternoon Service" time="4:00 PM" />
              <ServiceTime label="Wed. Prayer Meeting" time="5:30 PM" />
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 text-lg">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-church-red mt-1 flex-shrink-0" />
                <span>
                  Citta Grande 3 Grace Baptist Church, Lot 1<br />
                  Blk.41 Quezon, Ibabang Iyam Lucena City
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-church-red flex-shrink-0" />
                <span>042 784-4032</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-church-red flex-shrink-0" />
                <span>info@gracebaptist.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#111] py-6 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            &copy; {currentYear} Grace Baptist Church. All Rights Reserved.
          </p>
          <Link
            to="/admin"
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

const SocialBtn = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-church-red hover:border-church-red hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="flex items-center text-gray-400 hover:text-church-red hover:pl-1 transition-all duration-200"
    >
      <FaChevronRight className="text-[10px] mr-2 opacity-50" />
      {label}
    </Link>
  </li>
);

const ServiceTime = ({ label, time }) => (
  <li className="flex justify-between items-center border-b border-white/5 pb-2">
    <span className="text-gray-400">{label}</span>
    <span className="text-white font-medium">{time}</span>
  </li>
);

export default Footer;

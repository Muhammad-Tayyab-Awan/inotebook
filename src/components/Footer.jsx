import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/instagram.svg";
import twitterIcon from "../assets/twitter.svg";
import linkedinIcon from "../assets/linkedin.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  const socialMedia = [
    { name: "Facebook", icon: facebookIcon, link: "https://www.facebook.com" },
    { name: "Twitter", icon: twitterIcon, link: "https://www.twitter.com" },
    { name: "LinkedIn", icon: linkedinIcon, link: "https://www.linkedin.com" },
    {
      name: "Instagram",
      icon: instagramIcon,
      link: "https://www.instagram.com"
    }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-6 relative bottom-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer logo or branding */}
          <div className="mb-4 md:mb-0">
            <h1 className="flex items-baseline text-3xl font-bold">
              <span className="dark:text-gray-200">i</span>
              <span className="text-purple-500">Notebook</span>
            </h1>
            <p className="text-sm">© 2024 All Rights Reserved</p>
          </div>

          {/* Social media icons */}
          <div className="flex space-x-4 bg-yellow-300 p-2 rounded-xl">
            {socialMedia.map((media, index) => (
              <a
                key={index}
                href={media.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">{media.name}</span>
                <img src={media.icon} className="h-6 w-6" alt={media.name} />
              </a>
            ))}
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-6 text-center">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
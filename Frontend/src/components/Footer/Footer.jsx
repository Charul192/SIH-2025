import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/logo";
import { AppContext } from "../../context/AppContext";

export default function Footer() {
  const { Dark } = useContext(AppContext);

  // Define common classes for links to keep the code DRY
  const linkHoverClass = Dark ? "hover:text-white" : "hover:text-black";
  const textColorClass = Dark ? "text-gray-400" : "text-gray-500";
  const headingColorClass = Dark ? "text-white" : "text-gray-900";

  return (
    // CHANGE: Footer background and top border are now dynamic
    <footer
      className={`border-t ${Dark ? "bg-black border-gray-700" : "bg-white border-gray-200"
        }`}
    >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            {/* Assuming your Logo component is already theme-aware */}
            <Logo />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              {/* CHANGE: Heading text color is dynamic */}
              <h2 className={`mb-6 text-sm font-semibold uppercase ${headingColorClass}`}>
                Resources
              </h2>
              {/* CHANGE: Link text and hover colors are dynamic */}
              <ul className={`font-medium ${textColorClass}`}>
                <li className="mb-4">
                  <Link to="/" className={`transition-colors ${linkHoverClass}`}>
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <a
                    href="https://github.com/Bhavukmittal20/SIH-2025" // Updated your repo link
                    className={`transition-colors ${linkHoverClass}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`mb-6 text-sm font-semibold uppercase ${headingColorClass}`}>
                About us
              </h2>
              <ul className={`font-medium ${textColorClass} flex flex-col space-y-4`}>
                <li>
                  <Link to="/about" className={`transition-colors ${linkHoverClass}`}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className={`transition-colors ${linkHoverClass}`}>
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`mb-6 text-sm font-semibold uppercase ${headingColorClass}`}>
                Legal
              </h2>
              <ul className={`font-medium ${textColorClass}`}>
                <li className="mb-4">
                  <Link to="/privacy-policy" className={`transition-colors ${linkHoverClass}`}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/TnC" className={`transition-colors ${linkHoverClass}`}>

                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* CHANGE: Horizontal rule border color is dynamic */}
        <hr
          className={`my-6 sm:mx-auto lg:my-8 ${Dark ? "border-gray-700" : "border-gray-200"
            }`}
        />
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* CHANGE: Copyright text color is dynamic */}
          <span className={`text-sm ${textColorClass} sm:text-center`}>
            ©️ 2025{" "}
            <Link to="/devpage" className={`transition-colors ${linkHoverClass}`}>
              LoremIpsum
            </Link>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-5 sm:justify-center sm:mt-0">
            <span className={`text-sm ${textColorClass} sm:text-center`}>
              Built with ❤️ by&nbsp;
              <Link to="/devpage" className={`transition-colors ${linkHoverClass}`}>
                Team LoremIpsum
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
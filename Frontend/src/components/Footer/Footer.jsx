import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-black">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Logo/>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Resources
              </h2>
              <ul className="font-medium text-gray-400">
                <li className="mb-4">
                  <Link to="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="transition-colors hover:text-white"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Follow us
              </h2>
              <ul className="font-medium text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://github.com/Charul192/SIH-2025"
                    className="transition-colors hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <Link to="/feedback" className="transition-colors hover:text-white">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Legal
              </h2>
              <ul className="font-medium text-gray-400">
                <li className="mb-4">
                  <Link to="/privacy-policy" className="transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition-colors hover:text-white">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2025{" "}
            <Link
                    to="devpage"
                    className="transition-colors hover:text-white"
                  >
                    LoremIpsum
                  </Link>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-5 sm:justify-center sm:mt-0">
            <span className="text-sm text-gray-400 sm:text-center">
              Built with ❤️ by&nbsp;
            {/* <a className="transition-colors hover:text-white">
               Team LoremIpsum
            </a> */}
            <Link
                    to="/devpage"
                    className="transition-colors hover:text-white"
                  >
                    Team LoremIpsum
                  </Link>
          </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

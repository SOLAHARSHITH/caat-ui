import React from "react";
import *as FaIcons from "react-icons/fa"
const Navbar = () => {
  return (
    <>
      <div className=" bg-blue-900 sticky">
        <div className=" pl-16 container mx-auto ">
          <form className="flex pt-4  pl-12   ml-auto">
            <input
              class=" h-9 px-4 py-2 mr-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button
              type="submit"
              className="h-9 bg-gray-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              <svg
                className="w-3 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M23.707 22.293l-6.271-6.271a9 9 0 1 0-1.414 1.414l6.271 6.271a1 1 0 1 0 1.414-1.414zM10 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
              </svg>
            </button>
            <div className="relative lg:flex ml-auto ">
              <button
                id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                class=" h-9 pb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Default
                <svg
                  class="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <div
                id="dropdownHover"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200  cursor-pointer hover:bg-gray-800 rounded-md"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <span class="text-gray-300 text-sm flex items-center gap-x-4  p-2 ">
                      Dashboard
                    </span>
                  </li>
                  <li>
                    <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Settings
                    </span>
                  </li>
                  <li>
                    <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Earnings
                    </span>
                  </li>
                  <li>
                    <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex items-center justify-end">
              <div class="relative pb-2 pl-5">
                <button
                  type="button"
                  class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    src={require("./icons/my-account-icon.png")}
                    className={`cursor-pointer duration-500`}
                  />
                </button>
              </div>
            </div>
            <div class="flex items-center justify-end">
              <div class="relative pb-2 pl-5">
                <button
                  type="button"
                  class="inline-flex items-center justify-center h-7 w-7  "
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    src={require("./icons/icons8-bell-48.png")}
                    className={`cursor-pointer duration-500 text-white`}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;

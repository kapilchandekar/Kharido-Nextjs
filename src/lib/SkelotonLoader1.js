import React from "react";

const SkelotonLoader1 = () => {
  return (
    <section class=" body-font overflow-hidden animate-pulse">
      <div class="container px-5 pb-5 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div className=" flex items-center justify-center lg:w-1/2 lg:h-80 mx-auto  bg-gray-300 ">
            <svg
              class="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div class="h-2.5 w-20 bg-gray-200  dark:bg-gray-700 mb-4"></div>
            <div class="h-24 bg-gray-200  dark:bg-gray-700 mb-2.5"></div>
            <div class="h-10 w-48 bg-gray-200  dark:bg-gray-700 mb-2.5 "></div>
            <div class="h-10  bg-gray-200  dark:bg-gray-700 mb-2.5 "></div>
            <div class="flex">
              <div class="h-10 w-20  bg-gray-200  dark:bg-gray-700  "></div>

              <div class="flex ml-auto w-8  bg-gray-200  dark:bg-gray-700py-2 px-6 "></div>
              <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkelotonLoader1;

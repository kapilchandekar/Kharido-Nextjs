"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        router.push(`/?query=${query}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, router]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="px-2">
      <form class="max-w-md mx-auto pb-5">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for products, brands and more"
            value={query}
            onChange={handleInputChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Search;

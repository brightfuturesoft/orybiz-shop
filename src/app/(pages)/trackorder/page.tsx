'use client'
import {  ChangeEvent, FormEvent, useState } from 'react';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center   p-4">
      <div className="flex w-full max-w-lg items-center rounded-lg shadow-md overflow-hidden bg-white">
        <form onSubmit={handleSearchSubmit} className="flex flex-1">
          <div className="relative flex-1 flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              name="orderId"
              value={orderId}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-l-lg border-2 border-r-0 border-gray-200 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Search with your order id"
              aria-label="Search with your order id"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 text-white font-medium rounded-r-lg bg-orange-500 hover:bg-orange-600 transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrackOrderPage;

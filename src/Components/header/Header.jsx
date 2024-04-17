import { Link, NavLink } from 'react-router-dom';
import './Header.scss'
import { primaryColor, secondaryColor } from '../Variables/VariablesColors';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCalendarDays, faClock, faLanguage } from '@fortawesome/free-solid-svg-icons';


export default function Header(props) {
    const [isPhone, setIsPhone] = useState(false);
    const navbar = useRef(null);
    const [sreachType, setSearchType] = useState("All");


    useEffect(() => {
        window.innerWidth < 768 ? setIsPhone(true) : setIsPhone(false);
    });

    useEffect(() => {
        function Resize() {
            window.innerWidth < 768 ? setIsPhone(true) : setIsPhone(false);
        }
        window.addEventListener('resize', Resize);
        return () => {
            window.removeEventListener('resize', Resize);
        };
    }, []);


    // Time Hour/Second
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    function shNavbar() {
        navbar.current.classList.toggle("hidden");
        navbar.current.classList.contains('hidden') ? document.body.classList.remove("remove-scrolling") : document.body.classList.add("remove-scrolling");
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }


    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    // Day/Month/Year
    function getCurrentDate() {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; // Month starts from 0
        const year = now.getFullYear();
        return { day, month, year };
    }

    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    function DateDisplay() {

        useEffect(() => {
            const intervalId = setInterval(() => {
                setCurrentDate(getCurrentDate());
            }, 1000); // Update every second

            return () => {
                clearInterval(intervalId); // Clean up the interval on unmount
            };
        }, []);
    }

    return (
        <>
            <div className="header py-5 px-4 flex justify-between items-center">
                <div className="search">

                    <form className="max-w-lg">
                        <div className="flex">
                            <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                            <button style={{ minWidth: "132px" }} id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex justify-between items-center py-1 px-4 text-xs font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200" type="button">{sreachType}<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg></button>
                            <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                    <li>
                                        <button onClick={(e) => setSearchType(e.target.innerText)} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All</button>
                                    </li>
                                    <li>
                                        <button onClick={(e) => setSearchType(e.target.innerText)} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Engineering</button>
                                    </li>
                                    <li>
                                        <button onClick={(e) => setSearchType(e.target.innerText)} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Medical</button>
                                    </li>
                                    <li>
                                        <button onClick={(e) => setSearchType(e.target.innerText)} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Arts & Science</button>
                                    </li>
                                    <li>
                                        <button onClick={(e) => setSearchType(e.target.innerText)} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Architecture</button>
                                    </li>
                                    <li>
                                        <button onClick={(e) => setSearchType(e.target.innerText)} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Law</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                <input type="search" id="search-dropdown" className="block p-1 w-full outline-none z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700" placeholder="Search" required />
                                <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-whit rounded-e-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4 pb-1" style={{ color: primaryColor }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>


                {/* langage menu */}
                {!isPhone &&
                    <div className="lang relative">
                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdownln" className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal global-radius text-sm px-3 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><FontAwesomeIcon icon={faLanguage} className='pr-2' style={{ color: primaryColor }} />Lang<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>
                        <div id="dropdownln" style={{ position: "absolute", top: "35px", right: "0" }} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">EN</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">FR</a>
                                </li>
                            </ul>
                        </div>
                    </div>}




                {!isPhone && <div className="time flex items-center gap-2 lg:gap-10 bg-white py-1 px-4 global-radius">
                    <div className="hour flex items-center text-xs lg:text-sm">
                        <FontAwesomeIcon icon={faClock} className='mr-2' style={{ color: primaryColor }} />
                        {currentTime}
                    </div>
                    <div className="date flex items-center text-xs lg:text-sm">
                        <FontAwesomeIcon icon={faCalendarDays} className='mr-2' style={{ color: primaryColor }} />
                        <p>{currentDate.day}-{currentDate.month}-{currentDate.year}</p>
                    </div>
                </div>}


                {/* Profile menu */}
                <div className="myprofile relative">
                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdowndpro" className="text-black text-sm font-normal bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 global-radius text-sm px-3 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <img src={require('../../assets/avatar.png')} className='photo-profile mr-2' alt="" />
                        Name
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div id="dropdowndpro" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                            </li>
                            <li>
                                <Link to="/account/accountsetting" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                            </li>
                            <li>
                                <Link to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
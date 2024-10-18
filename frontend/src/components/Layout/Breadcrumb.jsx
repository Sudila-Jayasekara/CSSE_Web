import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="bg-gray-200 p-3 rounded-md w-full">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const link = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={index}>
              <li><span className="mx-2">/</span></li>
              {index === pathnames.length - 1 ? (
                <li className="text-gray-500">{value}</li>
              ) : (
                <li>
                  <Link to={link} className="text-blue-600 hover:text-blue-700">
                    {value}
                  </Link>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

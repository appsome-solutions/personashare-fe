import { useEffect, useState } from 'react';
import axios from 'axios';

interface CompanyDataType {
  href: string;
  companyName: string;
}

// 1. Use last downloaded company name kept in localstorage if not exists
// 2. Use default hardcoded values
// 3. Use data from BE endpoint and store them for next usages
export const useCompanyData = (defaultHref: string, defaultCompanyName: string): CompanyDataType => {
  const [href, setHref] = useState(localStorage.getItem('companyHref') || defaultHref);
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || defaultCompanyName);

  useEffect(() => {
    axios.get('https://sh-company-data.herokuapp.com/redirection-data').then(({ data }) => {
      localStorage.setItem('companyName', data.companyName);
      localStorage.setItem('companyHref', data.href);

      setCompanyName(data.companyName);
      setHref(data.href);
    });
  });

  return { href, companyName };
};

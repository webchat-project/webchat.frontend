import { useEffect, useState, useMemo } from "react";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

export default function UseCookie(key, defaultValue) {

  const cookies = useMemo(() => new Cookies(), []);

  const [value, setValue] = useState(() => {
    const cookieValue = cookies.get(key);
    return (cookieValue !== undefined && cookieValue !== null && cookieValue.trim() !== "") ? cookieValue : defaultValue;
  });

  useEffect(() => {
    if (value.trim() === "") {
      cookies.remove(key);
    } else {
      //Decode jwt token
      const decodedToken = jwtDecode(value);

      //set cookie
      cookies.set(key, value, {
        expires: new Date(decodedToken.expires * 1000),
      });

    }
  }, [key, value, cookies]);

  return [value, setValue];
}

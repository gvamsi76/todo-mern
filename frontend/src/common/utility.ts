
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};



export const ReadFromLocalstorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const token :any = ReadFromLocalstorage("token");

if (token) {
  const data=  decodeToken(token);
  if (data) {
    console.log('Decoded Token:', data);
  } else {
    console.log('Token could not be decoded.');
  }
} else {
  console.log('No token found in localStorage.');
}
export const RemoveLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("error", error);
  }
};



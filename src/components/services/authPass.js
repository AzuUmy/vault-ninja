export function setToken(token) {
    localStorage.setItem('authToken', token);
  }
  
  export function getToken() {
   // console.log('token',localStorage.getItem('authToken'));
    return localStorage.getItem('authToken');
  }
  
  export function removeToken() {
    localStorage.removeItem('authToken');
  }
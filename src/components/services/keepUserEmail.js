export function keepUserEmail(userEmail){
    localStorage.setItem('usserEmail', userEmail);
    console.log(userEmail);
}

export function getUserEmail(){
    return localStorage.getItem('usserEmail');
   
}
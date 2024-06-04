
export const getFromLocalStorage = (key:string) => {
    const data = typeof window!=="undefined" ? JSON.parse(localStorage.getItem(key)||"{}") : "";
    return data;
}

export const setInLocalStorage = (key:string,value:any) => {
    if(typeof window!=="undefined") localStorage.setItem(key,JSON.stringify(value));
    return;
}
'use client'

export const getFromLocalStorage = (key:string) => {
    return typeof window!=="undefined" ? JSON.parse(localStorage.getItem(key)||"{}") : "";
}

export const setInLocalStorage = (key:string,value:any) => {
    localStorage.setItem(key,JSON.stringify(value));
    return;
}
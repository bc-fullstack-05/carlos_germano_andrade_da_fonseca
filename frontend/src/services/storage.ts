
export function saveLocalStorage(key: string, data: unknown){
    localStorage.setItem(key,JSON.stringify(data));
}

export function getLocalStorage(key:string){
    return JSON.parse(localStorage.getItem(key) || '{}');
}

export function deleteLocalStorage(key:string){
    localStorage.removeItem(key);
}

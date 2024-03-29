import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string, options?: object) => {
    Cookies.set(key, value, options);
}

export const getCookie = (key: string): string | undefined => {
    return Cookies.get(key);

}

export const removeCookie = (key: string) => {
    Cookies.remove(key);
}

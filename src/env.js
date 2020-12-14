import Cookies from 'js-cookie';



export const domain = "http://127.0.0.1:8000";
// export const domain = "";



// window.localStorage.removeItem('myCat');
// window.localStorage.clear();
// window.localStorage.getItem("token");

// const token = window.localStorage.getItem("token");
const token = "2ccc31df8eea72f68914af513d8ee93f98c87b7f"
export const header = {
    Authorization: `token ${token}`
}
const csrftoken = Cookies.get('csrftoken')
export const header2 = {
    Authorization: `token ${token}`,
    'X-CSRFToken': csrftoken,
}
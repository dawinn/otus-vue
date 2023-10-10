import axios from "axios";
const dispatchOrder = async (data) => {
    const resp = axios.post(`https://httpbin.org/post`,{
        title: "dispatch order",
        body: data
    })
        .then(response => response)
        .catch(() => {
            console.error('Произошла проблема при загрузке данных');
            return false;
        });


    return (await resp).status == 200;
}
export {
    dispatchOrder,
}

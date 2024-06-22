export default function getCookie(){
    const tokenKeyIncluded = document.cookie;
    return tokenKeyIncluded
    // return tokenKeyIncluded.split('token=')[1];
}
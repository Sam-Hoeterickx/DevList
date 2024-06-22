export default function getUserId(){

    // The input string
    const inputString = document.cookie;

    // Split the string by '; '
    const parts = inputString.split('; ');
    
    // Initialize an empty object to hold the key-value pairs
    let data = {};
    
    // Iterate over the parts and split by '=' to get key and value
    parts.forEach(part => {
        const [key, value] = part.split('=');
        data[key] = value;
    });
    
    // Access the Author value
    const author = data["Author"];
    
    console.log(author); // Outputs: Sam
    return author
}
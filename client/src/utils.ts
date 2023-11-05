export const parseImageUrl=(originalURL:string) =>{
  const [baseURL, params] = originalURL.split("?");

  if (params) {
    // Split the parameters into an array of key-value pairs
    const paramPairs = params.split("&");

    // Create an object to store the parameters
    const paramObject:{[key:string]:string} = {};

    // Loop through the parameter pairs and store them in the object
    for (const paramPair of paramPairs) {
      const [key, value] = paramPair.split("=");
      paramObject[key] = value;
    }

    // Update the "w" and "h" parameters
    paramObject["w"] = "1600";
    paramObject["h"] = "1000";

    // Construct the updated URL
    const updatedParams = Object.entries(paramObject)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const updatedURL = baseURL + "?" + updatedParams;
    console.log(updatedURL);
    return updatedURL
  } else {
    console.log("Invalid URL format");
  }
}

import basename from "../../react-config";

let cachedData = null;

const getData = async () => {
    const cacheBuster = new Date().getTime(); // Generate a unique timestamp
    try {
        const response = await fetch(`${basename}data.json?cacheBuster=${cacheBuster}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        cachedData = await response.json();
        return cachedData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default getData;
import basename from "../../react-config";
import CryptoJS from 'crypto-js';

let cachedData = null;

const getData = async () => {
    try {
        const response = await fetch(`${basename}data.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const fileBuffer = await response.text(); // Read file as a string
        const hashSum = CryptoJS.SHA256(fileBuffer);
        const cacheBuster = hashSum.toString(CryptoJS.enc.Hex); // Generate a hash of the file

        const cacheBustedResponse = await fetch(`${basename}data.json?cacheBuster=${cacheBuster}`);
        if (!cacheBustedResponse.ok) {
            throw new Error('Network response was not ok');
        }
        cachedData = await cacheBustedResponse.json();
        return cachedData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default getData;
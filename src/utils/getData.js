import basename from "../../react-config";
import CryptoJS from 'crypto-js';

let cachedData = null;

const getData = async () => {
    try {
        // Fetch the file hash without caching
        const response = await fetch(`${basename}data.json`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const fileBuffer = await response.text(); // Read file as a string
        const hashSum = CryptoJS.SHA256(fileBuffer);
        const cacheBuster = hashSum.toString(CryptoJS.enc.Hex); // Generate a hash of the file

        // Fetch the data with the cache buster
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
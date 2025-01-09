import basename from "../../react-config";

let cachedData = null;

const getData = async () => {
    try {
        // Fetch the file hash without caching
        const response = await fetch(`${basename}data.json`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default getData;
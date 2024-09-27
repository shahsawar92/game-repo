import Swal from "sweetalert2";

export const checkName = (name) => {
    if (name) {
        const first = name.split(' ')[0];
        const last = name.split(' ')[1];
        return { first, last };

    } else {
        return "Unknown";
    }
};

export const handleLinkClick = (e, path) => {
    if (typeof window !== 'undefined') {

        const token = localStorage.getItem("kpobit_token");
        // Restrict pages other than about and contact for non-logged-in users
        if (!token && path !== "/about" && path !== "/contact") {
            e.preventDefault(); // Prevent navigation
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login first to access this page.',
            });
        }
    }
};


export function generateAvatar(firstName = '', lastName = '') {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const size = 100; // Example size
    canvas.width = size;
    canvas.height = size;

    // Generate a random background color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Draw the background
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set up text properties
    ctx.fillStyle = '#FFFFFF'; // White text color
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Get the first character of each name
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    // Draw the initials on the canvas
    ctx.fillText(firstInitial + lastInitial, size / 2, size / 2);

    // Convert the canvas to an image URL
    const imageUrl = canvas.toDataURL('image/png');

    // Return the image URL
    return imageUrl;
}



export const checkUserLogin = () => {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('kpobit_token');
    }
};





// Function to generate a random string of given length
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Define the length of random characters to add
const RANDOM_PREFIX_LENGTH = 5;
const RANDOM_SUFFIX_LENGTH = 5;

// Encode function
export const encode = (input) => {
    if (typeof input === 'number') {
        const idStr = input.toString();
        const prefix = generateRandomString(RANDOM_PREFIX_LENGTH);
        const suffix = generateRandomString(RANDOM_SUFFIX_LENGTH);
        return prefix + idStr + suffix;
    } else if (typeof input === 'string') {
        return encode(Number(input)); // Convert string to number and encode
    } else {
        return ''; // Return empty string for unsupported types
    }
};

// Decode function
export const decode = (encodedInput) => {
    if (typeof encodedInput === 'string') {
        const prefix = encodedInput.substring(0, RANDOM_PREFIX_LENGTH);
        const suffix = encodedInput.substring(encodedInput.length - RANDOM_SUFFIX_LENGTH);
        const idStr = encodedInput.substring(RANDOM_PREFIX_LENGTH, encodedInput.length - RANDOM_SUFFIX_LENGTH);
        return idStr;
    } else {
        return ''; // Return empty string for unsupported types
    }
};

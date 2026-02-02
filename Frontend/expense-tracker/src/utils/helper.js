/**
 * Validates if a string is a correctly formatted email address.
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Extracts initials from a name (e.g., "Rohan Chauhan" -> "RC").
 */
export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        if (words[i][0]) {
            initials += words[i][0];
        }
    }
    
    return initials.toUpperCase();
};

/**
 * Formats numbers with commas (e.g., 5000 -> 5,000).
 */
export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "0";

    const [integerPart, fractionalPart] = num.toString().split(".");
    
    // Fixed the Regex: Removed the accidental space that was breaking the lookahead
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

/**
 * Prepares data for the Bar Chart by grouping expenses into the last 30 days.
 */
export const prepareExpenseBarChartData = (data = []) => {
    const last30Days = [];
    
    // 1. Generate the 30-day timeline (X-Axis)
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        last30Days.push({
            day: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }), // e.g., "1 Feb"
            amount: 0,
            fullDate: date.toISOString().split('T')[0], // e.g., "2026-02-01"
        });
    }

    // 2. Fill the bars with your actual expense data
    data.forEach((item) => {
        if (item?.date) {
            // Match the transaction date to the chart date
            const itemDate = new Date(item.date).toISOString().split('T')[0];
            const dayEntry = last30Days.find((d) => d.fullDate === itemDate);

            if (dayEntry) {
                dayEntry.amount += item.amount; // Add to the correct bar
            }
        }
    });

    return last30Days;
};
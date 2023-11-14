import React from "react";

const DateTime = (timeStamp) => {
    // Check if timeStamp is falsy
    if (!timeStamp) {
        return null; // Or any other appropriate value or behavior for falsy timeStamp
    }

    // Formatting options for the date
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Formatting options for the time
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true, // Include AM/PM
    };

    // Parse the timestamp string
    const parsedTimestamp = new Date(timeStamp);

    // Convert to user-friendly format using the specified options
    const userFriendlyDate = parsedTimestamp.toLocaleString(undefined, dateOptions);
    const userFriendlyTime = parsedTimestamp.toLocaleString(undefined, timeOptions);

    // Return an object containing user-friendly date and time
    return ([
        userFriendlyDate,
        userFriendlyTime
    ]
    );
}
export default DateTime;

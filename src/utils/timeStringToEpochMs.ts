export const timeStringToEpochMs =(timeStr: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    // Remove non-alphanumeric characters
    timeStr = timeStr.replace(/[^a-zA-Z0-9]/g, '');

    let hours, minutes;

    if (timeStr.includes('am') || timeStr.includes('AM')) {
        // Handle AM times
        timeStr = timeStr.replace(/am|AM/g, '');
        if (timeStr.length === 1 || timeStr.length === 2) {
            hours = parseInt(timeStr);
            minutes = 0;
        } else if (timeStr.length === 3) {
            hours = parseInt(timeStr[0]);
            minutes = parseInt(timeStr.slice(1));
        } else if (timeStr.length === 4) {
            hours = parseInt(timeStr.slice(0, 2));
            minutes = parseInt(timeStr.slice(2));
        }
        if (hours === 12) hours = 0;  // Handle 12 AM as 0 hours
    } else if (timeStr.includes('pm') || timeStr.includes('PM')) {
        // Handle PM times
        timeStr = timeStr.replace(/pm|PM/g, '');
        if (timeStr.length === 1 || timeStr.length === 2) {
            hours = parseInt(timeStr);
            minutes = 0;
        } else if (timeStr.length === 3) {
            hours = parseInt(timeStr[0]);
            minutes = parseInt(timeStr.slice(1));
        } else if (timeStr.length === 4) {
            hours = parseInt(timeStr.slice(0, 2));
            minutes = parseInt(timeStr.slice(2));
        }
        if (hours !== 12) hours += 12;  // Handle PM hours
    } else {
        // Handle times without AM/PM
        if (timeStr.length === 1 || timeStr.length === 2) {
            hours = parseInt(timeStr);
            minutes = 0;
        } else if (timeStr.length === 3) {
            hours = parseInt(timeStr[0]);
            minutes = parseInt(timeStr.slice(1));
        } else if (timeStr.length === 4) {
            hours = parseInt(timeStr.slice(0, 2));
            minutes = parseInt(timeStr.slice(2));
        }
    }

    // Set the hours and minutes to today's date
    today.setHours(hours);
    today.setMinutes(minutes);

    // Return the time in epoch milliseconds
    return today.getTime();
}
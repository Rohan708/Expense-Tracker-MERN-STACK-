import React from 'react';

// Helper function to get initials from a full name
const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const nameParts = name.trim().split(' ');
    if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
};

const CharAvatar = ({ fullName, width, height, style }) => {
    return (
        <div
            className={`${width || "w-12"} ${height || "h-12"} ${style || ""}
            flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
        >
            {getInitials(fullName || "")}
        </div>
    );
};

export default CharAvatar;
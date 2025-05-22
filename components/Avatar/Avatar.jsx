import React from 'react';

const Avatar = ({ name }) => {
  const initials = name
    ? name
        .split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';
  return (
    <div className="w-8 h-8 rounded-full border-2 border-[var(--primary-color)] flex items-center justify-center text-white font-bold text-sm select-none">
      {initials}
    </div>
  );
};

export default Avatar;
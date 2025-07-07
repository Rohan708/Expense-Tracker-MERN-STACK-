import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-[13px] text-slate-800 mb-1">
                    {label}
                </label>
            )}

            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none text-sm"
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === 'password' && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={18}
                                className="text-primary cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={18}
                                className="text-slate-400 cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;

import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: Option[]; // Update options to be an array of objects with label and value
    value: string;
    onChange: (option: string) => void;
    placeholder?: string;
    disabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option...',
    disabled = false,
    backgroundColor = '#fff',
    textColor = '#000',
    borderColor = '#ccc',
}) => {
    return (
        <FormControl fullWidth variant="outlined" disabled={disabled} size="medium">
            <InputLabel style={{ color: textColor }}>{placeholder}</InputLabel>
            <Select
                value={value}
                onChange={(event) => onChange(event.target.value as string)}
                label={placeholder}
                style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                    borderColor: borderColor,
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            backgroundColor: backgroundColor,
                            color: textColor,
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;

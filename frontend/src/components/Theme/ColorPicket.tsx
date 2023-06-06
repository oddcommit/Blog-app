import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

interface ColorPickerProps {
    onChange:(color: string) => void;
    color: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, color}) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleColorChange = (color: any) => {
        onChange(color.hex);
    };

    return (
        <div>
            <div className='w-10 h-10 border-4 border-white' style={{ backgroundColor: color}}
            onClick={() => setDisplayColorPicker(!displayColorPicker)}>
            </div>
            {displayColorPicker && <SketchPicker color={color} onChange={handleColorChange}/>}
        </div>
    )
}


export default ColorPicker;
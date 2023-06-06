import { createContext } from "react";

type ThemeContextType = {
    color: string;
    setColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    color:'#1e40af',
    setColor:() => {}
});

export default ThemeContext;
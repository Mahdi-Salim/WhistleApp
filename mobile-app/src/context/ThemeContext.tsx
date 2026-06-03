import { createContext, useContext, useState, ReactNode} from "react";

type ThemeType = 'light' | 'dark';
type ThemeContextType = {
    theme: ThemeType;
    toggleTheme:  () => void;
};

const ThemeContext = 
createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => {},
});

export function ThemeProviderCustom({
    children,
}: {
    children: ReactNode;
}) {
const [theme, setTheme] = useState<ThemeType>('dark');
const toggleTheme = () => {
    setTheme(prev => 
        prev ==='dark' ? 'light' : 'dark'
    );
};
return (
     <ThemeContext.Provider
     value={{
        theme,
        toggleTheme,
     }}>
        {children}
     </ThemeContext.Provider>
);
}
export const useTheme = () => 
    useContext (ThemeContext);
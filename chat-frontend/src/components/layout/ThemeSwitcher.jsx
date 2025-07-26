import { useTheme } from 'next-themes';

const ThemeSwitcher = ({ value, onChange }) => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);         // updates local state
    setTheme(val);         // updates app theme
  };

  return (
    <select value={value} onChange={handleChange} className="input w-32">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
};

export default ThemeSwitcher;

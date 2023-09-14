import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Box component="header" className="px-12 py-3 mt-auto flex flex-row gap-8 items-center">
      <Link to="/">
        <h1>Home</h1>
      </Link>
    </Box>
  );
}

export default NavBar;

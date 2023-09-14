import Box from '@mui/material/Box';

function Footer() {
  return (
    <div className="flex flex-col">
      <Box
        component="footer"
        className="text-xs px-12 pt-2 pb-5 mt-5 flex flex-row gap-8 items-center border-t border-opacity-50"
      >
        <div>
          <h1 className="underline underline-offset-4 decoration-gray-400">Foo</h1>
          <div className="flex flex-col mt-2 gap-0.5">
            <h1>Monday</h1>
          </div>
        </div>
        <div>
          <h1 className="underline underline-offset-4 decoration-gray-400">Ter</h1>
          <div className="flex flex-col mt-2 gap-0.5">
            <h1>Tuesday</h1>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Footer;

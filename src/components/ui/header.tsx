interface HeaderProps {
  // className?: string;
  H1Header: string;
  H2Header: string;
  H3Header: string;
  PHeader: string;
}

function Header({ H3Header, H1Header, H2Header, PHeader }: HeaderProps) {
  return (
    <div className="relative flex flex-col justify-center items-center w-full px-8 text-center">
      <h3 className="absolute top-2 text-gray-500 text-md font-bold">{H3Header}</h3>
      <h1 className="text-gray-200 text-4xl m-0 font-bold"> {H1Header}</h1>
      <h2 className=" m-0 text-green-600 text-5xl font-bold py-4"> {H2Header}</h2>
      <p className="text-md text-gray-600 font-semibold">{PHeader}</p>
      <hr
        style={{
          border: "1px solid #1c7f47",
          width: "6rem",
          margin:"2rem 0"
        }}
      />
    </div>
  );
}

export default Header;

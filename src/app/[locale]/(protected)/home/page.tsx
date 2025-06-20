import Header from "../_components/Header";

import Banner from "./_components/Banner";

const HomePage = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center">
      <Header />
      <div className="container flex w-full justify-center">
        <div className="w-2/3">
          <Banner />
        </div>
        <div className="h-dvh w-1/3 animate-pulse bg-slate-800"></div>
      </div>
    </div>
  );
};

export default HomePage;

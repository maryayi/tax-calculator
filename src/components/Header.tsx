import HeaderLinks from './HeaderLinks';
import HeaderTitle from './HeaderTitle';

function Header() {
  return (
    <div className="bg-slate-100 flex w-full border-b border-b-gray-500 border-solid justify-center">
      <header className="flex max-w-5xl w-full p-4 justify-between">
        <HeaderTitle subTitle="محاسبه مالیات بر حقوق">مالیات‌سنج</HeaderTitle>
        <HeaderLinks />
      </header>
    </div>
  );
}

export default Header;

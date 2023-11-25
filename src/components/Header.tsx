import HeaderLinks from './HeaderLinks';
import HeaderTitle from './HeaderTitle';

function Header() {
  return (
    <header className="flex bg-slate-100 p-4 border justify-between border-b-gray-500 border-solid">
      <HeaderTitle subTitle="محاسبه مالیات بر درآمد">مالیات‌سنج</HeaderTitle>
      <HeaderLinks />
    </header>
  );
}

export default Header;

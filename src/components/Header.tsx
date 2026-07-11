import HeaderLinks from './HeaderLinks';
import HeaderTitle from './HeaderTitle';

function Header() {
  return (
    <div className="w-full border-b border-ink/10 bg-white">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <HeaderTitle subTitle="محاسبه مالیات بر حقوق">مالیات‌سنج</HeaderTitle>
        <HeaderLinks />
      </header>
    </div>
  );
}

export default Header;

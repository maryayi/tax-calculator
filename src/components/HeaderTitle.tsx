import { PropsWithChildren } from 'react';

function HeaderTitle({
  children,
  subTitle,
}: PropsWithChildren<{ subTitle?: string }>) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-800">{children}</h1>
      {subTitle && (
        <small className="text-xs text-center text-gray-500">{subTitle}</small>
      )}
    </div>
  );
}

export default HeaderTitle;

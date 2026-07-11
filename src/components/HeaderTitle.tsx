import { PropsWithChildren } from 'react';

/** Staircase mark: the "tax steps" the calculator is named after. */
function LogoMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-9 w-9 shrink-0"
      aria-hidden
      fill="none"
    >
      <rect width="32" height="32" rx="8" className="fill-kashi-700" />
      <rect x="20" y="8" width="5" height="16" rx="1.5" className="fill-white" />
      <rect
        x="13.5"
        y="13"
        width="5"
        height="11"
        rx="1.5"
        className="fill-kashi-300"
      />
      <rect
        x="7"
        y="18"
        width="5"
        height="6"
        rx="1.5"
        className="fill-saffron-400"
      />
    </svg>
  );
}

function HeaderTitle({
  children,
  subTitle,
}: PropsWithChildren<{ subTitle?: string }>) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark />
      <div className="flex flex-col">
        <span className="text-xl font-black leading-tight text-ink">
          {children}
        </span>
        {subTitle && (
          <small className="text-xs text-ink/50">{subTitle}</small>
        )}
      </div>
    </div>
  );
}

export default HeaderTitle;

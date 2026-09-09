import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-5">
          <div className="text-center max-w-[400px]">
            <h1 className="text-[24px] font-semibold text-[#1d1d1f] dark:text-white">
              Something went wrong
            </h1>
            <p className="mt-3 text-[15px] text-[#6e6e73] dark:text-neutral-400">
              The page failed to load. Try refreshing, or reach us directly:
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="https://wa.me/233240352196"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 text-[14px] font-medium text-white bg-[#ed1c24] hover:bg-[#c41218] transition-colors"
              >
                WhatsApp us
              </a>
              <a
                href="mailto:info@freizy.com"
                className="inline-block px-5 py-2.5 text-[14px] font-medium text-[#1d1d1f] dark:text-white border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                Email info@freizy.com
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

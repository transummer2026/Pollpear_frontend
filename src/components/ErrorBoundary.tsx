import { Component, type ErrorInfo, type ReactNode } from "react";

import ServerError from "@/components/pages/error/ServerError";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Last line of defence around the whole app: a component that throws while
 * rendering takes React's tree down with it, leaving a blank page. Catching it
 * here swaps in the error page instead.
 *
 * Class component on purpose — error boundaries have no hook equivalent.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ServerError />;
    }

    return this.props.children;
  }
}

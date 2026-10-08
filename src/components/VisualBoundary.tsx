import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback: ReactNode };

/** Optional visual effects must never prevent the rest of the page from rendering. */
export default class VisualBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

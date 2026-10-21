// src/components/error/ErrorBoundary.jsx

import { Component } from "react";
import FallbackUI from "./FallbackUI";
import { logError } from "../utils/logger";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  // [REQ-11] Error Boundary catches errors thrown while rendering descendants.
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // [REQ-12] Log the error with a context label.
    logError(
      this.props.context || "ErrorBoundary",
      error,
      errorInfo?.componentStack || ""
    );
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });

    // Change the reset key if a component needs to remount after a retry.
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <FallbackUI
          error={this.state.error}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
import React from 'react';

/**
 * ERROR BOUNDARY COMPONENT
 * ======================
 * 
 * Catches React rendering errors and displays a fallback UI instead of crashing the page.
 * This is a critical safety net for production.
 * 
 * USAGE:
 * Wrap components that might throw errors:
 * 
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error in development
    if (typeof import.meta !== 'undefined' && import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error info:', errorInfo);
    }

    this.setState((prevState) => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // If same error occurs too many times, show recovery message
    if (this.state.errorCount > 2) {
      if (typeof window !== 'undefined' && window.location) {
        // Auto-reload page after showing error multiple times
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M7.07 7.07a8 8 0 1111.314 0M7.07 7.07A8 8 0 0 0 7 16m4.07-9.07a8 8 0 0 1 11.314 0M7.07 7.07A8 8 0 0 0 7 16" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            
            <p className="text-center text-gray-600 mb-6">
              We're sorry for the inconvenience. The page encountered an unexpected error and needs to be refreshed.
            </p>

            {this.state.error && typeof import.meta !== 'undefined' && import.meta.env.DEV && (
              <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
                <p className="text-sm font-mono text-gray-700 mb-2">
                  <strong>Error:</strong> {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs text-gray-600">
                    <summary className="cursor-pointer font-semibold mb-2">Stack trace (dev only)</summary>
                    <pre className="overflow-auto text-xs bg-white p-2 rounded border border-gray-200">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2 bg-theme hover:bg-buttonHover text-white font-medium rounded-lg transition duration-200"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/';
                  }
                }}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition duration-200"
              >
                Go Home
              </button>
            </div>

            {this.state.errorCount > 2 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Page will reload automatically...
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

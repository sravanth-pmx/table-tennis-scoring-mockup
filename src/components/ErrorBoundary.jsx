import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-8 text-red-900">
                    <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
                    <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full overflow-auto">
                        <p className="font-bold mb-2 text-red-600">{this.state.error && this.state.error.toString()}</p>
                        <pre className="text-xs text-slate-500 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

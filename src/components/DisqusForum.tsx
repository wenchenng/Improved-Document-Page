import React, { Component, ErrorInfo, ReactNode } from 'react';
// @ts-ignore disqus-react types might not be installed
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare, AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class DisqusErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Disqus error caught safely:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-gray-50 text-gray-600 rounded border border-gray-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Comments forum is currently operating in offline mode.</span>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

interface DisqusForumProps {
  url?: string;
  identifier?: string;
  title?: string;
}

export const DisqusForum: React.FC<DisqusForumProps> = ({
  url = 'https://ocbc-digital.example.com/statements',
  identifier = 'ocbc-view-statements-page-1',
  title = 'OCBC View Statement/Letter Forum',
}) => {
  const disqusShortname = 'ocbc-new-example';

  // Ensure url is valid string
  const cleanUrl = url && url.startsWith('http') ? url : 'https://ocbc-digital.example.com/statements';

  const disqusConfig = {
    url: cleanUrl,
    identifier: identifier,
    title: title,
    language: 'en',
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 bg-gray-50/50 p-6 rounded-lg">
      <DisqusErrorBoundary>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-[#ED1C24]" />
            <h3 className="font-bold text-gray-900 text-lg">Community Discussion & Feedback</h3>
          </div>
          <div className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded border border-gray-200 shadow-2xs">
            <DisqusErrorBoundary fallback={<span>Comments</span>}>
              <CommentCount shortname={disqusShortname} config={disqusConfig}>
                Comments
              </CommentCount>
            </DisqusErrorBoundary>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-2xs min-h-[250px]">
          <DisqusErrorBoundary>
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </DisqusErrorBoundary>
        </div>
      </DisqusErrorBoundary>
    </div>
  );
};


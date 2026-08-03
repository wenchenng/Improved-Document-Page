import React, { Component, ErrorInfo, ReactNode, useState, useEffect } from 'react';
// @ts-ignore disqus-react types might not be installed
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare, AlertCircle, Send, User } from 'lucide-react';

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
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

interface DisqusForumProps {
  url?: string;
  identifier?: string;
  title?: string;
}

interface LocalComment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export const DisqusForum: React.FC<DisqusForumProps> = ({
  url = 'https://ocbc-digital.example.com/statements',
  identifier = 'website-feedback-comments-page',
  title = 'Website Feedback & Comments',
}) => {
  const disqusShortname = 'ocbc-new-example';
  const [disqusFailed, setDisqusFailed] = useState(false);
  const [localComments, setLocalComments] = useState<LocalComment[]>([
    {
      id: 1,
      author: 'Site Visitor',
      text: 'Great website layout! The statement portal is very clean and easy to navigate.',
      date: '2 hours ago',
    },
    {
      id: 2,
      author: 'UI/UX Reviewer',
      text: 'Love the quick filtering options and the responsive modal view for document details.',
      date: '1 hour ago',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  // Suppress cross-origin "Script error." originating from third-party disqus script tags
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      if (
        event.message?.includes('Script error') ||
        event.filename?.includes('disqus') ||
        event.message?.includes('disqus')
      ) {
        // Prevent top-level unhandled script error reporting
        setDisqusFailed(true);
      }
    };

    window.addEventListener('error', handleGlobalError);
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  const cleanUrl = url && url.startsWith('http') ? url : 'https://ocbc-digital.example.com/statements';

  const disqusConfig = {
    url: cleanUrl,
    identifier: identifier,
    title: title,
    language: 'en',
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const commentItem: LocalComment = {
      id: Date.now(),
      author: 'You',
      text: newComment.trim(),
      date: 'Just now',
    };
    setLocalComments([...localComments, commentItem]);
    setNewComment('');
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 bg-gray-50/50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-[#ED1C24]" />
          <h3 className="font-bold text-gray-900 text-lg">Website Viewer Comments & Feedback</h3>
        </div>
        <div className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded border border-gray-200 shadow-2xs">
          {!disqusFailed ? (
            <DisqusErrorBoundary fallback={<span>{localComments.length} Comments</span>}>
              <CommentCount shortname={disqusShortname} config={disqusConfig}>
                Comments
              </CommentCount>
            </DisqusErrorBoundary>
          ) : (
            <span>{localComments.length} Comments</span>
          )}
        </div>
      </div>

      <div className="bg-white p-5 rounded-md border border-gray-200 shadow-2xs min-h-[200px]">
        {!disqusFailed ? (
          <DisqusErrorBoundary
            fallback={
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 text-amber-800 rounded border border-amber-200 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Disqus embed is in preview fallback mode. Local website feedback thread active below.</span>
                </div>
                {renderLocalForum(localComments, newComment, setNewComment, handleAddComment)}
              </div>
            }
          >
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </DisqusErrorBoundary>
        ) : (
          renderLocalForum(localComments, newComment, setNewComment, handleAddComment)
        )}
      </div>
    </div>
  );
};

function renderLocalForum(
  comments: LocalComment[],
  newComment: string,
  setNewComment: (val: string) => void,
  onSubmit: (e: React.FormEvent) => void
) {
  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment or feedback about this website..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-hidden focus:ring-1 focus:ring-red-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#ED1C24] text-white font-medium text-sm rounded hover:bg-red-700 transition-colors flex items-center justify-center space-x-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Post</span>
        </button>
      </form>

      <div className="space-y-3 pt-2">
        {comments.map((comment) => (
          <div key={comment.id} className="p-3 bg-gray-50 rounded border border-gray-100 flex items-start space-x-3">
            <div className="p-1.5 bg-gray-200 rounded-full text-gray-600 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 text-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900">{comment.author}</span>
                <span className="text-xs text-gray-400">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



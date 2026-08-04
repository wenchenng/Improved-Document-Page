import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  UserPlus,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Send,
} from 'lucide-react';

interface CommentItem {
  id: string;
  author: string;
  avatarLetter: string;
  avatarBg?: string;
  hasUserPlus?: boolean;
  timeAgo: string;
  content: string;
  upvotes: number;
  downvotes: number;
  liked?: boolean;
  replies?: CommentItem[];
}

interface Reaction {
  id: string;
  emoji: string;
  label: string;
  count: number;
  userReacted?: boolean;
}

interface DisqusForumProps {
  url?: string;
  identifier?: string;
  title?: string;
}

export const DisqusForum: React.FC<DisqusForumProps> = () => {
  // Reactions state matching the screenshot
  const [reactions, setReactions] = useState<Reaction[]>([
    { id: 'upvote', emoji: '👍', label: 'Upvote', count: 2, userReacted: true },
    { id: 'funny', emoji: '😝', label: 'Funny', count: 0 },
    { id: 'love', emoji: '😍', label: 'Love', count: 1 },
    { id: 'surprised', emoji: '😮', label: 'Surprised', count: 0 },
    { id: 'angry', emoji: '😤', label: 'Angry', count: 0 },
    { id: 'sad', emoji: '😢', label: 'Sad', count: 0 },
  ]);

  // Comments state starting clean (user input driven)
  const [comments, setComments] = useState<CommentItem[]>([]);

  const [newCommentText, setNewCommentText] = useState('');
  const [sortBy, setSortBy] = useState<'best' | 'newest' | 'oldest'>('best');
  const [activeUserMenu, setActiveUserMenu] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Total responses counter calculation
  const totalReactionCount = reactions.reduce((sum, r) => sum + r.count, 0);

  const handleToggleReaction = (id: string) => {
    setReactions((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextUserReacted = !r.userReacted;
          return {
            ...r,
            userReacted: nextUserReacted,
            count: nextUserReacted ? r.count + 1 : Math.max(0, r.count - 1),
          };
        }
        return r;
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: Date.now().toString(),
      author: 'wenchen',
      avatarLetter: 'W',
      avatarBg: 'bg-[#1c1c1c]',
      hasUserPlus: false,
      timeAgo: 'Just now',
      content: newCommentText.trim(),
      upvotes: 1,
      downvotes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;
    const newReplyItem: CommentItem = {
      id: Date.now().toString(),
      author: 'wenchen',
      avatarLetter: 'W',
      avatarBg: 'bg-[#1c1c1c]',
      timeAgo: 'Just now',
      content: replyText.trim(),
      upvotes: 0,
      downvotes: 0,
    };

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [...(c.replies || []), newReplyItem],
          };
        }
        return c;
      })
    );

    setReplyText('');
    setReplyingToId(null);
  };

  const handleVote = (commentId: string, isUpvote: boolean) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            upvotes: isUpvote ? c.upvotes + 1 : c.upvotes,
            downvotes: !isUpvote ? c.downvotes + 1 : c.downvotes,
          };
        }
        return c;
      })
    );
  };

  // Sort comments according to tab choice
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') return Number(b.id) - Number(a.id);
    if (sortBy === 'oldest') return Number(a.id) - Number(b.id);
    return b.upvotes - a.upvotes; // 'best'
  });

  return (
    <div className="mt-12 w-full max-w-5xl mx-auto">
      {/* Outer Card Container matching screenshot */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-6 md:p-8 shadow-xs text-gray-900 font-sans">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 shrink-0 mt-0.5">
              <MessageSquare className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                Community Insights & Discussion
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 font-normal">
                Share portfolio strategies, discuss market trends, and connect with fellow investors
              </p>
            </div>
          </div>

          <div className="self-start sm:self-center">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-2xs text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-default">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
            </div>
          </div>
        </div>

        {/* Center Reactions Section: "What do you think?" */}
        <div className="py-8 my-2 border-b border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-base md:text-lg font-bold text-gray-900 tracking-tight text-center">
            What do you think?
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 mb-6 text-center">
            {totalReactionCount} {totalReactionCount === 1 ? 'Response' : 'Responses'}
          </p>

          {/* Emoji row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {reactions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleToggleReaction(item.id)}
                type="button"
                className={`group flex flex-col items-center focus:outline-hidden transition-transform active:scale-95 ${
                  item.userReacted ? 'scale-105' : 'hover:scale-110'
                }`}
              >
                <div className="relative">
                  <span className="text-3xl sm:text-4xl filter drop-shadow-2xs select-none">
                    {item.emoji}
                  </span>
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-2 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-white shadow-2xs border border-white">
                      {item.count}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium transition-colors ${
                    item.userReacted ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Comment Thread Top Bar */}
        <div className="flex items-center justify-between pt-4 pb-3">
          <div className="text-base font-bold text-gray-900">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveUserMenu(!activeUserMenu)}
              className="flex items-center space-x-1.5 text-xs md:text-sm font-semibold text-gray-800 hover:text-gray-900 focus:outline-hidden"
            >
              <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                1
              </span>
              <span>wenchen</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {activeUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 text-xs">
                <div className="px-3 py-2 font-medium text-gray-700 border-b border-gray-100">
                  Signed in as <span className="font-bold text-gray-900">wenchen</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveUserMenu(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-600"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => setActiveUserMenu(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-600"
                >
                  Notification Settings
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 mb-6" />

        {/* Input Comment Box Section */}
        <form onSubmit={handleAddComment} className="mb-6">
          <div className="flex items-start space-x-3.5">
            {/* Dark User Avatar 'W' */}
            <div className="w-10 h-10 rounded-xl bg-[#1c1c1c] text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-2xs select-none">
              W
            </div>

            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Join the discussion..."
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all shadow-2xs"
              />

              {/* Sub-toolbar below input matching screenshot */}
              <div className="flex items-center justify-between text-xs text-gray-500 px-1 pt-1">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="hover:text-red-500 transition-colors p-1"
                    title="Favorite"
                  >
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    className="hover:text-gray-900 transition-colors font-medium"
                  >
                    Share
                  </button>
                </div>

                <div className="flex items-center space-x-4 font-medium text-xs">
                  <button
                    type="button"
                    onClick={() => setSortBy('best')}
                    className={`focus:outline-hidden transition-colors ${
                      sortBy === 'best'
                        ? 'font-bold text-gray-900 underline underline-offset-4 decoration-2 decoration-black'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Best
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('newest')}
                    className={`focus:outline-hidden transition-colors ${
                      sortBy === 'newest'
                        ? 'font-bold text-gray-900 underline underline-offset-4 decoration-2 decoration-black'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('oldest')}
                    className={`focus:outline-hidden transition-colors ${
                      sortBy === 'oldest'
                        ? 'font-bold text-gray-900 underline underline-offset-4 decoration-2 decoration-black'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Oldest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Comment List */}
        <div className="space-y-6 pt-2">
          {sortedComments.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500 font-medium bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              No comments yet. Be the first to join the discussion!
            </div>
          ) : (
            sortedComments.map((comment) => (
            <div key={comment.id} className="group">
              <div className="flex items-start space-x-3.5">
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-xl text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-2xs select-none ${
                    comment.avatarBg || 'bg-[#1c1c1c]'
                  }`}
                >
                  {comment.avatarLetter}
                </div>

                <div className="flex-1">
                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-gray-900 text-sm md:text-base">
                        {comment.author}
                      </span>
                      {comment.hasUserPlus && (
                        <UserPlus className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      )}
                      <span className="text-xs text-gray-400 font-normal ml-2">
                        {comment.timeAgo}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-400">
                      <button
                        type="button"
                        className="p-1 hover:text-gray-700 rounded transition-colors"
                        title="Collapse"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1 hover:text-gray-700 rounded transition-colors"
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Comment Body Text */}
                  <p className="text-sm md:text-base text-gray-800 mt-1 leading-relaxed">
                    {comment.content}
                  </p>

                  {/* Actions Bar */}
                  <div className="flex items-center space-x-4 mt-2.5 text-xs text-gray-500 font-medium">
                    <button
                      type="button"
                      onClick={() => handleVote(comment.id, true)}
                      className="flex items-center space-x-1 hover:text-emerald-600 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{comment.upvotes > 0 ? comment.upvotes : ''}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVote(comment.id, false)}
                      className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                      className="hover:text-gray-900 transition-colors"
                    >
                      Reply
                    </button>
                    <button
                      type="button"
                      className="hover:text-gray-900 transition-colors flex items-center space-x-1"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Inline Reply Form */}
                  {replyingToId === comment.id && (
                    <div className="mt-3 flex items-center space-x-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${comment.author}...`}
                        className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-hidden focus:border-gray-400"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleAddReply(comment.id)}
                        className="px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors flex items-center space-x-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send</span>
                      </button>
                    </div>
                  )}

                  {/* Render Nested Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-3">
                          <div className="w-7 h-7 rounded-lg bg-[#1c1c1c] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {reply.avatarLetter}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-xs text-gray-900">
                                {reply.author}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {reply.timeAgo}
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 mt-0.5">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        </div>
      </div>
    </div>
  );
};




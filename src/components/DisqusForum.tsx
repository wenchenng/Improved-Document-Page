import React from 'react';
// @ts-ignore disqus-react types might not be installed
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare } from 'lucide-react';

interface DisqusForumProps {
  url?: string;
  identifier?: string;
  title?: string;
}

export const DisqusForum: React.FC<DisqusForumProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : 'https://ocbc-digital.example.com/statements',
  identifier = 'ocbc-view-statements-page-1',
  title = 'OCBC View Statement/Letter Forum',
}) => {
  const disqusShortname = 'ocbc-new-example';

  const disqusConfig = {
    url: url,
    identifier: identifier,
    title: title,
    language: 'en',
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 bg-gray-50/50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-[#ED1C24]" />
          <h3 className="font-bold text-gray-900 text-lg">Community Discussion & Feedback</h3>
        </div>
        <div className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded border border-gray-200 shadow-2xs">
          <CommentCount shortname={disqusShortname} config={disqusConfig}>
            Comments
          </CommentCount>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-2xs min-h-[250px]">
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    </div>
  );
};

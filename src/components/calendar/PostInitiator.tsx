import React from 'react';
import PostInitiatorModal from './PostInitiatorModal';

interface PostInitiatorProps {
  selectedDate: Date | null;
  onClose: () => void;
  onSubmit: (route: 'concepts' | 'editor') => void;
}

const PostInitiator: React.FC<PostInitiatorProps> = ({ selectedDate, onClose, onSubmit }) => {
  return (
    <PostInitiatorModal
      selectedDate={selectedDate}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default PostInitiator;
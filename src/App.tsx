import React from 'react';
import { ErrorBoundary } from './components/shared';
import ContentCalendar from './components/calendar/ContentCalendar';
import ContentCreator from './components/layout/ContentCreator';
import PostInitiatorModal from './components/calendar/PostInitiatorModal';
import DeepLearnOnboarding from './components/onboarding/DeepLearnOnboarding';
import { useStudioStore } from './store';

function App() {
  const { 
    showStudio, 
    setShowStudio, 
    showPostInitiator, 
    setShowPostInitiator,
    isOnboarded,
    completeOnboarding
  } = useStudioStore();

  const handleCreatePost = () => {
    setShowPostInitiator(true);
  };

  const handlePostInitiatorSubmit = (route: 'concepts' | 'editor') => {
    setShowPostInitiator(false);
    setShowStudio(true);
  };

  if (!isOnboarded) {
    return <DeepLearnOnboarding onComplete={completeOnboarding} />;
  }

  return (
    <ErrorBoundary>
      {showStudio ? (
        <ContentCreator onBack={() => setShowStudio(false)} />
      ) : (
        <ContentCalendar onCreatePost={handleCreatePost} />
      )}
      
      {showPostInitiator && !showStudio && (
        <PostInitiatorModal
          selectedDate={null}
          onClose={() => setShowPostInitiator(false)}
          onSubmit={handlePostInitiatorSubmit}
        />
      )}
    </ErrorBoundary>
  );
}

export default App;
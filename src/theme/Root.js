import React from 'react';
import AIAssistant from '@site/src/components/AIAssistant';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <>
      {children}
      <AIAssistant />
    </>
  );
}

import React from 'react';
import ChatBox from './ChatBox';

export default function LivePreviewExample() {
  return (
    <>
      <div className="z-over py-5">
        <div className="pb-3 pb-xl-5">
          {/* <NavigationBar />  */}
          <ChatBox />
        </div>
      </div>
    </>
  );
}

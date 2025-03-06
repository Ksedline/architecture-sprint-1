import React from "react";
const RemotePlaces = React.lazy(() => import("places/Places"));

function Places(props) {
  return (
    <div>
      <React.Suspense fallback={<div>Загрузка...</div>}>
        <RemotePlaces {...props} />
      </React.Suspense>
    </div>
  );
}

export default Places;

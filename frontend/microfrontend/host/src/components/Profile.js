import React from "react";
const RemoteProfile = React.lazy(() => import("profile/Profile"));

function Profile(props) {
  return (
    <div>
      <React.Suspense fallback={<div>Загрузка...</div>}>
        <RemoteProfile {...props} />
      </React.Suspense>
    </div>
  );
}

export default Profile;

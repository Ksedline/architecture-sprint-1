import React from "react";
const RemoteLogin = React.lazy(() => import("auth/Login"));

function Login(props) {
  return (
    <div>
      <React.Suspense fallback={<div>Загрузка...</div>}>
        <RemoteLogin {...props} />
      </React.Suspense>
    </div>
  );
}

export default Login;

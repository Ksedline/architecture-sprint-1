import React from "react";
const RemoteRegister = React.lazy(() => import("auth/Register"));

function Register(props) {
  return (
    <div>
      <React.Suspense fallback={<div>Загрузка...</div>}>
        <RemoteRegister {...props} />
      </React.Suspense>
    </div>
  );
}

export default Register;

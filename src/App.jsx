import Router from "shared/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "redux/modules/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      dispatch(checkToken());
    }
  }, [dispatch]);
  return <Router />;
}

export default App;

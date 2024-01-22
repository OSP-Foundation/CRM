import React, { Fragment, useLayoutEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SideBar } from "../components";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/user";

interface props {
  isAuth?: boolean
}

const Protected = ({ isAuth }: props) => {
  const [view, setView] = useState<React.ReactElement | null>(null);

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const abort = new AbortController();

    (async () => {
      let res: any = await dispatch(fetchUser(abort?.signal));

      if (res?.payload) {
        if (isAuth) {
          setView(<Fragment>
            <SideBar />
            <div id="include-sidebar">
              <Outlet />
            </div>
          </Fragment>)
        } else {
          navigate('/')
        }
      } else if (res?.error && res?.error?.code !== "ERR_CANCELED") {
        if (isAuth) {
          navigate('/sign-in')
        } else {
          setView(<Outlet />)
        }
      }
    })();

    return () => {
      abort?.abort()
    }
  }, [location?.pathname, isAuth])

  return view
}

export default Protected
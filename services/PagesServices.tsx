import {useRouter} from "next/router";
import {useState} from "react";

export const PagesServices = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const onLoadingPage = async (
    getUserById: Function,
    getRequests: Function,
    getAllRoomsIds: Function,
    check: Function
  ) => {
    setPageLoading(true);
    const resCheck = await check();
    console.log('test', resCheck)
    if (('data' in resCheck && resCheck.status !== 200) || ('data' in resCheck && typeof resCheck.data === "string")) {
      await router.push('/')
      return
    } else {
      localStorage.setItem('id', resCheck.data.id);
      localStorage.setItem('email', resCheck.data.email);
      localStorage.setItem('username', resCheck.data.username);
    }
    const id = localStorage.getItem('id') || '';
    const responseUser = await getUserById(id);
    const { friendsRequests } = responseUser.data;
    const requests = await getRequests(friendsRequests, id);
    setPageLoading(false);
    return {
      ...responseUser.data,
      inReqs: requests.data.inReqs,
      outReqs: requests.data.outReqs,
    }
  }

  return {pageLoading, onLoadingPage}
}

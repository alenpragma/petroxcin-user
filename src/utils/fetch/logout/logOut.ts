import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const signOut = () => {
  const router = useRouter();
  const removeToken = Cookies.remove("yeldoToken");
  router.push("/");
  return removeToken;
};

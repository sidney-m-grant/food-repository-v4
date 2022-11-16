import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/util/ProtectedRoute";
import PrimaryLayout from "../components/layouts/PrimaryLayout";

const noAuthRequired = ["/", "/SignIn"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <PrimaryLayout>
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        </PrimaryLayout>
      )}
    </AuthContextProvider>
  );
}

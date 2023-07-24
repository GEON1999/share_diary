import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "next.config"
import Script from "next/script";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
    /*function kakaoInit() { // 페이지가 로드되면 실행
        config.kakao.init(config.kakao.jsKey);
    }*/
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
        {/*<Script
            src='https://developers.kakao.com/sdk/js/kakao.js'
            onLoad={kakaoInit}
        ></Script>*/}
    </QueryClientProvider>
  );
}

import "@/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Layout from "@/components/common/Layout";
import { AuthProvider } from "@/Providers/AuthProvider";
import styled from "styled-components";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  /*function kakaoInit() { // 페이지가 로드되면 실행
        config.kakao.init(config.kakao.jsKey);
    }*/
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Layout
        layout={Component?.layout ?? "default"}
        notAuthPage={Component?.notAuthPage ?? false}
      >
        {page}
      </Layout>
    ));
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {/*<Script
            src='https://developers.kakao.com/sdk/js/kakao.js'
            onLoad={kakaoInit}
        ></Script>*/}
        <AuthProvider>
          <div>{getLayout(<Component {...pageProps} />)}</div>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

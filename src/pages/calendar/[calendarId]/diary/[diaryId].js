import useDiaryQuery from "@/Queries/useDiaryQuery";
import { useRouter } from "next/router";
import styled from "styled-components";
import CalendarNav from "@/components/common/CalendarNav";
import { useForm } from "react-hook-form";
import useCalendarMutation from "@/Queries/useCalendarMutation";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import useDiaryMutation from "@/Queries/useDiaryMutation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const DiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
  padding-bottom: 50px;

  @media (max-width: 800px) {
    padding-bottom: 10px;
    height: 510px;
    width: 340px;
  }
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 0px;

  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 20px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 15px;
  }
`;

const Button = styled.button`
  background-color: rgba(25, 25, 112, 0.5);
  color: #ffffff;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  margin-top: 50px;

  &:hover {
    background-color: rgb(25, 25, 112);
    transition: 0.5s;
  }

  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: ${({ isImage }) => (isImage ? "0px" : "-10px")};
  @media (max-width: 800px) {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const ImageUploadBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;
  & > img {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 800px) {
    margin: 10px 0px 10px 0px;
  }
`;

const Texteditor = styled.div`
  display: block;
  flex-direction: column;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    height: 160px;
    width: 290px;
    margin-top: -15px;
  }
`;

/*const Span = styled.span`
  color: #ffffff;
`;*/

const DiaryDetail = () => {
  const router = useRouter();

  const { calendarId, diaryId } = router.query;
  const {
    data: diaryDetail,
    isLoading,
    refetch,
  } = useDiaryQuery.useGetDiaryDetail({
    calendarId,
    diaryId,
  });
  const [text, setText] = useState(diaryDetail?.diary?.constructor ?? "");
  const [image, setImage] = useState(diaryDetail?.diary?.img ?? "");

  useEffect(() => {
    !isLoading && setText(diaryDetail?.diary?.content ?? "");
  }, [isLoading]);

  const { mutate: updateDiary } = useMutation(useDiaryMutation.putDiary);

  const { mutate: uploadImage } = useMutation(
    useCalendarMutation.useUploadImage
  );

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data, content: text, img: image };
    updateDiary(
      { calendarId, diaryId, data: formData },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("수정되었습니다.");
            refetch();
          } else {
            alert(data?.data?.message ?? "수정에 실패하였습니다.");
          }
        },
      }
    );
  };

  const handleImage = async (e) => {
    await uploadImage(e.target.files[0], {
      onSuccess: async (data) => {
        setImage(data.url);
      },
    });
  };

  const handleImageBtn = () => {
    document.getElementById("img_upload").click();
  };

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <>
      <CalendarNav />
      <Container>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DiaryWrapper>
              <Title>일기 수정</Title>
              <Input
                type="text"
                {...register("title")}
                defaultValue={diaryDetail?.diary?.title}
              />
              <div className="form_box">
                <ImageUploadBtn className="upload_wrap">
                  <input
                    id="img_upload"
                    className="hidden"
                    onInput={handleImage}
                    accept=".jpg, .png, .bmp, .gif, .svg, .webp"
                    {...register("inquire_image")}
                    type="file"
                  />
                  <Label isImage={image ? true : false}>썸네일 추가</Label>
                  <img
                    className={`cursor-pointer`}
                    onClick={handleImageBtn}
                    src={
                      image
                        ? image
                        : "https://dhgilmy0l2xzq.cloudfront.net/ae6a89a2-e974-4c2a-a7b5-1794a3bf3b86-20240109122208.png"
                    }
                    alt="upload"
                  />
                </ImageUploadBtn>
              </div>
              <Texteditor>
                <Label>내용</Label>
                {ReactQuill && (
                  <ReactQuill
                    style={{ height: "130px" }}
                    value={text}
                    onChange={handleChange}
                  />
                )}
              </Texteditor>
              {/*<Span>작성자 : {diaryDetail?.diary?.user?.name}</Span>*/}
              <Button type={"submit"}>수정</Button>
            </DiaryWrapper>
          </form>
        )}
      </Container>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { req, res, query } = ctx;
  const queryClient = new QueryClient();

  const { calendarId, diaryId } = query;

  await queryClient.prefetchQuery(["DIARY_DETAIL", calendarId, diaryId], () => {
    return useDiaryQuery.getDiaryDetail(
      calendarId,
      diaryId,
      process.env.AXIOS_AUTHORIZATION_SECRET
    );
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default DiaryDetail;

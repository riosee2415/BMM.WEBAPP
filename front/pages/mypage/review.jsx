import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CustomPage,
  Image,
  CommonButton,
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";
import { Modal } from "antd";
import {
  CloseOutlined,
  PictureOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
`;

const ImageList = styled(Wrapper)`
width: 100%;
flex-direction: row;
justify-content: flex-start;
margin: 0 0 15px;
padding-right: 10px;

`;

const TextWrapper = styled(Wrapper)`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 0 0 50px;
  font-size: 16px;

  @media (max-width: 600px) {
    width: 65%;
  }
`;

const BeforeBtn = styled(Wrapper)`
  width: 49%;
  height: 54px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${Theme.white_C};
  border: 1px solid ${Theme.lightGrey2_C};

  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.lightGrey2_C};
    color: ${(props) => props.theme.black_C};
  }

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const PictureWrapper = styled(Wrapper)`
  width: 20%;
  height: 100px;
  border: 1px solid ${Theme.lightGrey2_C};
  border-radius: 5%;
  background-color: ${Theme.lightGrey2_C};
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.lightGrey3_C};
  }

  @media (max-width: 600px) {
    height: 55px;
  }
`;

const Review = () => {
  ////// GLOBAL STATE //////
  const [isModal, setIsModal] = useState(false);

  ////// HOOKS //////
  const width = useWidth();

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 나의 리뷰 내역</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 100px`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `26px` : `30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>나의 리뷰내역</Text>
            </Wrapper>

            <Wrapper
              height={`54px`}
              dr={`row`}
              color={Theme.grey_C}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={`16px`}
              fontWeight={`600`}
              //   display={width < 800 ? `none` : `flex`}
            >
              <Wrapper width={width < 600 ? `65%` : `85%`}>리뷰 제목</Wrapper>
              <Wrapper width={width < 600 ? `35%` : `15%`}>작성 날짜</Wrapper>
            </Wrapper>
            <List>
              <TextWrapper onClick={modalToggle}>
                <Text width={`52%`} isEllipsis isHover>
                  리뷰의 내용이 30자로 들어오게 됩니다. 제목의 역할을 하게
                  됩니다. 내용이 더 들어오게 된다면 이렇게 나타납니다. 내용이 더
                  들어오게 된다면 이렇게 나타납니다. 내용이 더 들어오게 된다면
                  이렇게 나타납니다. 내용이 더 들어오게 된다면 이렇게
                  나타납니다.
                </Text>
                <Wrapper width={`auto`} color={Theme.lightGrey_C}>
                  <PictureOutlined />
                </Wrapper>
              </TextWrapper>
              <Wrapper width={width < 600 ? `25%` : `15%`} color={Theme.lightGrey_C}>
                2022.12.31
              </Wrapper>
            </List>
            <CustomPage />
          </RsWrapper>

          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            closable={null}
            width={`65%`}
          >
            <Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} padding={`0 0 14px`}>
                <Text fontSize={`16px`}>작성자 : imnickname</Text>
                <Text color={Theme.lightGrey_C}>2022.12.21</Text>
              </Wrapper>
            </Wrapper>
            <ImageList >
              <Image
                alt="리뷰 사진"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                width={`122px`}
              />
              <Image
                alt="리뷰 사진"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                width={`122px`}
              />
              <Image
                alt="리뷰 사진"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                width={`122px`}
              />
              <Image
                alt="리뷰 사진"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                width={`122px`}
              />
            </ImageList>
            <Wrapper margin={`0 0 55px`}>
              <Text>
                리뷰의 내용이 30자로 들어오게 됩니다. 제목의 역할을 하게 됩니다.
                내용이 더 들어오게 된다면 이렇게 나타납니다. 내용이 더 들어오게
                된다면 이렇게 나타납니다. 내용이 더 들어오게 된다면 이렇게
                나타납니다. 내용이 더 들어오게 된다면 이렇게 나타납니다.
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text onclick={modalToggle} cursor={`pointer`}>
                삭제
              </Text>
              <Text onClick={modalToggle} cursor={`pointer`}>
                닫기
                <CloseOutlined />
              </Text>
            </Wrapper>
          </Modal>

          {/* <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            <Wrapper padding={`20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 18px`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `24px`}
                  fontWeight={`600`}
                >
                  리뷰 삭제하기
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  fontSize={`20px`}
                  onClick={modalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>
              <Wrapper>
                <Wrapper margin={`50px 0 50px`}>
                  <Text
                    fontSize={width < 900 ? `16px` : `18px`}
                    margin={`0 0 15px`}
                  >
                    리뷰를 삭제하시겠습니까?
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <BeforeBtn onClick={modalToggle}>리뷰삭제하기</BeforeBtn>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`49%`}
                    height={`54px`}
                    onClick={modalToggle}
                  >
                    취소하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Modal> */}

          {/* <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            <Wrapper padding={`20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 17px`}
                margin={`0 0 23px`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `24px`}
                  fontWeight={`600`}
                >
                  리뷰 수정하기
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  fontSize={`20px`}
                  onClick={modalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>
              <Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text fontSize={`16px`} margin={`0 0 15px`}>
                    작성자
                  </Text>
                  <Wrapper
                    width={`80%`}
                    height={width < 600 ? `35px` : `46px`}
                    al={`flex-start`}
                    border={`1px solid ${Theme.lightGrey3_C}`}
                    bgColor={Theme.lightGrey3_C}
                    color={Theme.lightGrey_C}
                    padding={`0 11px`}
                    fontSize={width < 900 ? `14px` : `16px`}
                    margin={`0 0 15px`}
                  >
                    <Text>imnickname</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text
                    margin={width < 600 ? `0` : `-30% 0 0`}
                    fontSize={`16px`}
                  >
                    리뷰 내용
                  </Text>

                  <Wrapper
                    width={width < 600 ? `100%` : `80%`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    margin={width < 600 ? `0 0 30px` : `0 0 40px`}
                  >
                    <Text width={`100%`} height={`145px`} padding={`5px`}>
                      리뷰의 내용이 있었다고용~
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <Text fontSize={`16px`}>사진 첨부</Text>
                </Wrapper>
                  <Wrapper
                    width={`100%`}
                    dr={`row`}
                    ju={`space-between`}
                    margin={`0 0 25px`}
                  >
                    <Image
                      alt="리뷰 사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                      width={`20%`}
                    />
                    <PictureWrapper>
                      <Text fontSize={width < 600 ? `14px` : `20px`} >
                        <PlusOutlined />
                      </Text>
                      <Text>첨부하기</Text>
                    </PictureWrapper>
                    <PictureWrapper>
                      <Text fontSize={width < 600 ? `14px` : `20px`}>
                        <PlusOutlined />
                      </Text>
                      <Text>첨부하기</Text>
                    </PictureWrapper>
                    <PictureWrapper>
                      <Text fontSize={width < 600 ? `14px` : `20px`}>
                        <PlusOutlined />
                      </Text>
                      <Text>첨부하기</Text>
                    </PictureWrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <BeforeBtn onClick={modalToggle}>이전으로</BeforeBtn>
                <CommonButton
                  fontSize={width < 500 ? `16px` : `18px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                  width={`49%`}
                  height={`54px`}
                  onClick={modalToggle}
                >
                  수정하기
                </CommonButton>
              </Wrapper>
          </Modal> */}
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Review;

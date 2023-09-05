import React, { useCallback, useEffect, useState } from "react";
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
  SpanText,
  TextArea,
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";
import { Empty, Form, Modal, message } from "antd";
import {
  CloseOutlined,
  PictureOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  MY_REVIEW_REQUEST,
  REVIEW_DELETE_REQUEST,
  REVIEW_IMAGE1_UPLOAD_REQUEST,
  REVIEW_IMAGE1_RESET,
  REVIEW_UPDATE_REQUEST,
  REVIEW_ALL_RESET,
  REVIEW_IMAGE2_RESET,
  REVIEW_IMAGE3_RESET,
  REVIEW_IMAGE4_RESET,
  REVIEW_IMAGE2_UPLOAD_REQUEST,
  REVIEW_IMAGE3_UPLOAD_REQUEST,
  REVIEW_IMAGE4_UPLOAD_REQUEST,
} from "../../reducers/review";
import { current } from "immer";
import { useRef } from "react";
import useInput from "../../hooks/useInput";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
`;

const TextWrapper = styled(Wrapper)`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 0 0 50px;
  font-size: 16px;

  @media (max-width: 700px) {
    width: 75%;
    padding: 0;
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
  width: 111px;
  height: 111px;
  border: 1px solid ${Theme.lightGrey2_C};
  border-radius: 5%;
  background-color: ${Theme.lightGrey2_C};
  color: ${Theme.grey_C};
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.lightGrey3_C};
  }

  @media (max-width: 600px) {
    width: 150px;
    height: 150px;
  }
`;

const Circle = styled(Wrapper)`
  width: 15px;
  height: 15px;
  background: ${Theme.white_C};
  border-radius: 100%;
  color: ${Theme.red_C};
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 10px;

  &:hover {
    cursor: pointer;
    background: ${Theme.red_C};
    color: ${Theme.white_C};
  }
`;

const Review = () => {
  ////// GLOBAL STATE //////
  const {
    myReviewList,
    lastPage,
    reviewImage1Path,
    reviewImage2Path,
    reviewImage3Path,
    reviewImage4Path,
    //
    st_myReviewDeleteDone,
    st_myReviewDeleteError,
    //
    st_myReviewUpdateDone,
    st_myReviewUpdateError,
  } = useSelector((state) => state.review);

  // MODAL
  const [deleteModal, setDeleteModal] = useState(false);
  const [uModal, setUModal] = useState(false); // 수정모달

  const [isVisible, setIsVisible] = useState(false);
  const [visibleId, setVisibleId] = useState(null);

  // DATA
  const [currentTab, setCurrentTab] = useState(1);
  const [currentData, setCurrentData] = useState(null);
  const [image1Data, setImage1Data] = useState(null);
  const [image2Data, setImage2Data] = useState(null);
  const [image3Data, setImage3Data] = useState(null);
  const [image4Data, setImage4Data] = useState(null);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  // INPUT
  const reviewInput = useInput(``);

  // reviewImage
  const review1Ref = useRef();
  const review2Ref = useRef();
  const review3Ref = useRef();
  const review4Ref = useRef();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: MY_REVIEW_REQUEST,
      data: {
        page: currentTab,
      },
    });
  }, [currentTab]);

  useEffect(() => {
    if (st_myReviewDeleteDone) {
      message.success("리뷰가 삭제되었습니다.");

      dispatch({
        type: MY_REVIEW_REQUEST,
        data: {
          page: currentTab,
        },
      });
    }

    if (st_myReviewDeleteError) {
      return message.error(st_myReviewDeleteError);
    }
  }, [st_myReviewDeleteDone, st_myReviewDeleteError]);

  useEffect(() => {
    if (st_myReviewUpdateDone) {
      dispatch({
        type: MY_REVIEW_REQUEST,
        data: {
          page: currentTab,
        },
      });
      setUModal(false);
      dispatch({
        type: REVIEW_ALL_RESET,
      });

      return message.success("리뷰가 수정되었습니다.");
    }

    if (st_myReviewUpdateError) {
      return message.error(st_myReviewUpdateError);
    }
  }, [st_myReviewUpdateDone, st_myReviewUpdateError]);

  ////// TOGGLE //////
  const modalToggle = useCallback(
    (data) => {
      if (data.id === visibleId) {
        setIsVisible(false);
        setVisibleId(null);

        return;
      }
      if (data) {
        setVisibleId(data.id);
        setIsVisible(true);
      }
    },
    [isVisible, visibleId]
  );

  const deletemodalToggle = useCallback(
    (data) => {
      setDeleteModal((prev) => !prev);
      if (data) {
        setCurrentData(data);
      } else {
        setCurrentData(null);
      }
    },
    [deleteModal, currentData]
  );

  const uModalToggle = useCallback(
    (data) => {
      setUModal((prev) => !prev);
      if (data) {
        setCurrentData(data);
        reviewInput.setValue(data.content);
        if (data.imagePath1) {
          setImage1Data(data.imagePath1);
        }
        if (data.imagePath2) {
          setImage2Data(data.imagePath2);
        }
        if (data.imagePath3) {
          setImage3Data(data.imagePath3);
        }
        if (data.imagePath4) {
          setImage4Data(data.imagePath4);
        }
      } else {
        setCurrentData(null);
      }
    },
    [uModal, currentData]
  );

  ////// HANDLER //////

  // 이미지 리셋1
  const reviewImage1ResetHandler = useCallback(() => {
    setImage1Data(null);
    dispatch({
      type: REVIEW_IMAGE1_RESET,
    });
  }, []);
  // 이미지 리셋2
  const reviewImage2ResetHandler = useCallback(() => {
    setImage2Data(null);
    dispatch({
      type: REVIEW_IMAGE2_RESET,
    });
  }, []);
  // 이미지 리셋3
  const reviewImage3ResetHandler = useCallback(() => {
    setImage3Data(null);
    dispatch({
      type: REVIEW_IMAGE3_RESET,
    });
  }, []);
  // 이미지 리셋4
  const reviewImage4ResetHandler = useCallback(() => {
    setImage4Data(null);
    dispatch({
      type: REVIEW_IMAGE4_RESET,
    });
  }, []);

  // 이미지1 클릭
  const reviewImage1ClickHandler = useCallback(() => {
    review1Ref.current.click();
  }, [review1Ref]);

  // 이미지2 클릭
  const reviewImage2ClickHandler = useCallback(() => {
    review2Ref.current.click();
  }, [review2Ref]);

  // 이미지3 클릭
  const reviewImage3ClickHandler = useCallback(() => {
    review3Ref.current.click();
  }, [review3Ref]);

  // 이미지4 클릭
  const reviewImage4ClickHandler = useCallback(() => {
    review4Ref.current.click();
  }, [review4Ref]);

  // 이미지1 업로드
  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: REVIEW_IMAGE1_UPLOAD_REQUEST,
      data: formData,
    });
  });

  // 이미지2 업로드
  const onChangeImages2 = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: REVIEW_IMAGE2_UPLOAD_REQUEST,
      data: formData,
    });
  });

  // 이미지3 업로드
  const onChangeImages3 = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: REVIEW_IMAGE3_UPLOAD_REQUEST,
      data: formData,
    });
  });

  // 이미지4 업로드
  const onChangeImages4 = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: REVIEW_IMAGE4_UPLOAD_REQUEST,
      data: formData,
    });
  });

  //페이지네이션
  const nextPageCall = useCallback(
    (changePage) => {
      setCurrentTab(changePage);
    },
    [currentTab]
  );

  // 리뷰 수정하기
  const updateHandler = useCallback(() => {
    if (!reviewInput.value) {
      return message.error("리뷰 내용을 입력해주세요.");
    }

    dispatch({
      type: REVIEW_UPDATE_REQUEST,
      data: {
        id: currentData && currentData.id,
        content: reviewInput.value,
        imagePath1: reviewImage1Path ? reviewImage1Path : image1Data,
        imagePath2: reviewImage2Path ? reviewImage2Path : image2Data,
        imagePath3: reviewImage3Path ? reviewImage3Path : image3Data,
        imagePath4: reviewImage4Path ? reviewImage4Path : image4Data,
      },
    });
  }, [
    currentData,
    reviewInput,
    reviewImage1Path,
    image1Data,
    image2Data,
    image3Data,
    image4Data,
  ]);

  const deleteHandler = useCallback(
    (data) => {
      dispatch({
        type: REVIEW_DELETE_REQUEST,
        data: {
          id: currentData.id,
        },
      });
    },
    [currentData]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 나의 리뷰 내역</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 0` : `95px 0 0`}>
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
            >
              <Wrapper width={width < 700 ? `75%` : `85%`}>리뷰 제목</Wrapper>
              <Wrapper width={width < 700 ? `25%` : `15%`}>작성 날짜</Wrapper>
            </Wrapper>
            {myReviewList && myReviewList.length === 0 ? (
              <Wrapper padding={`50px 0`}>
                <Empty description="조회된 리뷰 내역이 없습니다." />
              </Wrapper>
            ) : (
              myReviewList.map((data) => {
                return (
                  <Wrapper key={data.id}>
                    <List onClick={() => modalToggle(data)}>
                      <TextWrapper>
                        <Text
                          maxWidth={width < 700 ? `80%` : `52%`}
                          isEllipsis
                          isHover
                        >
                          {data.content}
                        </Text>
                        <Wrapper width={`auto`} color={Theme.lightGrey_C}>
                          <PictureOutlined />
                        </Wrapper>
                      </TextWrapper>
                      <Wrapper
                        width={width < 700 ? `25%` : `15%`}
                        color={Theme.lightGrey_C}
                      >
                        {data.viewCreatedAt}
                      </Wrapper>
                    </List>
                    {visibleId === data.id && isVisible && (
                      <Wrapper
                        bgColor={Theme.lightGrey3_C}
                        padding={width < 700 ? `15px` : `30px`}
                      >
                        <Wrapper
                          dr={`row`}
                          ju={`space-between`}
                          padding={`0 0 14px`}
                        >
                          <Text fontSize={`16px`}>
                            작성자 : {data.username}
                          </Text>
                          <Text color={Theme.lightGrey_C}>
                            {data.viewCreatedAt}
                          </Text>
                        </Wrapper>
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          {data.imagePath1 && (
                            <Image
                              alt="리뷰 사진"
                              src={data.imagePath1}
                              width={width < 700 ? `95px` : `122px`}
                              height={width < 700 ? `95px` : `122px`}
                              margin={`0 11px 10px 0`}
                            />
                          )}
                          {data.imagePath2 && (
                            <Image
                              alt="리뷰 사진"
                              src={data.imagePath2}
                              width={width < 700 ? `95px` : `122px`}
                              height={width < 700 ? `95px` : `122px`}
                              margin={`0 11px 10px 0`}
                            />
                          )}
                          {data.imagePath3 && (
                            <Image
                              alt="리뷰 사진"
                              src={data.imagePath3}
                              width={width < 700 ? `95px` : `122px`}
                              height={width < 700 ? `95px` : `122px`}
                              margin={`0 11px 10px 0`}
                            />
                          )}
                          {data.imagePath4 && (
                            <Image
                              alt="리뷰 사진"
                              src={data.imagePath4}
                              width={width < 700 ? `95px` : `122px`}
                              height={width < 700 ? `95px` : `122px`}
                              margin={`0 11px 10px 0`}
                            />
                          )}
                        </Wrapper>

                        <Wrapper
                          margin={`0 0 55px`}
                          al={`flex-start`}
                          color={Theme.grey_C}
                        >
                          <Text>{data.content}</Text>
                        </Wrapper>
                        <Wrapper
                          dr={`row`}
                          ju={`space-between`}
                          fontSize={`16px`}
                        >
                          <Wrapper dr={`row`} width={`auto`}>
                            <Text
                              color={Theme.lightGrey_C}
                              isHover
                              margin={`0 10px 0 0`}
                              onClick={() => uModalToggle(data)}
                            >
                              수정
                            </Text>
                            <Text
                              isHover
                              onClick={() => deletemodalToggle(data)}
                              color={Theme.lightGrey_C}
                            >
                              삭제
                            </Text>
                          </Wrapper>
                          <Text isHover onClick={modalToggle}>
                            닫기
                            <SpanText
                              margin={`0 0 0 5px`}
                              color={Theme.basicTheme_C}
                            >
                              <CloseOutlined />
                            </SpanText>
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    )}
                  </Wrapper>
                );
              })
            )}

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentTab)}
              total={lastPage * 10}
              pageSize={10}
              onChange={(page) => nextPageCall(page)}
            />
          </RsWrapper>

          <Modal
            onCancel={deletemodalToggle}
            visible={deleteModal}
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
                  onClick={deletemodalToggle}
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
                  <BeforeBtn onClick={deleteHandler}>리뷰삭제하기</BeforeBtn>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`49%`}
                    height={`54px`}
                    onClick={deletemodalToggle}
                  >
                    취소하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Modal>

          <Modal
            onCancel={uModalToggle}
            visible={uModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            {visibleId === (currentData && currentData.id) && isVisible && (
              <Wrapper padding={width < 600 ? `20px 0px` : `20px`}>
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
                    onClick={uModalToggle}
                  >
                    <CloseOutlined />
                  </Text>
                </Wrapper>
                <Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 15px`}>
                    <Text lineHeight={`46px`} fontSize={`16px`}>
                      작성자
                    </Text>
                    <Wrapper
                      width={width < 700 ? `100%` : `80%`}
                      height={`46px`}
                      al={`flex-start`}
                      border={`1px solid ${Theme.lightGrey3_C}`}
                      bgColor={Theme.lightGrey3_C}
                      color={Theme.lightGrey_C}
                      padding={`0 11px`}
                      fontSize={width < 900 ? `14px` : `16px`}
                    >
                      <Text>{currentData.username}</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    margin={`0 0 20px`}
                    al={`flex-start`}
                  >
                    <Text fontSize={`16px`} lineHeight={`46px`}>
                      리뷰 내용
                    </Text>

                    <TextArea
                      width={width < 700 ? `100%` : `80%`}
                      height={`145px`}
                      placeholder="리뷰를 작성해주세요."
                      {...reviewInput}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Text fontSize={`16px`}>사진 첨부</Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    margin={`8px 0 25px`}
                  >
                    {reviewImage1Path || image1Data ? (
                      <>
                        <Wrapper
                          position={`relative`}
                          width={width < 600 ? `150px` : `111px`}
                        >
                          <Image
                            radius={`5%`}
                            height={width < 600 ? `150px` : `111px`}
                            alt="리뷰 사진"
                            src={
                              reviewImage1Path ? reviewImage1Path : image1Data
                            }
                          />
                          <Circle onClick={reviewImage1ResetHandler}>
                            <CloseOutlined />
                          </Circle>
                        </Wrapper>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          name="image"
                          accept=".png, .jpg"
                          // multiple
                          hidden
                          ref={review1Ref}
                          onChange={onChangeImages}
                        />
                        <PictureWrapper onClick={reviewImage1ClickHandler}>
                          <Text fontSize={width < 700 ? `14px` : `20px`}>
                            <PlusOutlined />
                          </Text>
                          <Text>첨부하기</Text>
                        </PictureWrapper>
                      </>
                    )}
                    {reviewImage2Path || image2Data ? (
                      <>
                        <Wrapper
                          position={`relative`}
                          width={width < 600 ? `150px` : `111px`}
                        >
                          <Image
                            radius={`5%`}
                            height={width < 600 ? `150px` : `111px`}
                            alt="리뷰 사진"
                            src={
                              reviewImage2Path ? reviewImage2Path : image2Data
                            }
                          />
                          <Circle onClick={reviewImage2ResetHandler}>
                            <CloseOutlined />
                          </Circle>
                        </Wrapper>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          name="image"
                          accept=".png, .jpg"
                          // multiple
                          hidden
                          ref={review2Ref}
                          onChange={onChangeImages2}
                        />
                        <PictureWrapper onClick={reviewImage2ClickHandler}>
                          <Text fontSize={width < 700 ? `14px` : `20px`}>
                            <PlusOutlined />
                          </Text>
                          <Text>첨부하기</Text>
                        </PictureWrapper>
                      </>
                    )}
                    {reviewImage3Path || image3Data ? (
                      <>
                        <Wrapper
                          position={`relative`}
                          width={width < 600 ? `150px` : `111px`}
                        >
                          <Image
                            radius={`5%`}
                            height={width < 600 ? `150px` : `111px`}
                            alt="리뷰 사진"
                            src={
                              reviewImage3Path ? reviewImage3Path : image3Data
                            }
                          />
                          <Circle onClick={reviewImage3ResetHandler}>
                            <CloseOutlined />
                          </Circle>
                        </Wrapper>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          name="image"
                          accept=".png, .jpg"
                          // multiple
                          hidden
                          ref={review3Ref}
                          onChange={onChangeImages3}
                        />
                        <PictureWrapper onClick={reviewImage3ClickHandler}>
                          <Text fontSize={width < 700 ? `14px` : `20px`}>
                            <PlusOutlined />
                          </Text>
                          <Text>첨부하기</Text>
                        </PictureWrapper>
                      </>
                    )}
                    {reviewImage4Path || image4Data ? (
                      <>
                        <Wrapper
                          position={`relative`}
                          width={width < 600 ? `150px` : `111px`}
                        >
                          <Image
                            radius={`5%`}
                            height={width < 600 ? `150px` : `111px`}
                            alt="리뷰 사진"
                            src={
                              reviewImage4Path ? reviewImage4Path : image4Data
                            }
                          />
                          <Circle onClick={reviewImage4ResetHandler}>
                            <CloseOutlined />
                          </Circle>
                        </Wrapper>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          name="image"
                          accept=".png, .jpg"
                          // multiple
                          hidden
                          ref={review4Ref}
                          onChange={onChangeImages4}
                        />
                        <PictureWrapper onClick={reviewImage4ClickHandler}>
                          <Text fontSize={width < 700 ? `14px` : `20px`}>
                            <PlusOutlined />
                          </Text>
                          <Text>첨부하기</Text>
                        </PictureWrapper>
                      </>
                    )}
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <BeforeBtn onClick={uModalToggle}>이전으로</BeforeBtn>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`49%`}
                    height={`54px`}
                    onClick={updateHandler}
                  >
                    수정하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            )}
          </Modal>
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

    context.store.dispatch({
      type: MY_REVIEW_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Review;

import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Table,
  message,
  Form,
  Input,
  Button,
  Popconfirm,
  Drawer,
  Image,
  Select,
} from "antd";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
  DelBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import {
  HomeOutlined,
  RightOutlined,
  AlertOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  BRAND_CREATE_REQUEST,
  BRAND_DELETE_REQUEST,
  BRAND_IMAGE_RESET,
  BRAND_LIST_REQUEST,
  BRAND_UPDATE_REQUEST,
  BRAND_UPLOAD_REQUEST,
} from "../../../reducers/brand";
import {
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_IMAGE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPLOAD1_REQUEST,
  PRODUCT_UPLOAD2_REQUEST,
  PRODUCT_UPLOAD3_REQUEST,
  PRODUCT_UPLOAD4_REQUEST,
} from "../../../reducers/product";
import { DOWN_LIST_REQUEST, UP_LIST_REQUEST } from "../../../reducers/category";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.subTheme5_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const Index = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상품관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  /////////////////////////////////////////////////////////////////////////

  const { brandList } = useSelector((state) => state.brand);
  const {
    productAdminList,
    productPath1,
    productPath2,
    productPath3,
    productPath4,
    productDetail,
    //
    st_productCreateDone,
    st_productCreateError,
    //
    st_productUpdateDone,
    st_productUpdateError,
    //
    st_productDeleteDone,
    st_productDeleteError,
  } = useSelector((state) => state.product);
  const { upList, downList } = useSelector((state) => state.category);
  console.log(productAdminList);

  ////// HOOKS //////

  //   MODAL
  const [isCreateModal, setIsCreateModal] = useState(false); // 생성
  const [isUpdateModal, setIsUpdateModal] = useState(false); // 수정

  //   DATA

  //   FORM
  const [productForm] = Form.useForm();

  //   REF
  const imageRef = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4Ref = useRef();
  const image5Ref = useRef();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_productDeleteDone) {
      dispatch({
        type: PRODUCT_ADMIN_LIST_REQUEST,
      });
      setIsUpdateModal(false);

      return message.success("상품이 삭제되었습니다.");
    }

    if (st_productDeleteError) {
      return message.error(st_productDeleteError);
    }
  }, [st_productDeleteDone, st_productDeleteError]);

  useEffect(() => {
    if (st_productUpdateDone) {
      setIsUpdateModal(false);
      dispatch({
        type: PRODUCT_ADMIN_LIST_REQUEST,
      });

      return message.success("상품이 수정되었습니다.");
    }

    if (st_productUpdateError) {
      return message.error(st_productUpdateError);
    }
  }, [st_productUpdateDone, st_productUpdateError]);

  useEffect(() => {
    if (st_productCreateDone) {
      dispatch({
        type: PRODUCT_ADMIN_LIST_REQUEST,
      });
      setIsCreateModal(false);
      productForm.resetFields();
      return message.success("상품을 생성했습니다.");
    }

    if (st_productCreateError) {
      return message.error(st_productCreateError);
    }
  }, [st_productCreateDone, st_productCreateError]);

  ////// TOGGLE //////

  // 상품 생성 토글
  const productCreateToggle = useCallback(() => {
    productForm.resetFields();
    setIsCreateModal(!isCreateModal);
  }, [isCreateModal]);

  // 이미지 클릭
  const imageClickToggle = useCallback((num) => {
    if (num === 1) {
      imageRef.current.click();
    } else if (num === 2) {
      image2Ref.current.click();
    } else if (num === 3) {
      image3Ref.current.click();
    } else if (num === 4) {
      image4Ref.current.click();
    } else if (num === 5) {
      image5Ref.current.click();
    }
  }, []);
  ////// HANDLER //////

  // 이미지 업로드
  const onChangeImages = useCallback((e, num) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (num === 1) {
      dispatch({
        type: PRODUCT_UPLOAD1_REQUEST,
        data: formData,
      });
    } else if (num === 2) {
      dispatch({
        type: PRODUCT_UPLOAD2_REQUEST,
        data: formData,
      });
    } else if (num === 3) {
      dispatch({
        type: PRODUCT_UPLOAD3_REQUEST,
        data: formData,
      });
    } else {
      dispatch({
        type: PRODUCT_UPLOAD4_REQUEST,
        data: formData,
      });
    }
  });

  // 데이터세팅
  const beforeSetDataHandler = useCallback(
    (record) => {
      setIsUpdateModal(true);
      setCurrentData(record);
      dispatch({
        type: BRAND_IMAGE_RESET,
      });
      dispatch({
        type: PRODUCT_IMAGE_RESET,
      });

      infoForm.setFieldsValue({
        thumbnail1: record.thumbnail1,
        thumbnail2: record.thumbnail2,
        thumbnail3: record.thumbnail3,
        thumbnail4: record.thumbnail4,
        title: record.title,
        description: record.description,
        marketPrice: record.marketPrice,
        memberPrice: record.memberPrice,
        weight: record.weight,
        buyMinLimitCount: record.buyMinLimitCount,
        buyMaxLimitCount: record.buyMaxLimitCount,
        discount: record.discount,
        youtubeLink: record.youtubeLink,
        detailImage: record.detailImage,
        origin: record.origin,
        madeCompany: record.madeCompany,
        location: record.location,
        howToUse: record.howToUse,
        madeDate: record.madeDate,
        howToKeep: record.howToKeep,
        tel: record.tel,
        warning: record.warning,
        canDeliveryArea: record.canDeliveryArea,
        customInfo: record.customInfo,
        refundInfo: record.refundInfo,
        CateUpId: record.CateUpId,
        CateDownId: record.CateDownId,
        BrandId: record.BrandId,
      });
    },
    [currentData, infoForm]
  );

  // 브랜드 삭제
  const productDeleteHandler = useCallback((data) => {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
      data: {
        id: data.id,
        title: data.title,
      },
    });
  }, []);

  //   상품 수정
  const productUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
        data: {
          id: currentData && currentData.id,
          thumbnail1: productPath1,
          thumbnail2: productPath2 ? productPath2 : null,
          thumbnail3: productPath3 ? productPath3 : null,
          thumbnail4: productPath4 ? productPath4 : null,
          detailImage: productDetail
            ? productDetail
            : currentData && currentData.detailImage,
          title: data.title,
          description: data.description,
          marketPrice: data.marketPrice,
          memberPrice: data.memberPrice,
          weight: data.weight,
          buyMinLimitCount: data.buyMinLimitCount,
          buyMaxLimitCount: data.buyMaxLimitCount,
          discount: data.discount,
          youtubeLink: data.youtubeLink,
          origin: data.origin,
          madeCompany: data.madeCompany,
          location: data.location,
          howToUse: data.howToUse,
          madeDate: data.madeDate,
          howToKeep: data.howToKeep,
          tel: data.tel,
          warning: data.warning,
          canDeliveryArea: data.canDeliveryArea,
          customInfo: data.customInfo,
          refundInfo: data.refundInfo,
          CateUpId: data.CateUpId,
          CateDownId: data.CateDownId,
          BrandId: data.BrandId,
        },
      });
    },
    [
      productPath1,
      productPath2,
      productPath3,
      productPath4,
      productDetail,
      currentData,
    ]
  );

  //   상품 생성
  const productCreateHandler = useCallback((data) => {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
      data: {
        CateUpId: data.CateUpId,
        CateDownId: data.CateDownId,
        BrandId: data.BrandId,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "상품명",
      render: (data) => <Image src={data.thumbnail1} alt="image" />,
      width: `15%`,
    },
    {
      title: "브랜명",
      dataIndex: "brandName",
    },
    {
      title: "카테고리명",
      dataIndex: "upCategoryValue",
    },

    {
      title: "상품명",
      dataIndex: "title",
    },
    {
      title: "할인율",
      dataIndex: "viewDiscount",
    },
    {
      title: "마켓가",
      dataIndex: "concatMarketPrice",
    },
    {
      title: "회원가",
      dataIndex: "concatMemberPrice",
    },
    {
      title: "할인가",
      dataIndex: "realPrice",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
      ),
    },
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={() => productDeleteHandler(data)}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* MENU TAB */}
      <Wrapper
        height={`30px`}
        bgColor={Theme.lightGrey_C}
        dr={`row`}
        ju={`flex-start`}
        al={`center`}
        padding={`0px 15px`}
        color={Theme.grey_C}
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
      >
        <HomeText
          margin={`3px 20px 0px 20px`}
          onClick={() => moveLinkHandler("/admin")}
        >
          <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
          메인
        </HomeText>
        <RightOutlined />
        <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
        <RightOutlined />
        <Popover content={content}>
          <HomeText cur={true} margin={`3px 20px 0px 20px`}>
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>사용자가 구매할 수 있는 상품을 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            데이터 변경 시 즉시 반영되니 신중하게 수정해주시기 바랍니다.
          </GuideLi>
          <GuideLi isImpo={true}>삭제된 데이터는 복구가 불가능합니다.</GuideLi>
          <GuideLi isImpo={true}>
            이미지 수정 후 데이터 수정을 눌러야 수정이됩니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper shadow={`3px 3px 6px ${Theme.lightGrey_C}`}>
          <Wrapper margin={`10px 0px`} al={`flex-end`} padding={`0 10px`}>
            <Button size="small" type="primary" onClick={productCreateToggle}>
              상품 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={productAdminList}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>
      </Wrapper>

      <Drawer
        visible={isCreateModal}
        onClose={productCreateToggle}
        title="상품 생성"
        width="600px"
      >
        <Form size="small" onFinish={productCreateHandler} form={productForm}>
          <Form.Item
            label="상위 카테고리"
            name="CateUpId"
            rules={[
              {
                required: true,
                message: "상위 카테고리를 선택해주세요.",
              },
            ]}
          >
            <Select
              placeholder="상위 카테고리를 선택해주세요."
              onChange={(data) =>
                dispatch({
                  type: DOWN_LIST_REQUEST,
                  data: {
                    CateUpId: data,
                  },
                })
              }
            >
              {upList.map((data, idx) => {
                return (
                  <Select.Option key={idx} value={data.id}>
                    {data.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="하위 카테고리"
            name="CateDownId"
            rules={[
              {
                required: true,
                message: "하위 카테고리를 선택해주세요.",
              },
            ]}
          >
            <Select placeholder="하위 카테고리를 선택해주세요.">
              {downList.map((data, idx) => {
                return (
                  <Select.Option key={idx} value={data.id}>
                    {data.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="브랜드"
            name="BrandId"
            rules={[
              {
                required: true,
                message: "브랜드를 선택해주세요.",
              },
            ]}
          >
            <Select placeholder="브랜드를 선택해주세요.">
              {brandList.map((data, idx) => {
                return (
                  <Select.Option key={idx} value={data.id}>
                    {data.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Wrapper al={`flex-end`}>
            <Button type="primary" size="small" htmlType="submit">
              생성
            </Button>
          </Wrapper>
        </Form>
      </Drawer>

      <Drawer
        visible={isUpdateModal}
        onClose={() => setIsUpdateModal(false)}
        title="상품 상세 및 수정"
        width="900px"
        footer={
          <Wrapper al={`flex-end`}>
            <Button
              size="small"
              type="primary"
              onClick={() => infoForm.submit()}
            >
              수정
            </Button>
          </Wrapper>
        }
      >
        <Wrapper al={`flex-start`}>
          <Text margin={`0 0 5px`}>썸네일이미지</Text>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0 0 5px`}>
          생성 후 이미지는 첫번째 이미지만 업로드 되어있습니다. 2/3/4번째
          이미지는 임시데이터일 뿐 실제 데이터는 아닙니다.
        </Wrapper>
        <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 20px`}>
          <Wrapper width={`calc(100% / 4.1)`}>
            <Image
              src={
                productPath1
                  ? productPath1
                  : currentData && currentData.thumbnail1
              }
              alt="image"
            />
            <input
              type="file"
              name="image"
              accept=".png, .jpg"
              // multiple
              hidden
              ref={imageRef}
              onChange={(data) => onChangeImages(data, 1)}
            />
            <Button
              size="small"
              type="primary"
              style={{ width: `100%` }}
              onClick={() => imageClickToggle(1)}
            >
              이미지 업로드
            </Button>
          </Wrapper>

          <Wrapper width={`calc(100% / 4.1)`}>
            <Image
              src={
                productPath2
                  ? productPath2
                  : currentData && currentData.thumbnail2
                  ? currentData && currentData.thumbnail2
                  : "http://via.placeholder.com/562"
              }
              alt="image"
            />
            <input
              type="file"
              name="image"
              accept=".png, .jpg"
              // multiple
              hidden
              ref={image2Ref}
              onChange={(data) => onChangeImages(data, 2)}
            />
            <Button
              size="small"
              type="primary"
              style={{ width: `100%` }}
              onClick={() => imageClickToggle(2)}
            >
              이미지 업로드
            </Button>
          </Wrapper>

          <Wrapper width={`calc(100% / 4.1)`}>
            <Image
              src={
                productPath3
                  ? productPath3
                  : currentData && currentData.thumbnail3
                  ? currentData && currentData.thumbnail3
                  : "http://via.placeholder.com/562"
              }
              alt="image"
            />
            <input
              type="file"
              name="image"
              accept=".png, .jpg"
              // multiple
              hidden
              ref={image3Ref}
              onChange={(data) => onChangeImages(data, 3)}
            />
            <Button
              size="small"
              type="primary"
              style={{ width: `100%` }}
              onClick={() => imageClickToggle(3)}
            >
              이미지 업로드
            </Button>
          </Wrapper>

          <Wrapper width={`calc(100% / 4.1)`}>
            <Image
              src={
                productPath4
                  ? productPath4
                  : currentData && currentData.thumbnail4
                  ? currentData && currentData.thumbnail4
                  : "http://via.placeholder.com/562"
              }
              alt="image"
            />
            <input
              type="file"
              name="image"
              accept=".png, .jpg"
              // multiple
              hidden
              ref={image4Ref}
              onChange={(data) => onChangeImages(data, 4)}
            />
            <Button
              size="small"
              type="primary"
              style={{ width: `100%` }}
              onClick={() => imageClickToggle(4)}
            >
              이미지 업로드
            </Button>
          </Wrapper>
        </Wrapper>

        <Wrapper margin={`0 0 20px`} al={`flex-start`}>
          <Text margin={`0 0 5px`}>상세이미지</Text>
          <Image
            src={
              productDetail
                ? productDetail
                : currentData && currentData.detailImage
            }
          />
          <input
            type="file"
            name="image"
            accept=".png, .jpg"
            // multiple
            hidden
            ref={image5Ref}
            onChange={(data) => onChangeImages(data, 5)}
          />
          <Button
            size="small"
            type="primary"
            style={{ width: `100%` }}
            onClick={() => imageClickToggle(5)}
          >
            상세이미지 업로드
          </Button>
        </Wrapper>

        <Form
          form={infoForm}
          size="small"
          labelCol={{ span: 5 }}
          labelAlign={"left"}
          onFinish={productUpdateHandler}
        >
          <Form.Item
            label="상위 카테고리"
            name="CateUpId"
            rules={[
              {
                required: true,
                message: "상위 카테고리를 선택해주세요.",
              },
            ]}
          >
            <Select
              placeholder="상위 카테고리를 선택해주세요."
              onChange={(data) =>
                dispatch({
                  type: DOWN_LIST_REQUEST,
                  data: {
                    CateUpId: data,
                  },
                })
              }
            >
              {upList.map((data, idx) => {
                return (
                  <Select.Option key={idx} value={data.id}>
                    {data.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="하위 카테고리"
            name="CateDownId"
            rules={[
              {
                required: true,
                message: "하위 카테고리를 선택해주세요.",
              },
            ]}
          >
            <Select placeholder="하위 카테고리를 선택해주세요.">
              {downList.map((data, idx) => {
                return (
                  <Select.Option key={idx} value={data.id}>
                    {data.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="브랜드"
            name="BrandId"
            rules={[
              {
                required: true,
                message: "브랜드를 선택해주세요.",
              },
            ]}
          >
            <Select placeholder="브랜드를 선택해주세요.">
              {brandList.map((data, idx) => {
                return (
                  <Select.Option key={idx} value={data.id}>
                    {data.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="제목"
            name="title"
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="제목을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="내용"
            name="description"
            rules={[
              {
                required: true,
                message: "내용을 입력해주세요.",
              },
            ]}
          >
            <Input.TextArea
              placeholder="내용을 입력해주세요."
              style={{ height: `150px` }}
            />
          </Form.Item>
          <Form.Item
            label="마켓가격"
            name="marketPrice"
            rules={[
              {
                required: true,
                message: "마켓가격을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="마켓가격을 입력해주세요." type="number" />
          </Form.Item>
          <Form.Item
            label="회원가격"
            name="memberPrice"
            rules={[
              {
                required: true,
                message: "회원가격을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="회원가격을 입력해주세요." type="number" />
          </Form.Item>
          <Form.Item
            label="무게"
            name="weight"
            rules={[
              {
                required: true,
                message: "무게를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="무게를 입력해주세요." type="number" />
          </Form.Item>
          <Form.Item
            label="최소수량"
            name="buyMinLimitCount"
            rules={[
              {
                required: true,
                message: "최소수량를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="최소수량를 입력해주세요." type="number" />
          </Form.Item>
          <Form.Item
            label="최대수량"
            name="buyMaxLimitCount"
            rules={[
              {
                required: true,
                message: "최대수량를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="최대수량를 입력해주세요." type="number" />
          </Form.Item>
          <Form.Item
            label="할인율"
            name="discount"
            rules={[
              {
                required: true,
                message: "할인율을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="할인율을 입력해주세요." type="number" />
          </Form.Item>
          <Form.Item
            label="유튜브 링크"
            name="youtubeLink"
            rules={[
              {
                required: true,
                message: "유튜브 링크를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="유튜브 링크를 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="원산지"
            name="origin"
            rules={[
              {
                required: true,
                message: "원산지를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="원산지를 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="제조사"
            name="madeCompany"
            rules={[
              {
                required: true,
                message: "제조사를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="제조사를 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="소재지"
            name="location"
            rules={[
              {
                required: true,
                message: "소재지를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="소재지를 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="사용방법"
            name="howToUse"
            rules={[
              {
                required: true,
                message: "사용방법을 입력해주세요.",
              },
            ]}
          >
            <Input.TextArea placeholder="사용방법을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="제조년월일 및 사용기한"
            name="madeDate"
            rules={[
              {
                required: true,
                message: "제조년월일 및 사용기한을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="제조년월일 및 사용기한을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="보관방법/취급방법"
            name="howToKeep"
            rules={[
              {
                required: true,
                message: "보관방법/취급방법을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="보관방법/취급방법을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="고객센터 전화번호"
            name="tel"
            rules={[
              {
                required: true,
                message: "고객센터 전화번호를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="고객센터 전화번호를 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="주의사항"
            name="warning"
            rules={[
              {
                required: true,
                message: "주의사항을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="주의사항을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="배송가능지역"
            name="canDeliveryArea"
            rules={[
              {
                required: true,
                message: "배송가능지역을 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="배송가능지역을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="관부가세안내"
            name="customInfo"
            rules={[
              {
                required: true,
                message: "관부가세안내를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="관부가세안내를 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="환불안내"
            name="refundInfo"
            rules={[
              {
                required: true,
                message: "환불안내를 입력해주세요.",
              },
            ]}
          >
            <Input placeholder="환불안내를 입력해주세요." />
          </Form.Item>
        </Form>
      </Drawer>
    </AdminLayout>
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
      type: PRODUCT_ADMIN_LIST_REQUEST,
    });

    context.store.dispatch({
      type: UP_LIST_REQUEST,
    });

    context.store.dispatch({
      type: BRAND_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Index);

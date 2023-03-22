import React, { useCallback, useEffect } from "react";
import {
  Wrapper,
  Text,
  Image,
  WholeWrapper,
  RsWrapper,
  SpanText,
} from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { UpOutlined } from "@ant-design/icons";
import { message } from "antd";

const AppFooter = () => {
  const width = useWidth();
  const dispatch = useDispatch();

  const { logos } = useSelector((state) => state.logo);
  const {
    companys,
    //
    st_companyError,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);

  const topHandler = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <WholeWrapper>
      <Wrapper
        borderTop={`1px solid ${Theme.lightGrey2_C}`}
        borderBottom={`1px solid ${Theme.lightGrey2_C}`}
        height={`60px`}
      >
        <RsWrapper dr={`row`} ju={`space-between`}>
          <Wrapper
            dr={`row`}
            width={`auto`}
            fontSize={width < 800 ? `14px` : `16px`}
          >
            <Text margin={width < 800 ? `0 15px 0 0` : `0 30px 0 0`} isHover>
              이용약관
            </Text>
            <Text isHover>개인정보처리방침</Text>
          </Wrapper>
          {companys && companys[0] && (
            <Text>
              <SpanText margin={`0 10px 0 0`} color={Theme.darkGrey_C}>
                {companys[0].name}
              </SpanText>
              <SpanText fontSize={`18px`} fontWeight={`600`}>
                {companys[0].value}
              </SpanText>
            </Text>
          )}
        </RsWrapper>
      </Wrapper>
      <RsWrapper padding={width < 800 ? `20px 0 100px` : `40px 0`}>
        <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
          {logos && logos.find((data) => data.typeOf === "F") && (
            <Image
              width={width < 800 ? `140px` : `170px`}
              src={logos.find((data) => data.typeOf === "F").imageURL}
              alt="logo"
            />
          )}
          <Wrapper
            width={`37px`}
            height={`37px`}
            border={`1px solid ${Theme.darkGrey_C}`}
            cursor={`pointer`}
            onClick={topHandler}
          >
            <UpOutlined />
          </Wrapper>
        </Wrapper>
        <Wrapper al={`flex-start`}>
          {companys && (
            <Wrapper al={`flex-start`}>
              <Wrapper
                width={`auto`}
                dr={`row`}
                ju={`flex-start`}
                margin={width < 800 ? `0` : `0 0 15px`}
              >
                {companys[1] && (
                  <Text>
                    <SpanText margin={`0 10px 0 0`} color={Theme.grey_C}>
                      {companys[1].name}
                    </SpanText>
                    <SpanText fontWeight={`500`}>{companys[1].value}</SpanText>
                  </Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`12px`}
                  color={Theme.lightGrey2_C}
                >
                  |
                </SpanText>

                {companys[2] && (
                  <Text>
                    <SpanText margin={`0 10px 0 0`} color={Theme.grey_C}>
                      {companys[2].name}
                    </SpanText>
                    <SpanText fontWeight={`500`}>{companys[2].value}</SpanText>
                  </Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`12px`}
                  color={Theme.lightGrey2_C}
                >
                  |
                </SpanText>
                {companys[3] && (
                  <Text>
                    <SpanText margin={`0 10px 0 0`} color={Theme.grey_C}>
                      {companys[3].name}
                    </SpanText>
                    <SpanText fontWeight={`500`}>{companys[3].value}</SpanText>
                  </Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`12px`}
                  color={Theme.lightGrey2_C}
                >
                  |
                </SpanText>
                {companys[4] && (
                  <Text>
                    <SpanText margin={`0 10px 0 0`} color={Theme.grey_C}>
                      {companys[4].name}
                    </SpanText>
                    <SpanText fontWeight={`500`}>{companys[4].value}</SpanText>
                  </Text>
                )}
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`}>
                {companys[5] && (
                  <Text>
                    <SpanText margin={`0 10px 0 0`} color={Theme.grey_C}>
                      {companys[5].name}
                    </SpanText>
                    <SpanText fontWeight={`500`}>{companys[5].value}</SpanText>
                  </Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`12px`}
                  color={Theme.lightGrey2_C}
                >
                  |
                </SpanText>
                {companys[6] && (
                  <Text>
                    <SpanText margin={`0 10px 0 0`} color={Theme.grey_C}>
                      {companys[6].name}
                    </SpanText>
                    <SpanText fontWeight={`500`}>{companys[6].value}</SpanText>
                  </Text>
                )}
                <SpanText
                  margin={width < 900 ? `0 10px` : `0 16px`}
                  fontSize={`12px`}
                  color={Theme.lightGrey2_C}
                >
                  |
                </SpanText>
                {companys[7] && (
                  <Text>
                    <SpanText margin={`0 10px 0 0`} color={Theme.grey_C}>
                      {companys[7].name}
                    </SpanText>
                    <SpanText fontWeight={`500`}>{companys[7].value}</SpanText>
                  </Text>
                )}
              </Wrapper>

              <Text margin={`13px 0 0`} color={Theme.lightGrey2_C}>
                © 2022 Copyright BuyMeMine
              </Text>
            </Wrapper>
          )}
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;

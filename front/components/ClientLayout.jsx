import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { WholeWrapper } from "./commonComponents";
import useWidth from "../hooks/useWidth";
import QuickMenu from "./QuickMenu";
import { useRouter } from "next/router";

const ClientLayout = ({ children }) => {
  const width = useWidth();
  const router = useRouter();
  return (
    <section>
      {/* HEADER */}
      <AppHeader />

      {/* content */}
      <WholeWrapper padding={width < 800 ? `107px 0 0` : `190px 0 0`}>
        {children}
      </WholeWrapper>

      {router.pathname !== `/product/[id]` && width < 800 && <QuickMenu />}

      {/* Footer */}

      <AppFooter />
    </section>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientLayout;

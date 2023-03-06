import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { WholeWrapper } from "./commonComponents";
import useWidth from "../hooks/useWidth";

const ClientLayout = ({ children }) => {
  const width = useWidth();
  return (
    <section>
      {/* HEADER */}
      <AppHeader />

      {/* content */}
      <WholeWrapper padding={`190px 0 0`}>{children}</WholeWrapper>

      {/* Footer */}

      <AppFooter />
    </section>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientLayout;

import React, { useState } from "react";
import { Wrapper } from "../commonComponents";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import Theme from "../Theme";

const images = [
  {
    original:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
    thumbnail:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
  },
  {
    original:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
    thumbnail:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
  },
  {
    original:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
    thumbnail:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
  },
  {
    original:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
    thumbnail:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
  },
  {
    original:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
    thumbnail:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
  },
  {
    original:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
    thumbnail:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
  },
  {
    original:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
    thumbnail:
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png",
  },
];

const GalleryWrapper = styled(Wrapper)`
  position: relative;

  .image-gallery {
    width: 100%;
  }

  .image-gallery-slide.center {
    width: 100%;
    position: relative;
    overflow: ${(props) => props.overflow || `hidden`};

    &:before {
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    & img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transition: 0.5s;
      object-fit: cover;
    }
  }

  .image-gallery-index {
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    height: 24px;
    line-height: 24px;
    padding: 0 16px;
    font-size: 14px;
  }

  .image-gallery-thumbnail.active,
  .image-gallery-thumbnail:focus,
  .image-gallery-thumbnail + .image-gallery-thumbnail,
  .image-gallery-thumbnail {
    border: none;
  }

  .image-gallery-thumbnail.active img,
  .image-gallery-thumbnail:focus img {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  .image-gallery-thumbnail {
    padding: 10px;

    img {
      transition: 0.5s;
    }
  }

  .image-gallery-thumbnail:hover img {
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
`;

export default ({ datum }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  return (
    <GalleryWrapper>
      <ImageGallery
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
        showIndex={true}
        items={images}
        onSlide={(index) => {
          setCurrentIdx(index);
        }}
      />
    </GalleryWrapper>
  );
};

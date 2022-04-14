import React, { useState, useRef, useEffect } from "react";
import { Button, Radio, Input } from "antd";
import ReactHowler from "react-howler";

const Audio = ({ media }) => <ReactHowler src={media.url} playing={true} />;

const Video = ({ media }) => (
  <iframe
    frameBorder="0"
    allowFullScreen="1"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    title="YouTube video player"
    width="400px"
    height="250px"
    src={`https://www.youtube.com/embed/${media.url}?autoplay=1&mute=0&controls=0&start=${media.startTime}&end=${media.endTime}&playsinline=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=1&enablejsapi=1&widgetid=43`}
    id="widget46"
  ></iframe>
);

const Media = ({ media }) => {
  switch (media.type) {
    case "image":
      return (
        <div className="image-container">
          <div className="image">
            <img src={media.url} />
          </div>
        </div>
      );
    case "audio":
      return (
        <div className="image-container">
          <Audio media={media} />
        </div>
      );
    case "video":
      return (
        <div className="video-container">
          <Video media={media} />
        </div>
      );
    default:
      return null;
  }
};

export default Media;

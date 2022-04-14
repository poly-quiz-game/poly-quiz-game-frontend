import React, { useEffect, useState, useRef } from "react";
import { Modal, Input, Skeleton } from "antd";
import axios from "axios";

const youtubeSearchApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 10,
    key: "AIzaSyAWONe5t-o1_5JSMpaF2wqU35R35fKDaks",
    type: "video",
    safeSearch: "moderate",
    videoEmbeddable: true,
  },
});

const youtubeVideoDetailApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet,contentDetails",
    key: "AIzaSyAWONe5t-o1_5JSMpaF2wqU35R35fKDaks",
  },
});

const getVideoIdFroUrl = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const isUrl = (url) => {
  return url.match(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  );
};

const getDurationText = (duration) => {
  try {
    const durationInSeconds = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = durationInSeconds[1]
      ? durationInSeconds[1].replace("H", "")
      : 0;
    const minutes = durationInSeconds[2]
      ? durationInSeconds[2].replace("M", "")
      : 0;
    const seconds = durationInSeconds[3]
      ? durationInSeconds[3].replace("S", "")
      : 0;
    return `${hours}h ${minutes}m ${seconds}s`;
  } catch (error) {
    console.log(error);
    return "";
  }
};

const SelectYoutubeVideoModal = ({ visible, setVisible, setQuestionMedia }) => {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const timeout = useRef(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      searchYoutubeVideos();
    }, 300);
  }, [search]);

  const searchYoutubeVideos = async () => {
    setLoading(true);
    try {
      const response = await youtubeSearchApi.get("/search", {
        params: {
          q: isUrl(search) ? getVideoIdFroUrl(search) : search,
          maxResults: isUrl(search) ? 1 : 15,
        },
      });
      const details = await youtubeVideoDetailApi.get("/videos", {
        params: {
          id: response.data.items.map((item) => item.id.videoId).join(","),
        },
      });
      setLoading(false);
      const contentDetails = details.data.items.map(
        (item) => item.contentDetails
      );
      const result = response.data.items.map((item, index) => ({
        ...item,
        contentDetails: contentDetails[index],
      }));
      setVideos(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      style={{ top: 20 }}
    >
      <div>
        <h3>Youtube tìm kiếm</h3>
        <div className="youtube-search-input">
          <Input
            placeholder="Nhập từ khoá, url..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            style={{ marginBottom: "12px" }}
          />
        </div>
        <div className="youtube-search-result">
          {loading && <Skeleton />}
          {!loading &&
            videos.length !== 0 &&
            videos.map((video) => (
              <div
                key={video.id.videoId}
                className="youtube-search-result-item"
                style={{ display: "flex", marginBottom: "4px" }}
                onClick={() => {
                  setQuestionMedia({
                    fileType: "video",
                    url: video.id.videoId,
                    thumbnail: video.snippet.thumbnails.default.url,
                  });
                  setVisible(false);
                }}
              >
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  style={{ marginRight: "8px" }}
                />
                <div className="youtube-search-result-item-info">
                  <h4 className="youtube-search-result-item-title">
                    {video.snippet.title}
                  </h4>
                  <div className="youtube-search-result-item-duration">
                    {getDurationText(video.contentDetails.duration)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default SelectYoutubeVideoModal;

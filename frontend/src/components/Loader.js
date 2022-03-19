import React from "react";
import ContentLoader from "react-content-loader";

export default function Loader({ counts }) {
  counts = counts || 1;
  let rows = [];

  for (var i = 0; i < counts; i++) {
    rows.push(
      <div
        className="card col-6 col-md-3 col-sm-4 p-0"
        style={{ background: "transparent", position: 'relative', bottom: '50px' }}
        key={i}
      >
        <div style={{ margin: "auto" }}>
          <ContentLoader
            speed={2}
            width={130}
            height={230}
            viewBox="0 0 160 230"
            backgroundColor="#2c2b2b"
            foregroundColor="#a0bf9c"
          >
            <rect x="6" y="21" rx="2" ry="2" width="100%" height="100%" />
          </ContentLoader>
        </div>
      </div>
    );
  }
  return <div className="row no-gutters">{rows}</div>;
}

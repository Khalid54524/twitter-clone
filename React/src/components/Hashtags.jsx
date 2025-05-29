/* eslint-disable no-extra-semi */
/* eslint-disable react/prop-types */
export default function Hashtags ({ hashtags }) {
    return (
      <div className="trending-hashtags">
        <h3>Trending Hashtags</h3>
        <ul>
        {hashtags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}; 
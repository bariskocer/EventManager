import { API_BASE } from "../http";

export default function ImagePicker({ images, selectedImage, onSelect }) {
  return (
    <div id="image-picker">
      <p>Select an image</p>
      <ul>
        {images.map((image) => {
          const imageUrl = image.path.startsWith("/")
            ? `${API_BASE}${image.path}`
            : `${API_BASE}/${image.path}`;

          return (
            <li
              key={image.path}
              onClick={() => onSelect(image.path)}
              className={selectedImage === image.path ? "selected" : undefined}
            >
              <img
                src={imageUrl}
                alt={image.caption}
                className="image-picker-thumbnail"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getImagePosts } from "../adapters/test-adapter";

export default function Test() {
  const [images, setImages] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  // Just gets the current users posts for testing
  useEffect(() => {
    const loadReports = async () => {
      if (currentUser === null) return console.log(`No user session detected`);
      console.log(`User session detected!`);
      const [posts, error] = await getImagePosts(11);
      if (error) setError(error);
      else if (posts) setImages(posts);
      console.log(images);
    };
    loadReports();
  }, [currentUser]);

  const handleDelete = (imageInformation) => {
    const payload = imageInformation;
    console.log(imageInformation);
  };

  return (
    <div>
      <h2>Image CRUD Actions</h2>
      <ul>
        {images.map((post, index) => {
          return (
            <li
              key={index}
              value={post.id}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <img
                src={post.img_src}
                alt="cover image"
                style={{ width: "300px", height: "300px" }}
              />
              <button
                data-img-id={post.id}
                // data-img-name={post.img_name}
                onClick={() =>
                  handleDelete({ id: post.id, img_name: post.img_name })
                }
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

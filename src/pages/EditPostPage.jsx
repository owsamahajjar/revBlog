import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPosts = () => {
  const [formData, setFormData] = useState({});
  const params = useParams();
  const key = params.documentId;

  useEffect(() => {
    async function fetchPostData() {
      const response = await axios.get(
        `http://localhost:8000/blogposts/${key}`
      );
      const dataObject = response.data.data;

      setFormData(dataObject);
    }
    fetchPostData();
  }, []);

  const editMode = true;
  const navigate = useNavigate();
  // const [topic, setTopics] = useContext(TopicsContext);
  const topics = ["Recruitment Process", "Performance Review", "Other"];
  const companies = ["A2", "A0", "Aq"];
  const natureFlags = ["positive", "neutral", "negative"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const response = await axios.put(
        `http://localhost:8000/blogposts/${key}`,
        {
          formData,
        }
      );
      const success = response.status === 200;
      if (success) {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="post">
      <h1>{editMode ? "Update your Post" : "Create a Post"}</h1>
      <div className="post-container">
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.title}
            />

            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.description}
              className="description"
            />
            <label htmlFor="nature">What is the nature of your post?</label>
            <select
              name="nature"
              value={formData.nature}
              onChange={handleChange}
            >
              {natureFlags?.map((nature, _index) => (
                <option key={_index + 1} value={nature}>
                  {nature}
                </option>
              ))}
            </select>

            <input
              id="nature"
              name="nature"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.nature}
              hidden={true}
            />

            <section className="section">
              <label>Topic</label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
              >
                {topics?.map((topic, _index) => (
                  <option key={_index + 1} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>

              <label htmlFor="new-topic">New topic</label>
              <input
                id="new-topic"
                name="topic"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.topic}
              />
            </section>
            <section className="section">
              <label>Company</label>
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
              >
                {companies?.map((company, _index) => (
                  <option key={_index + 1} value={company}>
                    {company}
                  </option>
                ))}
              </select>

              <label htmlFor="new-company">New Company</label>
              <input
                id="new-company"
                name="company"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.company}
              />
            </section>
            {editMode && (
              <>
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option
                    selected={formData.status === "active"}
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    selected={formData.status === "passive"}
                    value="passive"
                  >
                    Passive
                  </option>
                </select>
              </>
            )}
            {/* timestamp: new Date().toISOString(),
    company: "",
    notification: "none",
    support: "unsupported", */}
            {editMode && (
              <>
                <input
                  id="notification"
                  name="notification"
                  type="text"
                  onChange={handleChange}
                  required={true}
                  disabled={true}
                  value={formData.notification}
                />
                <input
                  id="support"
                  name="support"
                  type="text"
                  onChange={handleChange}
                  required={true}
                  disabled={true}
                  value={formData.support}
                />
                <input
                  id="timestamp"
                  name="timestamp"
                  type="text"
                  onChange={handleChange}
                  required={true}
                  disabled={true}
                  value={formData.timestamp}
                />
              </>
            )}
            <section className="section">
              <label htmlFor="owner">Owner</label>
              <input
                id="owner"
                name="owner"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.owner}
              />
              <label htmlFor="avatar">Owner avatar</label>
              <input
                id="avatar"
                name="avatar"
                type="text"
                onChange={handleChange}
                required={false}
                value={formData.avatar}
              />
              <div className="image-preview">
                {formData.avatar && <img src={formData.avatar} alt="preview" />}
              </div>
            </section>
            <input type="submit" />
          </section>
        </form>
      </div>
    </div>
  );
};

export default EditPosts;

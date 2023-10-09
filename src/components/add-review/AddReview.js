import "../../styles/Button.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import "./AddReview.css";

const initialValues = {
  name: "",
  email: "",
  review: "",
  rating: ""
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid Email Format!").required("Required!"),
  review: Yup.string().required("Required!"),
  rating: Yup.number().required("Required!")
  .min(1, 'Rating must be at least 1')
  .max(5, 'Rating must be at most 5'),
});


export const AddReview = ({id}) => {
  const mutation = useMutation((values) => axios.post(`http://localhost:4000/reviews`, values));


  const handleSubmit = (values, {setSubmitting}) => {
    values.prodId = parseInt(id);
    mutation.mutate(values);

    setSubmitting(false);
  }

  return (
    <>
      <h3>Add a review</h3>
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} 
      >
        {({ isSubmitting }) => (
          <Form>
              <div className="form">
                <label htmlFor="name">Name: {" "}</label>
                <Field type="text" id="name" name="name" placeholder="Enter your name"/>
                <ErrorMessage component="div" className="error" name="name" />
              </div>

              <div className="form">
                <label htmlFor="email">Email: {" "}</label>
                <Field type="email" id="email" name="email" placeholder="Enter your email"/>
                <ErrorMessage component="div" className="error" name="email" />
              </div>

              <div className="form">
                <label htmlFor="review">Review: {" "}</label>
                <Field as="textarea" id="review" name="review" placeholder="Enter your review"/>
                <ErrorMessage component="div" className="error" name="review" />
              </div>

              <div className="form">
                <label htmlFor="rating">Rating: {" "}</label>
                <Field type="text" id="rating" name="rating" placeholder="Enter your rating"/>
                <ErrorMessage component="div" className="error" name="rating" />
              </div>

              <div className="form">
                <button type="submit" disabled={isSubmitting}>Submit Review</button>
              </div>
          </Form>
        )}
      </Formik>
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isSuccess && <p>Posted successfully</p>}
      {mutation.isError && <p>Error</p>}
    </>
  )
}

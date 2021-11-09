//React
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Components
import FormContainer from "../../components/Layouts/Public/FormContainer";
import HeaderContainer from "../../components/Layouts/Public/HeaderContainer";
import Input from "../../components/Layouts/Public/Input";
import SubmitButton from "../../components/Layouts/Public/SubmitButton";
import CheckYourEmail from "./CheckYourEmail";
//Formik
import { Formik } from "formik";
import * as Yup from "yup";

//Actions
import { forgotPasswordInit, forgotPasswordSuccess } from "./actions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const showMessage = useSelector((state) => state.forgotPassword.successful);
  useEffect(() => {
    dispatch(forgotPasswordInit());
  }, []);
  return (
    <div className="container m-auto">
      <div className="row text-center">
        <FormContainer>
          <HeaderContainer />

          {showMessage ? (
            <CheckYourEmail />
          ) : (
            <>
              <div className="mt-2 mb-2">
                <h1 className="text-5xl text-white  ">Forgot Your Password?</h1>
                <p className="mt-3 text-xl text-white ">
                  Enter your email below to receive reset instructions
                </p>
              </div>

              <Formik
                initialValues={{
                  email: "",
                }}
                onSubmit={(values) => {
                  dispatch(forgotPasswordSuccess());
                }}
                validateOnChange={false}
                validateOnBlur={true}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Must be a valid email")
                    .required("Email Required"),
                })}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    setFieldValue,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col">
                          {" "}
                          <Input
                            label=""
                            type="text"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            touched={touched.email}
                          />
                        </div>
                      </div>
                      <SubmitButton text="Send" onClick={() => handleSubmit} />
                    </form>
                  );
                }}
              </Formik>
            </>
          )}
        </FormContainer>
      </div>
    </div>
  );
};

export default ForgotPassword;
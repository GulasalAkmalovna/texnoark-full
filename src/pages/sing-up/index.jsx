import React from "react";
import { Button, Form, Input } from "antd";
import SignInImg from "../../assets/images/sign-in.jpg";
import { useNavigate } from "react-router";
import { auth } from "@service";
import { NavLink } from "react-router-dom";
const Index = () => {
   const navigate = useNavigate();
   const onFinish = async (values) => {
      try {
         const response = await auth.sign_up(values);
         if (response.status === 201) {
            navigate("/sing-in");
         }
      } catch (error) {
         console.log(error);
      }
   };
   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };
   return (
      <section className="w-full min-h-[100vh] bg-[#f7f7f0]">
         <div className="w-[full] bg-[#f7f7f0] min-h-[100vh]  flex container m-auto">
            <div className="w-[50%] flex justify-center items-center">
               <img src={SignInImg} alt="sign-up" />
            </div>
            <div className="w-[50%] flex justify-center items-center">
               <div>
                  <h1 className="text-3xl font-semibold mb-4">Register</h1>
                  <Form
                     name="basic"
                     labelCol={{
                        span: 8,
                     }}
                     wrapperCol={{
                        span: 16,
                     }}
                     style={{
                        maxWidth: 600,
                     }}
                     initialValues={{
                        remember: true,
                     }}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                     autoComplete="off"
                  >
                     <Form.Item
                        label="First name"
                        name="first_name"
                        labelCol={{
                           span: 24,
                        }}
                        wrapperCol={{
                           span: 24,
                        }}
                        rules={[
                           {
                              required: true,
                              message: "Please input your first name!",
                           },
                        ]}
                     >
                        <Input className="py-2" />
                     </Form.Item>

                     <Form.Item
                        label="Last name"
                        name="last_name"
                        labelCol={{
                           span: 24,
                        }}
                        wrapperCol={{
                           span: 24,
                        }}
                        rules={[
                           {
                              required: true,
                              message: "Please input your last name!",
                           },
                        ]}
                     >
                        <Input className="py-2" />
                     </Form.Item>

                     <Form.Item
                        label="Phone number"
                        name="phone_number"
                        labelCol={{
                           span: 24,
                        }}
                        wrapperCol={{
                           span: 24,
                        }}
                        rules={[
                           {
                              required: true,
                              message: "Please input your phone number!",
                           },
                        ]}
                     >
                        <Input className="py-2" />
                     </Form.Item>

                     <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{
                           span: 24,
                        }}
                        wrapperCol={{
                           span: 24,
                        }}
                        rules={[
                           {
                              required: true,
                              message: "Please input your email!",
                           },
                           {
                              type: "email",
                              message: "Please enter a valid email!",
                           },
                        ]}
                     >
                        <Input className="py-2" />
                     </Form.Item>

                     <Form.Item
                        label="Password"
                        name="password"
                        labelCol={{
                           span: 24,
                        }}
                        wrapperCol={{
                           span: 24,
                        }}
                        rules={[
                           {
                              required: true,
                              message: "Please input your password!",
                           },
                        ]}
                     >
                        <Input.Password className="py-2" />
                     </Form.Item>

                     <Form.Item
                        wrapperCol={{
                           span: 24,
                        }}
                     >
                        <Button
                           type="primary"
                           htmlType="submit"
                           className="w-full mt-4"
                           size="large"
                           style={{
                              backgroundColor: "#c2410c",
                           }}
                        >
                           Submit
                        </Button>
                     </Form.Item>
                     <div className="flex justify-between">
                        <p className="text-sm">Already have an account?</p>
                        <NavLink to="/" className={"text-blue-500 underline"}>
                           Sign in
                        </NavLink>
                     </div>
                  </Form>
               </div>
            </div>
         </div>
      </section>

   );
};
export default Index;

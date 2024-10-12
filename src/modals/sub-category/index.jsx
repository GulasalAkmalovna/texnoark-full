import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { subCategory } from "@service";

const Index = (props) => {
   const [form] = Form.useForm();
   const { open, handleClose, getSubCategory, update, id } = props;
   const [loading, setLoading] = useState(false);
   const isEdit = !!update.id;

   useEffect(() => {
      if (isEdit) {
         form.setFieldsValue({
            name: update.name,
         });
      } else {
         form.resetFields();
      }
   }, [update, form, isEdit]);

   const handleSubmit = async (values) => {
      setLoading(true);
      try {
         if (isEdit) {
            const response = await subCategory.update(update.id, {
               name: values.name,
               parent_category_id: parseInt(id),
            });
            if (response.status === 200) {
               message.success("Subcategory updated successfully!");
               handleClose();
               getSubCategory();
            }
         } else {
            const response = await subCategory.create({
               name: values.name,
               parent_category_id: parseInt(id),
            });
            if (response.status === 201) {
               message.success("Subcategory added successfully!");
               handleClose();
               getSubCategory();
            }
         }
      } catch (error) {
         message.error("An error occurred. Please try again.");
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <Modal
            open={open}
            title={isEdit ? "Edit Subcategory" : "Add New Subcategory"}
            onCancel={handleClose}
            width={window.innerWidth < 768 ? "100%" : 500}
            footer={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "flex-start",
                     gap: "10px",
                  }}
               >
                  <Button
                     type="primary"
                     form="basic"
                     htmlType="submit"
                     loading={loading}
                     disabled={loading}
                  >
                     {isEdit ? "Update" : "Add"}
                  </Button>
                  <Button onClick={handleClose} disabled={loading}>
                     Cancel
                  </Button>
               </div>
            }
         >
            <Form
               form={form}
               id="basic"
               name="basic"
               onFinish={handleSubmit}
               layout="vertical"
            >
               <Form.Item
                  label="Subcategory Name"
                  name="name"
                  rules={[
                     {
                        required: true,
                        message: "Please input the subcategory name!",
                     },
                  ]}
               >
                  <Input placeholder="Enter subcategory name" />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};

export default Index;

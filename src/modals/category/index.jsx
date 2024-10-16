import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import { category } from "@service";

const Index = (props) => {
   const [form] = Form.useForm();
   const { open, handleClose, getCategory, update } = props;

   useEffect(() => {
      if (update?.id) {
         form.setFieldsValue({
            name: update.name,
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);

   const handleSubmit = async (values) => {
      try {
         if (update?.id) {
            const response = await category.update(update.id, values);
            if (response.status === 200) {
               handleClose();
               getCategory();
            }
         } else {
            const response = await category.create(values);
            if (response.status === 201) {
               handleClose();
               getCategory();
            }
         }
      } catch (error) {
         console.log("Error:", error);
      }
   };

   const handleCloseModal = () => {
      form.resetFields();
      handleClose();
   };

   return (
      <Modal
         open={open}
         title={update?.id ? "Update Category" : "Add New Category"}
         onCancel={handleCloseModal}
         width={500}
         footer={
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
               <Button type="primary" form="basic" htmlType="submit">
                  {update?.id ? "Update" : "Add"}
               </Button>
               <Button onClick={handleCloseModal}>Cancel</Button>
            </div>
         }
      >
         <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
            <Form.Item
               label="Category Name"
               name="name"
               labelCol={{ span: 24 }}
               wrapperCol={{ span: 24 }}
               rules={[{ required: true, message: "Please input category name!" }]}
            >
               <Input />
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default Index;

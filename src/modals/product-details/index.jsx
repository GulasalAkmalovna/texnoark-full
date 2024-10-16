import React, { useEffect } from "react";
import { Button, Input, Form, InputNumber, Modal } from "antd";
import { productDetails } from "@service";

const App = (props) => {
   const [form] = Form.useForm();
   const { open, update, getData, id, setOpen } = props;

   useEffect(() => {
      if (update?.id) {
         form.setFieldsValue({
            description: update.description,
            colors: update.colors?.join(","),
            quantity: update.quantity,
            discount: parseInt(update.discount),
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);

   const handleSubmit = async (values) => {
      try {
         if (update?.id) {
            const res = await productDetails.update(update.id, {
               ...values,
               product_id: parseInt(id),
            });
            if (res.status === 200) {
               handleClose();
               getData();
            }
         } else {
            const res = await productDetails.create({
               ...values,
               product_id: parseInt(id),
            });
            if (res.status === 201) {
               handleClose();
               getData();
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleClose = () => {
      setOpen(false);
      form.resetFields();
   };

   return (
      <div style={{ padding: 20 }}>
         <Modal
            title={update?.id ? "Update Product Details" : "Add Product Details"}
            visible={open}
            onCancel={handleClose}
            footer={null}
            width={500}
         >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
               <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                     { required: true, message: "Please enter description" },
                  ]}
               >
                  <Input.TextArea rows={4} />
               </Form.Item>

               <Form.Item
                  name="colors"
                  label="Product Colors"
                  rules={[
                     { required: true, message: "Please enter product colors" },
                  ]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="quantity"
                  label="Product Quantity"
                  rules={[{ required: true, message: "Please enter quantity" }]}
               >
                  <InputNumber style={{ width: "100%" }} type="number" />
               </Form.Item>

               <Form.Item
                  name="discount"
                  label="Product Discount (%)"
                  rules={[
                     { required: true, message: "Please enter discount" },
                  ]}
               >
                  <InputNumber style={{ width: "100%" }} />
               </Form.Item>

               <Form.Item>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                     <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {update?.id ? "Update" : "Submit"}
                     </Button>
                     <Button onClick={handleClose}>Cancel</Button>
                  </div>
               </Form.Item>
            </Form>
         </Modal>
      </div>
   );
};

export default App;

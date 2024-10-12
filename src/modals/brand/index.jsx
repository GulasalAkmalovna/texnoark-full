import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { brand } from "@service";

const Index = (props) => {
   const [form] = Form.useForm();
   const [edit, setEdit] = useState({
      name: "",
      categoryId: "",
      description: "",
   });

   const { open, handleClose, getData, update, categoryData } = props;

   useEffect(() => {
      if (update.id) {
         form.setFieldsValue({
            name: update.name,
            categoryId: parseInt(update.category_id),
            description: update.description,
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);

   const handleSubmit = async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("categoryId", values.categoryId);
      formData.append("description", values.description);
      if (values.file && values.file.file) {
         formData.append("file", values.file.file);
      }

      try {
         if (update.id) {
            const res = await brand.update(update.id, formData);
            if (res.status === 200) {
               handleClose();
               getData();
            }
         } else {
            const res = await brand.create(formData);
            if (res.status === 201) {
               handleClose();
               getData();
            }
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Modal
         open={open}
         title={update.id ? "Update Brand" : "Add New Brand"}
         onCancel={handleClose}
         width={500}
         footer={
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
               <Button type="primary" form="basic" htmlType="submit">
                  {update.id ? "Update" : "Add"}
               </Button>
               <Button onClick={handleClose}>Cancel</Button>
            </div>
         }
      >
         <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
            <Form.Item
               label="Brand Name"
               name="name"
               labelCol={{ span: 24 }}
               wrapperCol={{ span: 24 }}
               rules={[{ required: true, message: "Please input brand name!" }]}
            >
               <Input allowClear />
            </Form.Item>

            <Form.Item
               label="Category"
               name="categoryId"
               labelCol={{ span: 24 }}
               wrapperCol={{ span: 24 }}
               rules={[{ required: true, message: "Please select category!" }]}
            >
               <Select
                  allowClear
                  showSearch
                  placeholder="Select a Category"
                  filterOption={(input, option) =>
                     (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  }
               >
                  {categoryData?.map((item, index) => (
                     <Select.Option value={item.id} key={index}>
                        {item.name}
                     </Select.Option>
                  ))}
               </Select>
            </Form.Item>

            <Form.Item
               label="Description"
               name="description"
               labelCol={{ span: 24 }}
               wrapperCol={{ span: 24 }}
               rules={[{ required: true, message: "Please input description!" }]}
            >
               <Input.TextArea allowClear />
            </Form.Item>

            {!update.id && (
               <Form.Item
                  label="Brand Logo"
                  name="file"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: "Please upload brand logo!" }]}
               >
                  <Upload
                     beforeUpload={() => false}
                     maxCount={1}
                     listType="picture"
                  >
                     <Button className="w-full" icon={<UploadOutlined />}>
                        Upload Logo
                     </Button>
                  </Upload>
               </Form.Item>
            )}
         </Form>
      </Modal>
   );
};

export default Index;

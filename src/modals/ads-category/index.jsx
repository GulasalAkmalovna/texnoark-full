import React from "react";
import { Button, Modal, Input, Form, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { adsCategory } from "@service";

const { Option } = Select;

const Index = (props) => {
   const [form] = Form.useForm();
   const { open, handleClose, getData } = props;

   const handleSubmit = async (values) => {
      const formData = new FormData();
      formData.append("position", values.position);
      formData.append("file", values.file.file);

      try {
         const res = await adsCategory.create(formData);
         if (res.status === 201) {
            handleClose();
            getData();
         }
      } catch (error) {
         console.error("Error creating ads category:", error);
      }
   };

   return (
      <Modal
         open={open}
         title="Add New Ads"
         onCancel={handleClose}
         width={500}
         footer={
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
               <Button type="primary" form="basic" htmlType="submit">
                  Add
               </Button>
               <Button onClick={handleClose}>Cancel</Button>
            </div>
         }
      >
         <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
            <Form.Item
               label="Position"
               name="position"
               labelCol={{ span: 24 }}
               wrapperCol={{ span: 24 }}
               rules={[{ required: true, message: "Please select a position!" }]}
            >
               <Select allowClear placeholder="Select a position">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
               </Select>
            </Form.Item>

            <Form.Item
               label="Images"
               name="file"
               labelCol={{ span: 24 }}
               wrapperCol={{ span: 24 }}
               rules={[{ required: true, message: "Please upload an image!" }]}
            >
               <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  listType="picture"
               >
                  <Button className="w-full" icon={<UploadOutlined />}>
                     Upload Image
                  </Button>
               </Upload>
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default Index;

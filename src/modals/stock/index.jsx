import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, message, Modal } from "antd";
import { products, category, brand, stock } from "@service";
const { Option } = Select;

const App = (props) => {
   const { open, getData, setOpen, update } = props;
   const [form] = Form.useForm();
   const [categoryData, setCategoryData] = useState([]);
   const [brandData, setBrandData] = useState([]);
   const [productsData, setProductsData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [unsavedChanges, setUnsavedChanges] = useState(false);
   const isEdit = !!update.id; // Check if we are editing

   useEffect(() => {
      if (isEdit) {
         form.setFieldsValue({
            category_id: update.category_id?.id,
            brand_id: update.brand_id,
            product_id: update.product_id?.id,
            quantity: parseInt(update.quantity),
         });
      } else {
         form.resetFields();
      }
   }, [update, form, isEdit]);

   useEffect(() => {
      getCategory();
      getProduct();
   }, []);

   const getCategory = async () => {
      const res = await category.get();
      setCategoryData(res?.data?.data?.categories);
   };

   const getProduct = async () => {
      const res = await products.get();
      setProductsData(res?.data?.data?.products);
   };

   const handleSubmit = async (values) => {
      setLoading(true); // Show loading
      const newdata = {
         category_id: parseInt(values.category_id),
         brand_id: parseInt(values.brand_id),
         product_id: parseInt(values.product_id),
         quantity: parseInt(values.quantity),
      };
      try {
         let res;
         if (isEdit) {
            res = await stock.update(update.id, newdata);
         } else {
            res = await stock.create(newdata);
         }
         if (res.status === 200 || res.status === 201) {
            message.success(isEdit ? "Stock updated successfully" : "Stock added successfully");
            handleClose();
            getData();
         } else {
            message.error("Something went wrong, please try again.");
         }
      } catch (error) {
         message.error("Failed to submit the form. Please check your data.");
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleChange = async (value, inputName) => {
      setUnsavedChanges(true);
      try {
         if (inputName === "category_id") {
            form.setFieldsValue({ brand_id: null, product_id: null });
            const res = await brand.getCategory(value);
            setBrandData(res?.data?.data?.brands);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleClose = () => {
      if (unsavedChanges) {
         Modal.confirm({
            title: 'Unsaved Changes',
            content: 'You have unsaved changes. Are you sure you want to close?',
            okText: 'Yes',
            cancelText: 'No',
            style: { fontWeight: 'bold' }, // Custom style for the modal
            bodyStyle: { backgroundColor: '#f0f2f5' }, // Background color
            onOk: () => {
               setOpen(false);
               setUnsavedChanges(false);
               form.resetFields();
            },
         });
      } else {
         form.resetFields();
         setOpen(false);
      }
   };

   return (
      <>
         <Modal
            width={window.innerWidth < 768 ? '100%' : 520}
            onClose={handleClose}
            open={open}
            title={isEdit ? "Edit Stock" : "Add New Stock"}
            bodyStyle={{
               padding: '20px 40px',
               backgroundColor: '#f9f9f9',
            }}
            footer={
               <div
                  style={{
                     textAlign: 'right',
                     padding: '10px 20px',
                     backgroundColor: '#fafafa',
                  }}
               >
                  <Button
                     onClick={handleClose}
                     style={{ marginRight: 8 }}
                     disabled={loading}
                     type="default"
                  >
                     Cancel
                  </Button>
                  <Button
                     htmlType="submit"
                     type="primary"
                     onClick={() => form.submit()}
                     loading={loading}
                     disabled={loading}
                     style={{ minWidth: '120px' }}
                  >
                     {isEdit ? "Update" : "Add"}
                  </Button>
               </div>
            }
         >
            <Form
               form={form}
               layout="vertical"
               onFinish={handleSubmit}
               onValuesChange={() => setUnsavedChanges(true)}
            >
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        name="category_id"
                        label="Select Category"
                        rules={[
                           {
                              required: true,
                              message: "Please choose the category",
                           },
                        ]}
                     >
                        <Select
                           allowClear
                           showSearch
                           onChange={(value) => handleChange(value, "category_id")}
                           style={{ borderRadius: '8px', fontSize: '14px' }}
                        >
                           {categoryData?.map((item, index) => (
                              <Option value={item.id} key={index}>
                                 {item.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        name="brand_id"
                        label="Select Brand"
                        rules={[
                           {
                              required: true,
                              message: "Please choose the brand",
                           },
                        ]}
                     >
                        <Select
                           allowClear
                           showSearch
                           onChange={(value) => handleChange(value, "brand_id")}
                           disabled={!form.getFieldValue("category_id")}
                           style={{ borderRadius: '8px', fontSize: '14px' }}
                        >
                           {brandData?.map((item, index) => (
                              <Option value={item.id} key={index}>
                                 {item.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        name="product_id"
                        label="Select Product"
                        rules={[
                           {
                              required: true,
                              message: "Please choose the product",
                           },
                        ]}
                     >
                        <Select
                           allowClear
                           showSearch
                           onChange={(value) => handleChange(value, "product_id")}
                           style={{ borderRadius: '8px', fontSize: '14px' }}
                        >
                           {productsData?.map((item, index) => (
                              <Option value={item.id} key={index}>
                                 {item.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                           {
                              required: true,
                              message: "Please enter the quantity",
                           },
                        ]}
                     >
                        <Input
                           type="number"
                           style={{ borderRadius: '8px', fontSize: '14px' }}
                        />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </>
   );
};

export default App;
